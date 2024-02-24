"use client";
import {
  BackgroundImage,
  Button,
  Flex,
  SimpleGrid,
  Stack,
  Text,
} from "@mantine/core";
import classes from "@styles/Dashboard.module.css";
import Link from "next/link";
import { useEffect, useContext } from "react";
import { currentUserRole } from "../action";
import { useUser } from "@auth0/nextjs-auth0/client";
import { QRContext } from "@/context/Context";
import { QRContextType } from "@/context/Context";

const Dashboard = () => {
  const context = useContext(QRContext);
  const { setRole } = context as QRContextType;
  const { user } = useUser();
  useEffect(() => {
    const settingRole = async () => {
      const role = await currentUserRole(user?.sub!);
      setRole(role);
    };
    if (user) {
      settingRole();
    }
  }, [user, setRole]);
  return (
    <Stack>
      <Text
        fz={"3rem"}
        fw={500}
        variant="gradient"
        gradient={{
          from: "rgba(0, 153, 224, 1)",
          to: "rgba(0, 255, 94, 1)",
          deg: 174,
        }}
      >
        Dashboard
      </Text>
      <SimpleGrid
        cols={{ base: 1, sm: 2, md: 3, lg: 3, xl: 3 }}
        spacing={{ base: 10, sm: "xl" }}
        verticalSpacing={{ base: "md", sm: "xl" }}
        mt={"xl"}
      >
        <BackgroundImage src="/dashboard_card.svg" radius="sm">
          <Stack className={classes.getStarted} p={"md"}>
            <Text fz={"xl"} fw={500}>
              QuickStart
            </Text>
            <Text fw={400}>Missed the Tour or new to Qriosity?</Text>
            <Flex justify="flex-end">
              <Link href={""}>
                <Button variant="filled" color="teal" radius={"md"}>
                  Take the Tour
                </Button>
              </Link>
            </Flex>
          </Stack>
        </BackgroundImage>
        <Stack className={classes.getStarted} p={"md"}>
          <Text fz={"xl"} fw={500}>
            Get Started
          </Text>
          <Text fw={400}>Start by creating a new QR</Text>
          <Flex justify="flex-end">
            <Link href={"/dashboard/createqr"}>
              <Button variant="light" color="teal">
                Create QR
              </Button>
            </Link>
          </Flex>
        </Stack>
      </SimpleGrid>
    </Stack>
  );
};

export default Dashboard;
