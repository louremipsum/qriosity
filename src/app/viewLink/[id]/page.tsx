"use client";
import { useState, useEffect } from "react";
import ViewLink from "@/components/OpenQR/ViewLink";
import { useRouter } from "next/navigation";
import { accessQRAction } from "@/app/action";

enum StatusCode {
  Ok = "200",
  NotFound = "404",
  BadRequest = "400",
  Forbidden = "403",
  InternalServerError = "500",
}

interface customError {
  message: string;
  status: StatusCode;
}

const ViewId = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const [url, setUrl] = useState<string | null>(null);
  const [error, setError] = useState<customError | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const directHomePage = () => router.push("/");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const response = await accessQRAction(params.id);
      if (response.type === "Error") {
        setError({ message: response.message!, status: response.status! });
      } else if (response.type === "QRLinkFound") {
        setUrl(response.link!);
      }
      setLoading(false);
    };

    fetchData();
  }, [params.id]);

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
