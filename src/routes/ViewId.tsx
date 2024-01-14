import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios, { AxiosResponse } from "axios";
import { validate as uuidValidate, version as uuidVersion } from "uuid";
import { Loader } from "@mantine/core";

type ResponseData = {
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

  if (response.status !== 200) {
    let message = "An unexpected error has occurred";
    if (response.status === 400) {
      message = "We are sorry but the link has expired";
    } else if (response.status === 500) {
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
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

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
        setError((err as Error).message);
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
    return (
      <div>
        {" "}
        <Loader /> <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!url) {
    return <Loader />; // Render nothing while the request is being made
  }

  const domain = new URL(url).hostname;

  return (
    <div>
      <h1>You are being redirected to {domain}</h1>
      <button onClick={handleRedirect}>Proceed</button>
    </div>
  );
};

export default ViewId;
