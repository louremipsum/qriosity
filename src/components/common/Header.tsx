// TODO: fix the drawer in shell when logged in
import {
  Avatar,
  Button,
  Group,
  Image,
  Menu,
  rem,
  Burger,
  useComputedColorScheme,
  Drawer,
  Stack,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
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
  const { user } = useUser();
  const computedColorScheme = useComputedColorScheme("light");
  const matches = useMediaQuery("(min-width: 36em)");

  return (
    <Group
      justify="space-between"
      align="center"
      h="100%"
      p={"md"}
      className={classes.header}
    >
      <Group>
        {burger && (
          <Burger
            opened={opened}
            onClick={toggle}
            hiddenFrom="sm"
            size="sm"
            aria-label="Toggle navigation"
          />
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
            />
          </div>
        </Link>
      </Group>
      <Drawer
        opened={opened}
        onClose={toggle}
        padding={"md"}
        style={{ zIndex: 100 }}
        title="Menu"
      >
        <Stack>
          <Link href="/pricing">
            <Button color="teal" variant="transparent">
              Pricing
            </Button>
          </Link>
          <Link href="/support">
            <Button color="teal" variant="transparent">
              Support
            </Button>
          </Link>
          {user && (
            <Link href="/dashboard/createqr">
              <Button color="teal" variant="transparent">
                Dashboard
              </Button>
            </Link>
          )}
          <ColorSchemeButton />
        </Stack>
      </Drawer>
      {matches && (
        <Group>
          <Link href="/pricing">
            <Button color="teal" variant="transparent">
              Pricing
            </Button>
          </Link>
          <Link href="/support">
            <Button color="teal" variant="transparent">
              Support
            </Button>
          </Link>
          {user && (
            <Link href="/dashboard/createqr">
              <Button color="teal" variant="transparent">
                Dashboard
              </Button>
            </Link>
          )}
        </Group>
      )}
      <Group>
        {matches && <ColorSchemeButton />}
        {!user && (
          <a href="/api/auth/login?returnTo=/dashboard/createqr">
            <Button color="teal" variant="filled" radius={"md"}>
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
