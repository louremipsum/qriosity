"use client";

import {
  Button,
  Container,
  Group,
  Image,
  Stack,
  Text,
  Flex,
  Loader,
} from "@mantine/core";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

const fallbackLoader = () => {
  return (
    <Flex justify="center">
      <Loader size={50} color="white" type="bars" />
    </Flex>
  );
};

const EmailAlreadyExists = () => {
  const searchParams = useSearchParams();
  const errDesc = searchParams.get("error_description");
  return (
    <Stack align="center" mt={"xl"}>
      <Text fz={"32"} fw={500}>
        {errDesc?.split(",")[0]}
      </Text>
      <Image src={"/dreamer.svg"} h={"20%"} w={"20%"} alt="mailbox" mt={"md"} />
      <Container size={"md"}>
        <Text c={"dimmed"} mt={"md"} ta={"center"}>
          There is already an account associated with this email. Please{" "}
          <Link href={"/auth/signup"} style={{ color: "#00a495" }}>
            signup
          </Link>{" "}
          with a different email.
          <br /> Try logging in with the identity provider(Google or native
          account creation) you used to sign up.
        </Text>
      </Container>
      <Group justify="space-between" w={"25%"} mt={"xl"} mb={"xl"}>
        <Link href={"/"}>
          <Button variant={"filled"} color={"teal"} size="md" radius={"md"}>
            Go Home
          </Button>
        </Link>
        <Link href={"/support"}>
          <Button variant={"outline"} color={"teal"} size="md" radius={"md"}>
            Contact Support
          </Button>
        </Link>
      </Group>
    </Stack>
  );
};

const EmailAlreadyExistsPage = () => {
  return (
    <Suspense fallback={fallbackLoader()}>
      <EmailAlreadyExists />
    </Suspense>
  );
};

export default EmailAlreadyExistsPage;
