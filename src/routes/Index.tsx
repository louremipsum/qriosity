import {
  Title,
  Text,
  Button,
  Stack,
  Group,
  BackgroundImage,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Headers from "../components/common/Header";
import classes from "../css/index.module.css";
import { Link } from "react-router-dom";

const Index = () => {
  const [opened, { toggle }] = useDisclosure();
  return (
    <BackgroundImage src="/illlus/Grad_07.png" radius="xs">
      <Headers opened={opened} toggle={toggle} burger={false} />
      <div style={{ height: "100vh", overflowY: "hidden" }}>
        <Stack align="center" justify="center">
          <Title
            order={1}
            style={{
              margin: "2rem 0 0.5rem 0",
              textAlign: "center",
              fontSize: 60,
            }}
          >
            Generate <span className="b"></span>
            <span className={classes.temp}>Temporary</span> QR Codes!
          </Title>
          <Text
            size="sm"
            style={{ marginBottom: "2rem" }}
            c={"black"}
            ta={"center"}
            fw={500}
          >
            Qriosity is a QR code generator that allows you to create temporary
            QR codes that expire after a certain amount of time/scans.
          </Text>
        </Stack>
        <Group justify="center">
          <Link to="app/createqr">
            <Button color="teal" size="md" m={"sm"}>
              Get Started
            </Button>
          </Link>
          <Button color="teal" size="md" variant="outline" m={"sm"}>
            Watch Demo
          </Button>
        </Group>
      </div>
    </BackgroundImage>
  );
};

export default Index;
