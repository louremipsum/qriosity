"use client";
import Header from "@/components/common/Header";
import { useDisclosure } from "@mantine/hooks";

const TOS = () => {
  const [opened, { toggle }] = useDisclosure();
  return <Header opened={opened} toggle={toggle} burger />;
};

export default TOS;
