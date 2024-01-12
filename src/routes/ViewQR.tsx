// type Props = {}
import Shell from "../components/Shell";
import { Text } from "@mantine/core";

const ViewQR = () => {
  return (
    <Shell>
      <Text
        size={"3rem"}
        fw={900}
        variant="gradient"
        ta={"left"}
        mb={"xl"}
        gradient={{
          from: "rgba(0, 153, 224, 1)",
          to: "rgba(0, 255, 94, 1)",
          deg: 174,
        }}
      >
        View QRs
      </Text>
    </Shell>
  );
};

export default ViewQR;
