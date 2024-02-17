"use client";

import { Button, Group, Image, Stack, Text } from "@mantine/core";
import Link from "next/link";

const InternalServerError = () => {
  return (
    <Stack align="center" mt={"xl"}>
      <Text fz={"32"} fw={500}>
        Something unexpected happened!
      </Text>
      <Text fz={"md"} fw={500} c={"dark"}>
        Internal Server Error
      </Text>
      <Image
        src={"/notFound.svg"}
        h={"20%"}
        w={"20%"}
        alt="mailbox"
        mt={"md"}
      />
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

export default InternalServerError;
