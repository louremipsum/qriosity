"use client";
import Header from "@/components/common/Header";
import { useDisclosure } from "@mantine/hooks";

const Privacy = () => {
  const [opened, { toggle }] = useDisclosure();
  return <Header opened={opened} toggle={toggle} burger />;
};

export default Privacy;
