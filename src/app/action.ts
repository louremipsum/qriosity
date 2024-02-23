"use server";
import { CheckURLResponse, FormValues } from "@/types/form";
import axios, { AxiosResponse } from "axios";
import { getSession } from "@auth0/nextjs-auth0";
import { ActionResponse } from "@/types/form";
import { LastEvaluatedKeyType, QRDetail } from "@/types/viewqr";
import { validate as uuidValidate, version as uuidVersion } from "uuid";
import { decodeJwt } from "jose";
import processQRList from "@/utils/processQRList";
import { revalidateTag } from "next/cache";

function getExpiration(token: string): number {
  const { exp } = decodeJwt(token);
  return exp || Math.floor(Date.now() / 1000);
}

/**
 * Creates an access token using the provided manageAPI flag.
 * @param manageAPI - A boolean flag indicating whether the access token is for Management API or not.
 * @returns A Promise that resolves to the access token data.
 */
const createAccessToken = async (
  manageAPI: boolean,
  retryCount = 0
): Promise<string> => {
  try {
    const response = await fetch(
      `${process.env.WEBSITE_URL}/api/accessToken?manageAPI=${manageAPI}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-secret-key": process.env.INTERNAL_SECRET_KEY!,
        },
        cache: "no-store",
      }
    );
    const token = await response.json();
    const exp = getExpiration(token.accessToken);
    if (Date.now() <= exp) {
      if (retryCount >= 3) {
        throw new Error("Token refresh limit exceeded");
      }
      return await createAccessToken(manageAPI, retryCount + 1);
    } else {
      return token.accessToken;
    }
  } catch (error) {
    return (error as Error).message;
  }
};

/**
 * Checks the given URL against the Google Safe Browsing API for potential threats.
 * @param url The URL to be checked.
 * @returns A promise that resolves to a CheckURLResponse object containing information about potential threats.
 */
const checkURL = async (url: string): Promise<CheckURLResponse> => {
  try {
    const response = await axios.post(
      "https://safebrowsing.googleapis.com/v4/threatMatches:find",
      {
        client: {
          clientId: "Qriosity", // Replace with your client ID
          clientVersion: "1.0.0", // Replace with your client version
        },
        threatInfo: {
          threatTypes: ["MALWARE", "SOCIAL_ENGINEERING", "UNWANTED_SOFTWARE"],
          platformTypes: ["ANY_PLATFORM"],
          threatEntryTypes: ["URL"],
          threatEntries: [{ url }],
        },
      },
      {
        params: { key: process.env.GOOGLE_API_KEY },
      }
    );

    return response.data;
  } catch (error) {
    return { matches: [] };
  }
};

const formAction = async (formValues: FormValues) => {
  const session = await getSession();
  const currentUser = session?.user.sub;
  const formWithUser = { ...formValues, user: currentUser };
  const response = await checkURL(formWithUser.link);
  if (response.matches) {
    const respAction: ActionResponse = {
      action: "URLNotSafe",
      matches: response,
    };
    return respAction;
  }
  const token = await createAccessToken(false);
  if (token === "Rate Limit Exceeded") {
    const respAction: ActionResponse = {
      action: "QRCreationFailed",
      message: "Rate Limit Exceeded",
    };
    return respAction;
  }
  try {
    const res = await axios.post(process.env.CREATE_QR!, formWithUser, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.data.statusCode !== 200) {
      const respAction: ActionResponse = {
        action: "QRCreationFailed",
        message:
          "There was an error while generating the QR Code. Please try again later",
      };
      return respAction;
    }
    const respAction: ActionResponse = {
      action: "QRCodeCreated",
      qrObject: res.data.qrObject,
      link: res.data.link,
      message: res.data.message,
    };
    revalidateTag("getCount");
    return respAction;
  } catch (error) {
    const respAction: ActionResponse = {
      action: "QRCreationFailed",
      message: (error as Error).message,
    };
    return respAction;
  }
};

const formUpdateAction = async (dirtyFields: Partial<QRDetail>) => {
  try {
    const token = await createAccessToken(false);
    const res = await axios.patch(process.env.UPDATE_QRS!, dirtyFields, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.data.statusCode !== 200)
      return {
        action: "QRUpdateFailed",
        message:
          "There was an error while updating the QR Code. Please try again later",
      };
    return {
      action: "QRCodeUpdated",
      message: res.data.message,
    };
  } catch (error) {
    return {
      action: "QRUpdateFailed",
      message: (error as Error).message,
    };
  }
};

const formDeleteAction = async (id: string) => {
  const token = await createAccessToken(false);
  try {
    const response = await axios.delete(`${process.env.DELETE_QRS}/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.data.statusCode !== 200) {
      return {
        action: "QRDeletionFailed",
        message:
          "There was an error while deleting the QR Code. Please try again later",
      };
    }
    revalidateTag("getCount");
    return {
      action: "QRCodeDeleted",
      message: response.data.message,
    };
  } catch (error) {
    return {
      action: "QRDeletionFailed",
      message: (error as Error).message,
    };
  }
};

enum StatusCode {
  Ok = "200",
  NotFound = "404",
  BadRequest = "400",
  Forbidden = "403",
  InternalServerError = "500",
}

interface ResponseData {
  status?: StatusCode;
  link?: string;
  message?: string;
}

const isValidUUID = (id: string): boolean => {
  return (
    uuidValidate(id) && uuidVersion(id).toString() === process.env.UUID_VERSION
  );
};

const accessQRAction = async (id: string) => {
  if (!isValidUUID(id)) {
    return {
      type: "Error",
      message: "Please Scan the QR again. Something unexpected happened",
      status: StatusCode.InternalServerError,
    };
  }

  const response: AxiosResponse<ResponseData, any> = await axios.get(
    `${process.env.VIEW_LINK}/${id}`
  );
  if (response.data.status !== StatusCode.Ok) {
    let message = "An unexpected error has occurred";
    if (response.data.status === StatusCode.BadRequest) {
      message = "We are sorry but the link has expired";
    } else if (response.data.status === StatusCode.Forbidden) {
      message = "The link is yet to be activated";
    } else if (response.data.status === StatusCode.InternalServerError) {
      message = "Error processing request";
    } else if (response.data.status === StatusCode.NotFound) {
      message = "We are sorry but the link was not found";
    }
    return { type: "Error", message: message, status: response.data.status };
  }
  return {
    type: "QRLinkFound",
    link: response.data.link,
  };
};

/**
 * Changes the role of a user in Auth0. The user's current roles are removed and the new role is added.
 * Used for Stripe webhook events to update user roles based on their subscription status
 * or events.
 *
 * @param {string} userID - The ID of the user.
 * @param {string} role - The new role for the user.
 * @returns {string} -Response data or rejects with an error.
 */
const changeUserRole = async (userID: string, role: string) => {
  const url = `${
    process.env.AUTH0_ISSUER_BASE_URL
  }/api/v2/users/${encodeURIComponent(userID)}/roles`;
  const token = await createAccessToken(true);
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  const data = {
    roles: [role],
  };

  try {
    // Get the user's current roles
    const currentRolesResponse = await axios.get(url, { headers });
    const currentRoles = currentRolesResponse.data;

    // Extract the role IDs from the current roles
    const currentRoleIds = currentRoles.map((role: { id: string }) => role.id);

    // Remove all current roles
    await axios.delete(url, { headers, data: { roles: currentRoleIds } });
    const response = await axios.post(url, data, { headers });
    return response.data;
  } catch (error) {
    return error;
  }
};

const viewQRAction = async (exclusiveStartKey: null | LastEvaluatedKeyType) => {
  try {
    const token = await createAccessToken(false);
    const session = await getSession();
    const currentUser = session?.user.sub;
    // Create the query parameters
    const params = new URLSearchParams({ user_id: currentUser });
    if (exclusiveStartKey) {
      params.append("exclusiveStartKey", JSON.stringify(exclusiveStartKey));
    }
    const resp = await axios.get(
      `${process.env.VIEW_QRS}?${params.toString()}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (resp.status !== 200) {
      throw new Error(`HTTP error! status: ${resp.status}\n`);
    }

    const data = resp.data;
    if (!data) {
      return {
        notFound: true,
        processedData: [],
        lastEvaluatedKey: "",
      };
    }
    const processedData = processQRList(data);
    return {
      notFound: false,
      processedData: processedData,
      lastEvaluatedKey: data.lastEvaluatedKey,
    };
  } catch (error) {
    console.error(error);
    return {
      processedData: [],
      lastEvaluatedKey: "",
    };
  }
};

const getQRCount = async () => {
  try {
    const session = await getSession();
    const currentUser = session?.user.sub;
    // Create the query parameters
    const params = new URLSearchParams({ user_id: currentUser });
    const resp = await fetch(`${process.env.COUNT}?${params.toString()}`, {
      next: { tags: ["getCount"] },
    });
    if (!resp.ok) {
      throw new Error(`HTTP error! status: ${resp.status}\n ${resp}`);
    }

    const data = await resp.json();
    return {
      num: data.num,
    };
  } catch (error) {
    console.error(error);
    return {
      num: undefined,
    };
  }
};

export {
  formAction,
  formUpdateAction,
  formDeleteAction,
  accessQRAction,
  changeUserRole,
  viewQRAction,
  getQRCount,
};
