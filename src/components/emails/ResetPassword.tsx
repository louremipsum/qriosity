import {
  Body,
  Button,
  Container,
  Head,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
  Font,
  Row,
  Column,
  Hr,
} from "@react-email/components";

const baseUrl = "www.qriosity.xyz";

export const ResetPassword = () => {
  return (
    <Html>
      <Head>
        <Font
          fontFamily="Inter"
          fallbackFontFamily={["Helvetica", "Arial", "sans-serif"]}
        />
      </Head>
      <Preview>Qriosity reset your password</Preview>
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
              <Text style={text}>Hi userName,</Text>
              <Text style={text}>
                Someone recently requested a password change for your Qriosity
                account. If this was you, you can set a new password here:
              </Text>
              <Section>
                <Row>
                  <Column align="center">
                    <Button
                      style={button}
                      href="https://www.qriosity.xyz/dashboard/createqr"
                    >
                      Reset password
                    </Button>
                    <Text>(This link is valid for 5 mins)</Text>
                  </Column>
                </Row>
              </Section>
              <Text style={text}>
                If you don&apos;t want to change your password or didn&apos;t
                request this, just ignore and delete this message.
              </Text>
            </Section>
            <Hr />
            <Section style={lowerSection}>
              <Container align="center">
                <Text style={cautionText}>
                  To keep your account secure, please don&apos;t forward this
                  email to anyone.
                </Text>
              </Container>
            </Section>
          </Section>
          <Text style={footerText}>
            This message was produced and distributed by Qriosity. All rights
            reserved. Qriosity is a registered trademark of{" "}
            <Link href="https://www.qriosity.xyz/" target="_blank" style={link}>
              Qriosity.xyz
            </Link>
            . View our{" "}
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
};

export default ResetPassword;

const main = {
  backgroundColor: "#fff",
  color: "#212121",
};

const container = {
  padding: "20px",
  margin: "0 auto",
  backgroundColor: "#eee",
};

const coverSection = { backgroundColor: "#fff" };

const upperSection = { padding: "25px 35px" };

const lowerSection = { padding: "25px 35px" };

const logo = {
  backgroundColor: "#9bdbd6",
  borderRadius: "8px",
  height: "10rem",
};

const text = {
  fontSize: "16px",
  fontFamily:
    "'Open Sans', 'HelveticaNeue-Light', 'Helvetica Neue Light', 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif",
  fontWeight: "300",
  color: "#404040",
  lineHeight: "26px",
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
const cautionText = { ...text, margin: "0px", color: "gray" };

const link = {
  color: "#00a495",
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: "14px",
  textDecoration: "underline",
};

const footerText = {
  ...text,
  fontSize: "12px",
  padding: "0 20px",
};
