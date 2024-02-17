import { Flex, Stack, Text } from "@mantine/core";

const Analytics = () => {
  return (
    <>
      <Stack mt={"md"}>
        <Text
          size={"3rem"}
          fw={600}
          variant="gradient"
          ta={"left"}
          mb={"xl"}
          gradient={{
            from: "rgba(0, 153, 224, 1)",
            to: "rgba(0, 255, 94, 1)",
            deg: 174,
          }}
        >
          Analytics
        </Text>
        <Flex
          justify={"center"}
          align={"center"}
          w={"100%"}
          h={"60vh"}
          c={"gray"}
          style={{ backgroundColor: "#F1F3F5", borderRadius: "12px" }}
        >
          <Text fz={"xl"} fw={700} c={"gray"}>
            Coming Soon...
          </Text>
        </Flex>
      </Stack>
    </>
  );
};

export default Analytics;
