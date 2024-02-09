"use client";
import classes from "@styles/miscel.module.css";
import { AppShell, Button } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconPlus } from "@tabler/icons-react";
import Header from "@/components/common/Header";
import { withPageAuthRequired } from "@auth0/nextjs-auth0/client";
import Link from "next/link";

type Props = {
  children: React.ReactNode;
};

export default withPageAuthRequired(function Shell({ children }: Props) {
  const [opened, { toggle }] = useDisclosure();
  const navOptions = [
    {
      key: 1,
      name: "View QRs",
      link: "/dashboard/viewqr",
    },
  ];

  return (
    <AppShell
      header={{ height: 80 }}
      navbar={{
        width: 250,
        breakpoint: "md",
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Header>
        <Header opened={opened} toggle={toggle} burger />
      </AppShell.Header>

      <AppShell.Navbar p="md">
        <Link href="/dashboard/createqr">
          <Button
            variant="filled"
            color="teal"
            size="md"
            className={classes.btnGrad}
            radius="xl"
            rightSection={<IconPlus />}
            style={{ width: "100%", textDecoration: "none" }}
          >
            Create QRs
          </Button>
        </Link>
        {navOptions.map((item) => (
          <Link href={item.link} key={item.key}>
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
});
