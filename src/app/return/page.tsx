"use client";
// TODO: Seperate this logic into server and client side so fetch request is not made on client side
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Header from "@/components/common/Header";
import { useDisclosure } from "@mantine/hooks";
import {
  Button,
  Container,
  Loader,
  Mark,
  Stack,
  Text,
  Flex,
} from "@mantine/core";
import { IconCircleCheck } from "@tabler/icons-react";
import Link from "next/link";
import InvalidSessionPage from "@/components/payment/InvalidSessionPage";

export default function Return() {
  const [data, setData] = useState<{
    status: string;
    customer_email: string;
  }>({ status: "", customer_email: "" });
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const router = useRouter();
  const [opened, { toggle }] = useDisclosure();

  useEffect(() => {
    fetch(`/api/checkout-session?session_id=${sessionId}`, {
      method: "GET",
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Invalid session");
        }
        return res.json();
      })
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        setData({ status: "invalid", customer_email: "" });
      });
  }, [sessionId]);

  if (data.status === "open") {
    return router.push("/");
  }

  if (data.status === "complete") {
    return (
      <>
        <Header opened={opened} toggle={toggle} burger />
        <Container size="md" mt={20} mb={20}>
          <Stack align="center" justify="center" h={"80vh"}>
            <IconCircleCheck
              width={128}
              height={128}
              stroke={1}
              style={{ color: "#00c7b0" }}
            />
            <Text ta="center" size="xl" fw={500}>
              Thanks for Subscribing
            </Text>
            <Text ta="center" size="md" c={"dimmed"}>
              A payment to Qriosityx Premium Plan will appear on your statement.
              A confirmation email will be sent to{" "}
              <Mark color="teal">{data.customer_email}</Mark>
            </Text>
            <Text ta="center" size="sm" c="dimmed" mt={"xl"}>
              Log out and Log back in to start using your new plan
            </Text>
            <Link href="/api/auth/logout">
              <Button variant={"filled"} color="teal">
                Logout
              </Button>
            </Link>
          </Stack>
        </Container>
      </>
    );
  }
  if (data.status === "invalid") {
    return <InvalidSessionPage />;
  }

  return (
    <Flex justify="center">
      <Loader size={50} color="white" type="bars" />
    </Flex>
  );
}
