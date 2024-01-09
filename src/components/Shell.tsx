import "../miscel.css";
import { AppShell, Button } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconPlus } from "@tabler/icons-react";
import QForm from "./QForm";
import Header from "./Header";

function Shell() {
  const [opened, { toggle }] = useDisclosure();
  const navOptions = [
    {
      key: 1,
      name: "View QRs",
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
        <Button
          variant="filled"
          color="teal"
          size="md"
          className="btnGrad"
          radius="xl"
          rightSection={<IconPlus />}
        >
          Create QRs
        </Button>
        {navOptions.map((item) => (
          <Button variant="subtle" mt={"sm"} color="teal" key={item.key}>
            {item.name}
          </Button>
        ))}
      </AppShell.Navbar>

      <AppShell.Main>
        <QForm />
      </AppShell.Main>
    </AppShell>
  );
}

export default Shell;
