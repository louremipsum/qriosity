import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios, { AxiosResponse } from "axios";
import { validate as uuidValidate, version as uuidVersion } from "uuid";
import ViewLink from "../components/OpenQR/ViewLink";

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

interface customError {
  message: string;
  status: StatusCode;
}

const isValidUUID = (id: string): boolean => {
  return (
    uuidValidate(id) &&
    uuidVersion(id).toString() === import.meta.env.VITE_UUID_VERSION
  );
};

const fetchUrl = async (id: string): Promise<AxiosResponse<ResponseData>> => {
  return axios.get(`${import.meta.env.VITE_BACKEND_VIEW_LINK}/${id}`);
};

const checkUUID = (id: string) => {
  if (!isValidUUID(id)) {
    throw new Error("Please Scan the QR again. Something unexpected happened");
  }
};

const handleResponse = async (id: string) => {
  const response = await fetchUrl(id);
  if (response.data.status !== StatusCode.Ok) {
    let message = "An unexpected error has occurred";
    if (response.data.status === StatusCode.BadRequest) {
      message = "We are sorry but the link has expired";
    } else if (response.data.status === StatusCode.Forbidden) {
      message = "The link is yet to be activated";
    } else if (response.data.status === StatusCode.InternalServerError) {
      message = "Error processing request";
    }
    throw { message, status: response.data.status };
  }

  return response;
};

const handleData = (response: AxiosResponse<ResponseData>) => {
  if (response.data.status === StatusCode.NotFound) {
    throw new Error("We are sorry but the link was not found");
  } else {
    return response.data.link;
  }
};

const ViewId = () => {
  const { id } = useParams();
  const [url, setUrl] = useState<string | null>(null);
  const [error, setError] = useState<customError | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const directHomePage = () => navigate("/");

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      setLoading(true);
      try {
        if (id) {
          checkUUID(id);
          const response = await handleResponse(id);
          const link = handleData(response);
          setUrl(link || null);
        }
      } catch (err) {
        setError({
          message: (err as customError).message,
          status: (err as customError).status,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleRedirect = () => {
    if (url) {
      const newWindow = window.open(url, "_blank");
      if (newWindow) {
        newWindow.focus();
      }
      window.close();
    }
  };

  if (loading) {
    return <ViewLink description="Loading..." loading />;
  }

  if (error) {
    return (
      <ViewLink
        status={error.status}
        title={error.message}
        description="Please contact the QR administator for more information!"
        buttonText="Go to Home"
        buttonAction={directHomePage}
      />
    );
  }

  if (!url) {
    return <ViewLink description="Loading..." loading />;
  }

  const domain = new URL(url).hostname;
  return (
    <ViewLink
      status={StatusCode.Ok}
      title={`You are being redirected to ${domain}`}
      buttonText="Proceed"
      buttonAction={handleRedirect}
    />
  );
};

export default ViewId;
