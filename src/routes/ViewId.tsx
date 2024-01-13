import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios, { AxiosResponse } from "axios";
import { validate as uuidValidate, version as uuidVersion } from "uuid";
import { Loader } from "@mantine/core";

type ResponseData = {
  url?: string;
  expired?: boolean;
};

const isValidUUIDv5 = (id: string): boolean => {
  return (
    uuidValidate(id) &&
    uuidVersion(id).toString() === import.meta.env.VITE_UUID_VERSION
  );
};

const fetchUrl = async (id: string): Promise<AxiosResponse<ResponseData>> => {
  // Replace with the actual URL of your Lambda function
  return axios.get(`https://your-lambda-function-url/${id}`);
};

const ViewId = () => {
  const { id } = useParams();
  const [url, setUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        if (!isValidUUIDv5(id!)) {
          throw new Error(
            "Please Scan the QR again. Something unexpected happened"
          );
        }

        const response = await fetchUrl(id!);

        if (response.data.expired) {
          throw new Error("We are sorry but the link has expired");
        } else if (!response.data.url) {
          throw new Error("We are sorry but the link was not found");
        } else {
          setUrl(response.data.url);
        }
      } catch (err) {
        setError((err as Error).message);
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
    return null; // Render nothing while the request is being made
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
