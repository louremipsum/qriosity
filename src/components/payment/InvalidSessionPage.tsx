"use client";
import { Container, Stack, Text, Button } from "@mantine/core";
import { IconCircleX } from "@tabler/icons-react";
import Link from "next/link";
import Header from "@/components/common/Header";
import { useDisclosure } from "@mantine/hooks";
import { FooterLinks } from "../common/Footer";

const InvalidSessionPage = () => {
  const [opened, { toggle }] = useDisclosure();
  return (
    <>
      <Header opened={opened} toggle={toggle} burger />
      <Container size="md" mt={20} mb={20}>
        <Stack align="center" justify="center" h={"80vh"}>
          <IconCircleX
            width={128}
            height={128}
            stroke={1}
            style={{ color: "#E03131" }}
          />
          <Text ta="center" size="xl" fw={500}>
            Invalid Checkout Session ID
          </Text>
          <Text ta="center" size="sm" c="dimmed">
            This session ID is invalid. If you have paid and are still seeing
            this message, please contact us at{" "}
            <a href="mailto:" style={{ color: "#00c7b0" }}>
              email
            </a>
          </Text>
          <Link href="/">
            <Button variant={"filled"} color="teal" mt={"xl"}>
              Go Home
            </Button>
          </Link>
        </Stack>
      </Container>
      <FooterLinks />
    </>
  );
};

export default InvalidSessionPage;
