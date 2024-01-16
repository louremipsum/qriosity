import { Flex, Loader, Group, Image } from "@mantine/core";

const Load = () => {
  return (
    <>
      <Group style={{ backgroundColor: "white" }} pt={"xs"} pb={"xs"}>
        <Image
          src={"/LogoLight.png"}
          alt="logo"
          h={"49px"}
          w={"150px"}
          ml={"md"}
        />
      </Group>
      <Flex justify={"center"} align={"center"} mih={"100vh"}>
        <Loader size={50} color="teal" type="bars" />
      </Flex>
    </>
  );
};

export default Load;
