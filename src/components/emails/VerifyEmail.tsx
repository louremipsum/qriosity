import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
  Row,
  Column,
  Button,
  Font,
} from "@react-email/components";
import * as React from "react";

const baseUrl = "www.qriosity.xyz";

export default function VerifyEmail() {
  return (
    <Html>
      <Head>
        <Font
          fontFamily="Inter"
          fallbackFontFamily={["Helvetica", "Arial", "sans-serif"]}
        />
      </Head>
      <Preview>Qriosity Email Verification</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={coverSection}>
            <Section style={logo}>
              <Row>
                <Column align="center">
                  <Link href="https://www.qriosity.xyz/">
                    <Img
                      src={`${baseUrl}/LogoLight.png`}
                      width="281"
                      height="90"
                      alt="Qriosity"
                    />
                  </Link>
                </Column>
              </Row>
            </Section>
            <Section style={upperSection}>
              <Heading style={h1}>Verify your email address</Heading>
              <Text style={mainText}>
                Thanks for starting the new Qriosity account creation process.
                We want to make sure it&apos;s really you. Please enter the
                following verification code when prompted. If you don&apos;t
                want to create an account, you can ignore this message.
              </Text>
              <Section>
                <Row>
                  <Column align="center">
                    <Button
                      style={button}
                      href="https://www.qriosity.xyz/dashboard/createqr"
                    >
                      Verify Your Email
                    </Button>
                    <Text>(This link is valid for 10mins)</Text>
                  </Column>
                </Row>
              </Section>
            </Section>
            <Hr />
            <Section style={lowerSection}>
              <Text style={cautionText}>
                Qriosity will never email you and ask you to disclose or verify
                your password, credit card, or banking account number.
              </Text>
            </Section>
          </Section>
          <Text style={footerText}>
            This message was produced and distributed by Qriosity. All rights
            reserved. Qriosity is a registered trademark of{" "}
            <Link href="https://www.qriosity.xyz/" target="_blank" style={link}>
              Qriosity.xyz
            </Link>
            , Inc. View our{" "}
            <Link
              href="https://www.qriosity.xyz/privacy"
              target="_blank"
              style={link}
            >
              privacy policy
            </Link>
            .
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

const main = {
  backgroundColor: "#fff",
  color: "#212121",
};

const container = {
  padding: "20px",
  margin: "0 auto",
  backgroundColor: "#eee",
};

const h1 = {
  color: "#333",
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: "20px",
  fontWeight: "bold",
  marginBottom: "15px",
};

const link = {
  color: "#2754C5",
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: "14px",
  textDecoration: "underline",
};

const text = {
  color: "#333",
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: "14px",
  margin: "24px 0",
};

const coverSection = { backgroundColor: "#fff" };

const upperSection = { padding: "25px 35px" };

const lowerSection = { padding: "25px 35px" };

const footerText = {
  ...text,
  fontSize: "12px",
  padding: "0 20px",
};

const logo = {
  backgroundColor: "#9bdbd6",
  borderRadius: "8px",
  height: "10rem",
};

const button = {
  backgroundColor: "#00a495",
  borderRadius: "5px",
  color: "#fff",
  fontSize: "16px",
  fontWeight: "bold",
  textDecoration: "none",
  textAlign: "center" as const,

  padding: "13px 17px",
  margin: "20px 0",
};

const mainText = { ...text, marginBottom: "14px" };

const cautionText = { ...text, margin: "0px" };
