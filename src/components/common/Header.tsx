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
  Text,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { useUser, UserProfile } from "@auth0/nextjs-auth0/client";
import { IconLogout, IconUser } from "@tabler/icons-react";
import classes from "@/styles/index.module.css";
import ColorSchemeButton from "@/utils/ColorSchemeButton";
import Link from "next/link";
import { IconChevronRight } from "@tabler/icons-react";
import { usePathname } from "next/navigation";

type userProfileProps = {
  user: UserProfile | undefined;
};

type HeaderProps = {
  opened: boolean;
  toggle: () => void;
  burger: boolean;
};

type PublicHeaderProps = {
  user: UserProfile | undefined;
  opened: boolean;
  toggle: () => void;
  matches: boolean;
};

type DashboardHeaderProps = {
  user: UserProfile | undefined;
};

const HeaderLogo = () => {
  const computedColorScheme = useComputedColorScheme("light");
  return (
    <Link href="/">
      <div>
        <Image
          src={
            computedColorScheme === "light" ? "/LogoLight.png" : "/LogoDark.png"
          }
          alt="logo"
          w={"150px"}
        />
      </div>
    </Link>
  );
};

const HeaderLinks = () => (
  <>
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
    <Link href="/#features">
      <Button color="teal" variant="transparent">
        Features
      </Button>
    </Link>
  </>
);

const UserMenu = ({ user }: userProfileProps) => {
  return (
    <Menu shadow="md" width={250} radius={"lg"}>
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
              <IconUser
                style={{ width: rem(24), height: rem(24) }}
                stroke={1.2}
              />
            }
            mt={"xs"}
          >
            <Text span fz={"md"}>
              Profile
            </Text>
          </Menu.Item>
        </a>
        <Menu.Item mt={"xs"}>
          <ColorSchemeButton text />
        </Menu.Item>
        <Menu.Divider mt={"xs"} />
        <a href="/api/auth/logout">
          <Menu.Item
            leftSection={
              <IconLogout
                style={{ width: rem(24), height: rem(24) }}
                stroke={1.2}
              />
            }
            color="red"
          >
            <Text span fz={"md"}>
              Logout
            </Text>
          </Menu.Item>
        </a>
        <Menu.Divider />
        <Group justify="space-evenly" mt={"sm"} mb={"sm"}>
          <Link href="/terms-of-service">
            <Text span fz={"xs"} c="dimmed">
              Terms of Service
            </Text>
          </Link>
          <Text span fz={"xs"} c="dimmed">
            &bull;
          </Text>
          <Link href="/privacy">
            <Text span fz={"xs"} c="dimmed">
              Privacy Policy
            </Text>
          </Link>
        </Group>
      </Menu.Dropdown>
    </Menu>
  );
};

const PublicHeader = ({ user, opened, toggle, matches }: PublicHeaderProps) => {
  return (
    <>
      {matches ? (
        <Drawer
          opened={opened}
          onClose={toggle}
          padding={"md"}
          style={{ zIndex: 100 }}
          title="Menu"
        >
          <Stack>
            <HeaderLinks />
            <ColorSchemeButton />
          </Stack>
        </Drawer>
      ) : (
        <Group>
          <HeaderLinks />
          <ColorSchemeButton />
        </Group>
      )}
      <Group>
        {!user ? (
          <a href="/api/auth/login?returnTo=/dashboard">
            <Button color="teal" variant="filled" radius={"md"}>
              Login
            </Button>
          </a>
        ) : (
          <Link href="/dashboard">
            <Button
              color="teal"
              variant="filled"
              radius={"lg"}
              rightSection={<IconChevronRight />}
            >
              Dashboard
            </Button>
          </Link>
        )}
      </Group>
    </>
  );
};

const DashboardHeader = ({ user }: DashboardHeaderProps) => {
  return <>{user && <UserMenu user={user} />}</>;
};

const Header = ({ opened, toggle, burger }: HeaderProps) => {
  const { user, isLoading } = useUser();
  const route = usePathname();
  const matches = useMediaQuery("(max-width: 48em)");

  // Determine which header to display based on the pathname and user's login status
  const isDashboard = route.startsWith("/dashboard");
  const HeaderType = isDashboard ? DashboardHeader : PublicHeader;

  // Render the appropriate header
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
            hiddenFrom="md"
            size="sm"
            aria-label="Toggle navigation"
          />
        )}
        <HeaderLogo />
      </Group>
      {!isLoading && (
        <HeaderType
          user={user}
          toggle={toggle}
          matches={matches!}
          opened={opened}
        />
      )}
    </Group>
  );
};

export default Header;
