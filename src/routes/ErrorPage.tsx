import { useRouteError } from "react-router-dom";
import {
  Title,
  Text,
  Button,
  Container,
  Group,
  Image,
  Loader,
} from "@mantine/core";
import classes from "../css/ViewLink.module.css";
import { Link } from "react-router-dom";

type RouteError = {
  statusText?: string;
  message?: string;
};

const isError = (arg: unknown): arg is RouteError => {
  return (
    typeof arg === "object" &&
    arg !== null &&
    ("statusText" in arg || "message" in arg)
  );
};

export default function ErrorPage() {
  const error = useRouteError();
  if (isError(error)) {
    return (
      <>
        <Group style={{ backgroundColor: "whitesmoke" }} pt={"xs"} pb={"xs"}>
          <Image
            src={"/LogoLight.png"}
            alt="logo"
            h={"49px"}
            w={"150px"}
            ml={"md"}
          />
        </Group>
        <div className={classes.root}>
          <Container>
            <div className={classes.label}>404</div>
            <Title className={classes.title}>{error.statusText}</Title>
            <Text size="lg" ta="center" className={classes.description}>
              Opps! You found something that doesn't exist.
            </Text>
            <Group justify="center">
              <Link to="/">
                <Button variant="white" color="teal" size="md">
                  Go to Home
                </Button>
              </Link>
            </Group>
          </Container>
        </div>
      </>
    );
  }

  return null;
}
