"use client";
import Header from "@/components/common/Header";
import { setUserRole } from "@/lib/features/QRs/qrSlice";
import { useAppDispatch } from "@/lib/hook";
import { useUser, withPageAuthRequired } from "@auth0/nextjs-auth0/client";
import { AppShell, Box, Button } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import classes from "@styles/miscel.module.css";
import {
  IconChartHistogram,
  IconHome,
  IconPlus,
  IconQrcode,
} from "@tabler/icons-react";
import Link from "next/link";
import { useState } from "react";

type Props = {
  children: React.ReactNode;
};

const Navbar = () => {
  const currentPath = window.location.pathname;
  const [active, setActive] = useState<string | null>(currentPath);
  const navOptions = [
    {
      key: 1,
      name: "Dashboard",
      link: "/dashboard",
      icon: <IconHome stroke={1.5} />,
    },

    {
      key: 2,
      name: "View QR",
      link: "/dashboard/viewqr",
      icon: <IconQrcode stroke={1.5} />,
    },
    {
      key: 3,
      name: "Analytics",
      link: "/dashboard/analytics",
      icon: <IconChartHistogram stroke={1.5} />,
    },
  ];
  return (
    <>
      <Link href="/dashboard/createqr">
        <Button
          variant="filled"
          size="md"
          className={classes.btnGrad}
          radius="xl"
          onClick={() => {
            setActive("/dashboard");
          }}
          rightSection={<IconPlus />}
          style={{ width: "100%", textDecoration: "none" }}
        >
          Create QR
        </Button>
      </Link>
      {navOptions.map((item) => (
        <Link href={item.link} key={item.key}>
          <Button
            variant="subtle"
            mt={"sm"}
            p={"xs"}
            size="md"
            fullWidth
            onClick={() => {
              setActive(item.link);
            }}
            color={active === item.link ? "teal" : "gray"}
            leftSection={item.icon}
          >
            {item.name}
          </Button>
        </Link>
      ))}
    </>
  );
};

export default withPageAuthRequired(function Shell({ children }: Props) {
  const [opened, { toggle }] = useDisclosure();
  const dispatch = useAppDispatch();
  const { user } = useUser();
  dispatch(setUserRole((user?.rolesArray as string[])[0]));

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
        <Navbar />
      </AppShell.Navbar>

      <AppShell.Main>
        <Box pl={"xl"} pr={"xl"} pt={"xs"} pb={"xs"}>
          {children}
        </Box>
      </AppShell.Main>
    </AppShell>
  );
});
