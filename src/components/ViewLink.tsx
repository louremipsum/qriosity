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

interface ViewLinkProps {
  status?: string;
  title?: string;
  description?: string;
  buttonText?: string;
  loading?: boolean;
  buttonAction?: () => void;
}

/**
 * Handles the rendering of ViewId components considering different scenarios like error or successful response.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {string} props.status - The status of the link.
 * @param {string} props.title - The title of the link.
 * @param {string} props.description - The description of the link.
 * @param {string} props.buttonText - The text for the button.
 * @param {Function} props.buttonAction - The action to be performed when the button is clicked.
 * @returns {JSX.Element} The rendered view link component.
 */
const ViewLink: React.FC<ViewLinkProps> = ({
  status,
  title,
  description,
  buttonText,
  loading,
  buttonAction,
}) => {
  return (
    <>
      <Group style={{ backgroundColor: "whitesmoke" }} p={"xs"}>
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
          {status && <div className={classes.label}>{status}</div>}
          {loading ? (
            <Loader />
          ) : (
            <Title className={classes.title}>{title}</Title>
          )}
          {description && (
            <Text size="lg" ta="center" className={classes.description}>
              {description}
            </Text>
          )}
          {!loading && (
            <Group justify="center">
              <Button
                variant="white"
                color="teal"
                size="md"
                onClick={buttonAction}
              >
                {buttonText}
              </Button>
            </Group>
          )}
        </Container>
      </div>
    </>
  );
};

export default ViewLink;
