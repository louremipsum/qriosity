import { Avatar, Button, Group, Image, Menu, rem, Burger } from "@mantine/core";
import { useAuth0 } from "@auth0/auth0-react";
import { IconLogout, IconUserCircle } from "@tabler/icons-react";

type Props = {
  opened: boolean;
  toggle: () => void;
  burger: boolean;
};

const Header = ({ opened, toggle, burger }: Props) => {
  const { user, isAuthenticated, loginWithRedirect, logout } = useAuth0();
  const logoutWithRedirect = () =>
    logout({
      logoutParams: {
        returnTo: window.location.origin,
      },
    });
  return (
    <Group justify="space-between" align="center" h="100%" p={"md"}>
      {burger && (
        <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
      )}
      <div>
        <Image
          src={"/LogoLight.png"}
          alt="logo"
          height={"49px"}
          width={"150px"}
        />
      </div>
      {!isAuthenticated && (
        <Button
          color="teal"
          variant="filled"
          onClick={() => loginWithRedirect()}
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
            <Menu.Item
              leftSection={
                <IconUserCircle style={{ width: rem(14), height: rem(14) }} />
              }
            >
              Profile
            </Menu.Item>
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
  );
};

export default Header;
