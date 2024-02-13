"use client";
import { FooterLinks } from "@/components/common/Footer";
import Header from "@/components/common/Header";
import { useDisclosure } from "@mantine/hooks";

export default function AuthError({ children }: { children: React.ReactNode }) {
  const [opened, { toggle }] = useDisclosure();
  return (
    <>
      <Header opened={opened} toggle={toggle} burger />
      {children}
      <FooterLinks />
    </>
  );
}
