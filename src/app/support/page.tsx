"use client";
import { FooterLinks } from "@/components/common/Footer";
import Header from "@/components/common/Header";
import { useDisclosure } from "@mantine/hooks";

const Support = () => {
  const [opened, { toggle }] = useDisclosure();
  return (
    <>
      <Header opened={opened} toggle={toggle} burger />
      <FooterLinks />
    </>
  );
};

export default Support;
