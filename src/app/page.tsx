"use client";
import {
  Title,
  Text,
  Button,
  Stack,
  Group,
  BackgroundImage,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Headers from "@/components/common/Header";
import Link from "next/link";

const Index = () => {
  const [opened, { toggle }] = useDisclosure();
  // const computedColorScheme = useComputedColorScheme("light");

  return (
    <BackgroundImage src={""} radius="xs">
      <Headers opened={opened} toggle={toggle} burger={false} />
      <div style={{ height: "100vh" }}>
        <Stack align="center" justify="center" mt={"xl"}>
          <Title
            order={1}
            style={{
              margin: "2rem 0 0.5rem 0",
              textAlign: "center",
              fontSize: 60,
            }}
          >
            Generate{" "}
            <Text
              variant="gradient"
              fw={700}
              size={"60px"}
              gradient={{ from: "teal", to: "rgba(0, 229, 255, 1)", deg: 90 }}
              style={{ display: "inline" }}
            >
              Temporary
            </Text>{" "}
            QR Codes!
          </Title>
          <Text
            size="xl"
            style={{ marginBottom: "2rem" }}
            ta={"center"}
            fw={500}
          >
            Qriosity is a QR code generator that allows you to create temporary
            QR codes that expire after a certain amount of time/scans.
          </Text>
        </Stack>
        <Group justify="center">
          <Link href="/dashboard/createqr">
            <Button color="teal" size="md" m={"sm"}>
              Get Started
            </Button>
          </Link>
          <Button color="teal" size="md" variant="outline" m={"sm"}>
            Watch Demo
          </Button>
        </Group>
      </div>
    </BackgroundImage>
  );
};

export default Index;
