"use client";
import {
  Avatar,
  Group,
  Text,
  Stack,
  Button,
  Badge,
  Divider,
} from "@mantine/core";
import { IconAt } from "@tabler/icons-react";
import { useUser } from "@auth0/nextjs-auth0/client";
import Link from "next/link";
import { useContext } from "react";
import { QRContext, QRContextType } from "@/context/Context";

const Profile = () => {
  const context = useContext(QRContext);
  const { role } = context as QRContextType;
  const { user } = useUser();
  return (
    <>
      <Stack mt={"md"}>
        <Text
          size={"3rem"}
          fw={900}
          variant="gradient"
          ta={"left"}
          mb={"xl"}
          gradient={{
            from: "rgba(0, 153, 224, 1)",
            to: "rgba(0, 255, 94, 1)",
            deg: 174,
          }}
        >
          Profile
        </Text>
        <div>
          <Group wrap="nowrap">
            <Avatar src={user?.picture} size={94} radius="md" />
            <div>
              <Text fz="xs" tt="uppercase" fw={700} c="dimmed">
                {user?.nickname}
              </Text>
              <Text fz="lg" fw={500}>
                {user?.name}
              </Text>
              <Group wrap="nowrap" gap={10} mt={3}>
                <IconAt stroke={1.5} size="1rem" />
                <Text fz="xs" c="dimmed">
                  {user?.email}
                </Text>
              </Group>
            </div>
          </Group>
        </div>
      </Stack>
      <Divider my="md" mt={"xl"} mb={"xl"} />
      <Text fz="xl" fw={500} mt={"lg"}>
        Billing
      </Text>
      <Text fz="sm" fw={400} c="dimmed">
        Manage your subscription and billing information
      </Text>
      <Group mt={"xl"} gap={10}>
        <Text>Current Plan</Text>

        <Badge color="teal" variant="light">
          {(user?.rolesArray as string[]) && (user?.rolesArray as string[])}
          {role}
        </Badge>
      </Group>
      <Link href={process.env.NEXT_PUBLIC_STRIPE_CUSTOMER_PORTAL_TEST!}>
        <Button color="teal" variant="filled" mt={"lg"}>
          Manage subscription
        </Button>
      </Link>
    </>
  );
};

export default Profile;
