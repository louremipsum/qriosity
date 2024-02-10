"use client";
import { FooterLinks } from "@/components/common/Footer";
import Header from "@/components/common/Header";
import { ContactUs } from "@/components/support/ContactUs";
import { useDisclosure } from "@mantine/hooks";

const Support = () => {
  const [opened, { toggle }] = useDisclosure();
  return (
    <>
      <Header opened={opened} toggle={toggle} burger />
      <ContactUs />
      <FooterLinks />
    </>
  );
};

export default Support;
