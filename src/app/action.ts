"use server";
import { CheckURLResponse, FormValues } from "@/types/form";
import axios, { AxiosResponse } from "axios";
import { getSession } from "@auth0/nextjs-auth0";
import { ActionResponse } from "@/types/form";
import { QRDetail } from "@/types/viewqr";
import { revalidatePath } from "next/cache";
import { validate as uuidValidate, version as uuidVersion } from "uuid";

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
  const res = await axios.post(process.env.CREATE_QR!, formWithUser, {
    headers: {
      "Content-Type": "application/json",
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
};

const formUpdateAction = async (dirtyFields: Partial<QRDetail>) => {
  const res = await axios.patch(process.env.UPDATE_QRS!, dirtyFields, {
    headers: {
      "Content-Type": "application/json",
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
};

const formDeleteAction = async (id: string) => {
  const response = await axios.delete(`${process.env.DELETE_QRS}/${id}`);
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

export { formAction, formUpdateAction, formDeleteAction, accessQRAction };
