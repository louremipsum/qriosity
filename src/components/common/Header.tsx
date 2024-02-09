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
import { useUser, UserProfile } from "@auth0/nextjs-auth0/client";
import { IconLogout, IconSettings } from "@tabler/icons-react";
import classes from "@/styles/index.module.css";
import ColorSchemeButton from "@/utils/ColorSchemeButton";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {
  opened: boolean;
  toggle: () => void;
  burger: boolean;
};

type HeaderLogoProps = {
  computedColorScheme: string;
};

type userProfileProps = {
  user: UserProfile | undefined;
};

type HeaderProps = {
  opened: boolean;
  toggle: () => void;
  burger: boolean;
};

const HeaderLogo = ({ computedColorScheme }: HeaderLogoProps) => (
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

const HeaderLinks = ({ user }: userProfileProps) => (
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
    <Link href="#features">
      <Button color="teal" variant="transparent">
        Features
      </Button>
    </Link>
    <Link href="https://github.com/louremipsum/qriosity">
      <Button color="teal" variant="transparent">
        Github
      </Button>
    </Link>
    {user && (
      <Link href="/dashboard/createqr">
        <Button color="teal" variant="transparent">
          Dashboard
        </Button>
      </Link>
    )}
  </>
);

const UserMenu = ({ user }: userProfileProps) => (
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
);

const Header = ({ opened, toggle, burger }: Props) => {
  const { user } = useUser();
  const computedColorScheme = useComputedColorScheme("light");
  const matches = useMediaQuery("(min-width: 48em)");
  const router = usePathname();

  const showDrawer = !router.startsWith("/dashboard");

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
        <HeaderLogo computedColorScheme={computedColorScheme} />
      </Group>
      {showDrawer && (
        <Drawer
          opened={opened}
          onClose={toggle}
          padding={"md"}
          style={{ zIndex: 100 }}
          title="Menu"
        >
          <Stack>
            <HeaderLinks user={user} />
            <ColorSchemeButton />
          </Stack>
        </Drawer>
      )}
      {/* {matches && (
        <Group>
          <HeaderLinks user={user} />
        </Group>
      )} */}
      <Group>
        {matches && <ColorSchemeButton />}
        {!user && (
          <a href="/api/auth/login?returnTo=/dashboard/createqr">
            <Button color="teal" variant="filled" radius={"md"}>
              Login
            </Button>
          </a>
        )}
        {user && <UserMenu user={user} />}
      </Group>
    </Group>
  );
};

export default Header;
