import { Container, Title, Text, Button } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Headers from "../components/Header";

const Index = () => {
  const [opened, { toggle }] = useDisclosure();
  return (
    <Container size="lg">
      <Headers opened={opened} toggle={toggle} burger={false} />
      <Title order={1} size="xl" style={{ marginBottom: "1rem" }}>
        Welcome to Qriosity!
      </Title>
      <Text size="lg" style={{ marginBottom: "2rem" }}>
        A temporary QR code service
      </Text>
      <Button color="teal" size="lg">
        Get Started
      </Button>
    </Container>
  );
};

export default Index;
