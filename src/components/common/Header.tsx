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
import { useAuth0 } from "@auth0/auth0-react";
import { IconLogout, IconSettings } from "@tabler/icons-react";
import classes from "../../css/index.module.css";
import { Link } from "react-router-dom";
import ColorSchemeButton from "../../utils/ColorSchemeButton";

type Props = {
  opened: boolean;
  toggle: () => void;
  burger: boolean;
};

const Header = ({ opened, toggle, burger }: Props) => {
  const { user, isAuthenticated, loginWithRedirect, logout } = useAuth0();
  const computedColorScheme = useComputedColorScheme("light");
  const logoutWithRedirect = () =>
    logout({
      logoutParams: {
        returnTo: window.location.origin,
      },
    });
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
      <div>
        <Image
          src={
            computedColorScheme === "light" ? "/LogoLight.png" : "/LogoDark.png"
          }
          alt="logo"
          w={"150px"}
          ml={"md"}
        />
      </div>
      <Group mr={"xl"}>
        <ColorSchemeButton />
        {!isAuthenticated && (
          <Button
            color="teal"
            variant="filled"
            onClick={() => loginWithRedirect()}
            mr={"xxl"}
          >
            Login
          </Button>
        )}
        {isAuthenticated && (
          <Menu shadow="md" width={200}>
            <Menu.Target>
              <Avatar
                src={user!.picture}
                alt={user!.name}
                radius="xl"
                size={40}
              />
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Label>Application</Menu.Label>
              <Link to="/app/profile">
                <Menu.Item
                  leftSection={
                    <IconSettings style={{ width: rem(14), height: rem(14) }} />
                  }
                >
                  Profile
                </Menu.Item>
              </Link>
              <Menu.Item
                leftSection={
                  <IconLogout style={{ width: rem(14), height: rem(14) }} />
                }
                onClick={() => logoutWithRedirect()}
              >
                Logout
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        )}
      </Group>
    </Group>
  );
};

export default Header;
