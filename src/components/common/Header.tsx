import {
  Avatar,
  Button,
  Group,
  Image,
  Menu,
  rem,
  Burger,
  useComputedColorScheme,
} from "@mantine/core";
import { useUser } from "@auth0/nextjs-auth0/client";
import { IconLogout, IconSettings } from "@tabler/icons-react";
import classes from "@/styles/index.module.css";
import ColorSchemeButton from "@/utils/ColorSchemeButton";
import Link from "next/link";

type Props = {
  opened: boolean;
  toggle: () => void;
  burger: boolean;
};

const Header = ({ opened, toggle, burger }: Props) => {
  const { user, error, isLoading } = useUser();
  const computedColorScheme = useComputedColorScheme("light");

  return (
    <Group
      justify="space-between"
      align="center"
      h="100%"
      p={"md"}
      className={classes.header}
    >
      {burger && (
        <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
      )}
      <Link href="/">
        <div>
          <Image
            src={
              computedColorScheme === "light"
                ? "/LogoLight.png"
                : "/LogoDark.png"
            }
            alt="logo"
            w={"150px"}
            ml={"md"}
          />
        </div>
      </Link>
      <Group mr={"xl"}>
        <ColorSchemeButton />
        {/*TODO: redirect to dashboard after login */}
        {!user && (
          <a href="/api/auth/login">
            <Button color="teal" variant="filled" mr={"xxl"}>
              Login
            </Button>
          </a>
        )}
        {user && (
          <Menu shadow="md" width={200}>
            <Menu.Target>
              <Avatar
                src={user!.picture}
                alt={user!.name || ""}
                radius="xl"
                size={40}
              />
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Label>Application</Menu.Label>
              <a href="/dashboard/profile">
                <Menu.Item
                  leftSection={
                    <IconSettings style={{ width: rem(14), height: rem(14) }} />
                  }
                >
                  Profile
                </Menu.Item>
              </a>
              <a href="/api/auth/logout">
                <Menu.Item
                  leftSection={
                    <IconLogout style={{ width: rem(14), height: rem(14) }} />
                  }
                >
                  Logout
                </Menu.Item>
              </a>
            </Menu.Dropdown>
          </Menu>
        )}
      </Group>
    </Group>
  );
};

export default Header;
