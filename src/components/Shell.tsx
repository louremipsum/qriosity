import "../miscel.css";
import { AppShell, Button } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconPlus } from "@tabler/icons-react";
import Header from "./Header";
import { Link } from "react-router-dom";

type Props = {
  children: React.ReactNode;
};

function Shell({ children }: Props) {
  const [opened, { toggle }] = useDisclosure();
  const navOptions = [
    {
      key: 1,
      name: "View QRs",
      link: "/app/viewqr",
    },
  ];

  return (
    <AppShell
      header={{ height: 80 }}
      navbar={{
        width: 250,
        breakpoint: "sm",
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Header>
        <Header opened={opened} toggle={toggle} burger />
      </AppShell.Header>

      <AppShell.Navbar p="md">
        <Link to="/app/createqr">
          <Button
            variant="filled"
            color="teal"
            size="md"
            className="btnGrad"
            radius="xl"
            rightSection={<IconPlus />}
            style={{ width: "100%", textDecoration: "none" }}
          >
            Create QRs
          </Button>
        </Link>
        {navOptions.map((item) => (
          <Link to={item.link} key={item.key}>
            <Button
              variant="subtle"
              mt={"sm"}
              color="teal"
              style={{ width: "100%" }}
            >
              {item.name}
            </Button>
          </Link>
        ))}
      </AppShell.Navbar>

      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}

export default Shell;
