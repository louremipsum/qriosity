"use client";
import { redirect, useSearchParams } from "next/navigation";
import InvalidSessionPage from "@/components/payment/InvalidSessionPage";
import { Loader, Flex } from "@mantine/core";
import { Suspense, useEffect } from "react";
import ReSessionStatus from "@/components/payment/ReSessionStatus";
import { useState } from "react";

const fallbackLoader = () => {
  return (
    <Flex justify="center">
      <Loader size={50} color="white" type="bars" />
    </Flex>
  );
};

const ReturnPage = () => {
  const queryParams = useSearchParams();
  const sessionId = queryParams.get("session_id");
  const [data, setData] = useState<{ status: string; customer_email: string }>({
    status: "",
    customer_email: "",
  });
  useEffect(() => {
    const ses = async () => {
      const session = await fetch(
        `/api/checkout-session?session_id=${sessionId}`,
        {
          method: "GET",
        }
      );
      const sessionData = await session.json();
      setData(sessionData);
    };
    ses();
  }, [sessionId]);

  if (data.status === "open") {
    redirect("/");
  }

  if (data.status === "complete") {
    return <ReSessionStatus customer_email={data.customer_email} />;
  }
  if (data.status === "invalid") {
    return <InvalidSessionPage />;
  }
};

const Return = () => {
  return (
    <Suspense fallback={fallbackLoader()}>
      <ReturnPage />
    </Suspense>
  );
};

export default Return;
