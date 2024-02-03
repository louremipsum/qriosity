"use server";
import { CheckURLResponse, FormValues } from "@/types/form";
import axios, { AxiosResponse } from "axios";
import { getSession } from "@auth0/nextjs-auth0";
import { ActionResponse } from "@/types/form";
import { QRDetail } from "@/types/viewqr";
import { revalidatePath } from "next/cache";
import { validate as uuidValidate, version as uuidVersion } from "uuid";

/**
 * Creates an access token using the provided manageAPI flag.
 * @param manageAPI - A boolean flag indicating whether the access token is for Management API or not.
 * @returns A Promise that resolves to the access token data.
 */
const createAccessToken = async (manageAPI: boolean) => {
  const options = {
    method: "POST",
    url: process.env.URL_AT,
    headers: { "content-type": "application/x-www-form-urlencoded" },
    data: new URLSearchParams({
      client_id: manageAPI
        ? process.env.AUTH0_ACCOUNT_MANAGE_CLIENT_ID!
        : process.env.AUTH0_CLIENT_ID!,
      client_secret: manageAPI
        ? process.env.AUTH0_ACCOUNT_MANAGE_CLIENT_SECRET!
        : process.env.AUTH0_CLIENT_SECRET!,
      audience: manageAPI
        ? process.env.AUTH0_AUD_MANAGE!
        : process.env.AUTH0_AUDIENCE!,
      grant_type: "client_credentials",
    }),
  };

  try {
    const response: AxiosResponse = await axios(options);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

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
  const currentUser = JSON.stringify(session?.user.sub, null, 2);
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
  try {
    const res = await axios.post(process.env.CREATE_QR!, formWithUser, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.access_token}`,
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
        Authorization: `Bearer ${token.access_token}`,
      },
    });
    if (res.data.statusCode !== 200)
      return {
        action: "QRUpdateFailed",
        message:
          "There was an error while updating the QR Code. Please try again later",
      };
    revalidatePath("/dashboard/viewqr");
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
        Authorization: `Bearer ${token.access_token}`,
      },
    });
    if (response.data.statusCode !== 200) {
      return {
        action: "QRDeletionFailed",
        message:
          "There was an error while deleting the QR Code. Please try again later",
      };
    }
    revalidatePath("/dashboard/viewqr");
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
  revalidatePath("/dashboard/viewqr");
  return {
    type: "QRLinkFound",
    link: response.data.link,
  };
};

const changeUserRole = async (userID: string, role: string) => {
  const url = `${
    process.env.AUTH0_ISSUER_BASE_URL
  }/api/v2/users/${encodeURIComponent(userID)}/roles`;
  const token = await createAccessToken(true);
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token.access_token}`,
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

const viewQRAction = async (currentUser: string) => {
  const token = await createAccessToken(false);
  const resp = await fetch(
    `${process.env.VIEW_QRS}?` + new URLSearchParams({ user_id: currentUser }),
    {
      headers: {
        Authorization: `Bearer ${token.access_token}`,
      },
      next: { revalidate: 3600 },
    }
  );
  const data = await resp.json();
  if (!data) {
    return {
      notFound: true,
    };
  }
  return data;
};

export {
  formAction,
  formUpdateAction,
  formDeleteAction,
  accessQRAction,
  changeUserRole,
  viewQRAction,
};
