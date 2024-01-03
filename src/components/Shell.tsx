import "../miscel.css";
import { AppShell, Burger, Button, Group, Image } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconPlus } from "@tabler/icons-react";
import QForm from "./QForm";

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
      header={{ height: 60 }}
      navbar={{
        width: 250,
        breakpoint: "sm",
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <div>
            <Image
              src={"./LogoLight.png"}
              alt="logo"
              height={"49px"}
              width={"150px"}
            />
          </div>
        </Group>
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
