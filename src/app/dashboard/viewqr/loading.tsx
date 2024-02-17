import { Flex, Loader } from "@mantine/core";

const Loading = () => {
  return (
    <Flex justify={"center"} align={"center"} mih={"100vh"}>
      <Loader size={50} color="teal" type="bars" />
    </Flex>
  );
};

export default Loading;
