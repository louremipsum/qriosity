"use client";
import Header from "@/components/common/Header";
import { useDisclosure } from "@mantine/hooks";

const Cancellation = () => {
  const [opened, { toggle }] = useDisclosure();
  return <Header opened={opened} toggle={toggle} burger={false} />;
};

export default Cancellation;
