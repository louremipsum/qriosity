import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios, { AxiosResponse } from "axios";
import { validate as uuidValidate, version as uuidVersion } from "uuid";
import ViewLink from "../components/ViewLink";

type ResponseData = {
  status?: number;
  link?: string;
  message?: string;
};

/**
 * Checks if the provided ID is a valid UUID and a particular version.
 * @param id The ID to be validated.
 * @returns True if the ID is a valid UUID mentioned version, false otherwise.
 */
const isValidUUID = (id: string): boolean => {
  return (
    uuidValidate(id) &&
    uuidVersion(id).toString() === import.meta.env.VITE_UUID_VERSION
  );
};

/**
 * Fetches data from the backend API based on the provided ID.
 * @param id - The ID of the data to fetch.
 * @returns A promise that resolves to the Axios response containing the fetched data.
 */
const fetchUrl = async (id: string): Promise<AxiosResponse<ResponseData>> => {
  return axios.get(`${import.meta.env.VITE_BACKEND_VIEW_LINK}/${id}`);
};

/**
 * Checks if the provided ID is a valid UUID.
 * @param id - The ID to be checked.
 * @throws {Error} - Throws an error if the ID is not a valid UUID.
 */
const checkUUID = (id: string) => {
  if (!isValidUUID(id!)) {
    throw new Error("Please Scan the QR again. Something unexpected happened");
  }
};

/**
 * Handles the response for a given ID.
 * @param id - The ID to fetch the response for.
 * @returns The response object.
 * @throws {Error} If an unexpected error occurs or if the link has expired.
 */
const handleResponse = async (id: string) => {
  const response = await fetchUrl(id!);

  if (response.data.status !== 200) {
    let message = "An unexpected error has occurred";
    if (response.data.status === 400) {
      message = "We are sorry but the link has expired";
    } else if (response.data.status === 500) {
      message = "Error processing request";
    }
    throw new Error(message);
  }

  return response;
};

/**
 * Handles the data received from the API response.
 * If the response does not contain a link, an error is thrown.
 * Otherwise, the link is returned.
 *
 * @param response - The Axios response containing the data.
 * @returns The link from the response data.
 * @throws Error if the link is not found in the response data.
 */
const handleData = (response: AxiosResponse<ResponseData>) => {
  if (!response.data.link) {
    throw new Error("We are sorry but the link was not found");
  } else {
    return response.data.link;
  }
};

const ViewId = () => {
  const { id } = useParams();
  const [url, setUrl] = useState<string | null>(null);
  const [error, setError] = useState<{ msg: string; status: number } | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const directHomePage = () => navigate("/");

  useEffect(() => {
    /**
     * Fetches data based on the provided ID.
     * @returns {Promise<void>} A promise that resolves when the data is fetched.
     */
    const fetchData = async (): Promise<void> => {
      setLoading(true);
      try {
        checkUUID(id!);
        const response = await handleResponse(id!);
        const link = handleData(response);
        setUrl(link);
      } catch (err) {
        setError({ msg: (err as Error).message, status: 500 });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  /**
   * Handles the redirect to the link obtained from QR.
   */
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
        status={error.status.toString()}
        title={error.msg}
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
      status="200"
      title={`You are being redirected to ${domain}`}
      buttonText="Proceed"
      buttonAction={handleRedirect}
    />
  );
};

export default ViewId;
