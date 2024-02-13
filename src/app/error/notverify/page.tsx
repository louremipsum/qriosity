"use client";

import { Button, Container, Group, Image, Stack, Text } from "@mantine/core";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const NotVerfiedEmail = () => {
  const searchParams = useSearchParams();
  const errDesc = searchParams.get("error_description");
  return (
    <Stack align="center" mt={"xl"}>
      <Text fz={"32"} fw={500}>
        {errDesc?.split(",")[0]}
      </Text>
      <Text fz={"md"} fw={500} c={"dark"}>
        You will need to verify your email to complete registeration
      </Text>
      <Image src={"/mailbox.svg"} h={"20%"} w={"20%"} alt="mailbox" mt={"md"} />
      <Container size={"md"}>
        <Text c={"dimmed"} mt={"md"} ta={"center"}>
          An email has to be sent to {errDesc?.split(",")[1]} with a link to
          verify your account. If you have not received the email after a few
          minutes, please check your spam folder
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

export default NotVerfiedEmail;
