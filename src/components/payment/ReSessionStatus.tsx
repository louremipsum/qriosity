import Header from "@/components/common/Header";
import { useDisclosure } from "@mantine/hooks";
import Link from "next/link";
import { Button, Container, Mark, Stack, Text } from "@mantine/core";
import { IconCircleCheck } from "@tabler/icons-react";
import { FooterLinks } from "../common/Footer";

type sessionData = {
  customer_email: string;
};

const ReSessionStatus = (props: sessionData) => {
  const [opened, { toggle }] = useDisclosure();
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
            A payment to Qriosityx Premium Plan will appear on your statement. A
            confirmation email will be sent to{" "}
            <Mark color="teal">{props.customer_email}</Mark>
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
      <FooterLinks />
    </>
  );
};

export default ReSessionStatus;
