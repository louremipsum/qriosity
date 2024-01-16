import { useAuth0 } from "@auth0/auth0-react";
import Shell from "../components/Shell";
import { Avatar, Group, Text, Stack } from "@mantine/core";
import { IconAt } from "@tabler/icons-react";

const Profile = () => {
  const { user } = useAuth0();
  return (
    <Shell>
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
    </Shell>
  );
};

export default Profile;
