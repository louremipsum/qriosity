import {
  Body,
  Container,
  Head,
  Html,
  Preview,
  Text,
  Hr,
  Img,
  Section,
  Button,
} from "@react-email/components";

interface QueryEmailProps {
  name: string;
  email: string;
  message: string;
}

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "";

export const QueryEmail: React.FC<Readonly<QueryEmailProps>> = ({
  name,
  email,
  message,
}) => (
  <Html>
    <Head />
    <Preview>You just got an Enquiry from Qriosity Contact Form</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={box}>
          <Img
            src={`${baseUrl}/LogoLight.png`}
            width="281"
            height="90"
            alt="Qriosity"
          />
          <Hr style={hr} />
          <Text style={paragraph}>You Just got an Enquiry from {name}</Text>
          <Text style={paragraph}>Email: {email}</Text>
          <Hr style={hr} />
          <Text style={paragraph}>{message}</Text>
          <Button style={button} href={`mailto:${email}`}>
            Reply to {name}
          </Button>
          <Text style={paragraph}>— Qriosity</Text>
          <Hr style={hr} />
          <Text style={footer}>Qriosity, India</Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

export default QueryEmail;

const main = {
  backgroundColor: "#f6f9fc",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "20px 0 48px",
  marginBottom: "64px",
};

const box = {
  padding: "0 48px",
};

const hr = {
  borderColor: "#e6ebf1",
  margin: "20px 0",
};

const paragraph = {
  color: "#525f7f",

  fontSize: "16px",
  lineHeight: "24px",
  textAlign: "left" as const,
};

const button = {
  backgroundColor: "#656ee8",
  borderRadius: "5px",
  color: "#fff",
  fontSize: "16px",
  fontWeight: "bold",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  width: "100%",
  padding: "10px",
};

const footer = {
  color: "#8898aa",
  fontSize: "12px",
  lineHeight: "16px",
};
