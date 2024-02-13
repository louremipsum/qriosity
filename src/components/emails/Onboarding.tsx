import {
  Body,
  Button,
  Column,
  Container,
  Font,
  Head,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Text,
} from "@react-email/components";

interface QueryEmailProps {
  name: string;
}

const baseUrl = process.env.WEBSITE_URL
  ? `https://${process.env.WEBSITE_URL}`
  : "";

export const OnboardingEmail: React.FC<Readonly<QueryEmailProps>> = ({
  name,
}) => (
  <Html>
    <Head>
      <Font
        fontFamily="Inter"
        fallbackFontFamily={["Helvetica", "Arial", "sans-serif"]}
      />
    </Head>
    <Preview>Welcome to Qriosity👋</Preview>
    <Body style={main}>
      <Container style={container}>
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
        <Section style={box}>
          <Section>
            <Text style={heading}>Welcome to Qriosity!🎉</Text>
          </Section>
          <Section>
            <Text style={greeting}>Hey {name},</Text>
            <Text style={paragraph}>
              Thank you for signing up to Qriosity! We&apos;re thrilled to have
              you on board and excited to help you harness the power of
              temporary, customizable QR codes.
            </Text>
          </Section>
          <Section style={feat}>
            <Text style={subHeading}>What is Qriosity?</Text>
            <Text style={paragraph}>
              Qriosity empowers you to create QR codes that can adapt to your
              needs. Set expiry dates, limit scans, update links on the fly, and
              gain valuable insights with analytics! No more static QR codes -
              create dynamic experiences that engage your audience in innovative
              ways.
            </Text>
          </Section>
          <Section>
            <Row>
              <Column style={featIcon}>
                <Img
                  src={`${baseUrl}/qrCode.png`}
                  width="72"
                  height="72"
                  alt="qrCode"
                />
              </Column>
              <Column style={{ margin: "0 20px" }}>
                <Row>
                  <Text style={featHeading}>Dynamic Content</Text>
                </Row>
                <Row>
                  <Text style={featParagraph}>
                    QR Code&apos;s content that can be updated at any time
                  </Text>
                </Row>
              </Column>
              <Column></Column>

              <Column style={featIcon}>
                <Img
                  src={`${baseUrl}/CalenderIcon.png`}
                  width="72"
                  height="72"
                  alt="dateTime"
                />
              </Column>
              <Column style={{ margin: "0 20px" }}>
                <Row>
                  <Text style={featHeading}>Date and Time </Text>
                </Row>

                <Row>
                  <Text style={featParagraph}>
                    Set a date and time for the QR Code to expire or/and
                    schedule
                  </Text>
                </Row>
              </Column>
            </Row>
            <Row>
              <Column style={featIcon}>
                <Img
                  src={`${baseUrl}/HashIcon.png`}
                  width="72"
                  height="72"
                  alt="hash"
                />
              </Column>
              <Column>
                <Row>
                  <Text style={featHeading}>Number of Scans</Text>
                </Row>

                <Text style={featParagraph}>
                  Set the number of times the QR Code can be scanned
                </Text>
              </Column>
              <Column></Column>
              <Column style={featIcon}>
                <Img
                  src={`${baseUrl}/LinkIcon.png`}
                  width="72"
                  height="72"
                  alt="url"
                />
              </Column>
              <Column style={{ margin: "0 20px" }}>
                <Row>
                  <Text style={featHeading}>Masked URL</Text>
                </Row>

                <Row>
                  <Text style={featParagraph}>
                    Your original link is masked with a Qriosity generated URL
                  </Text>
                </Row>
              </Column>
            </Row>
          </Section>
          <Container style={getStarted}>
            <Text style={heading}>Create your first dynamic QR today.🚀</Text>
            <Button
              style={button}
              href="https://www.qriosity.xyz/dashboard/createqr"
            >
              Get Started Today
            </Button>
          </Container>
          <Section style={foot}>
            <Row>
              <Column style={{ width: "40%", padding: "20px" }}>
                <Text style={footHeading}>Share the word!</Text>
                <Text style={footPara}>
                  Now that you have discovered the world of dynamic QRs,
                  Consider sharing on Twitter about us.
                </Text>
              </Column>
              <Column
                style={{
                  padding: "20px 20px 60px 20px",
                }}
              >
                <Text style={footHeading}>Reach out to Us!</Text>
                <Text style={footPara}>
                  <Link
                    href="mailto:hello@qriosity.xyz"
                    style={{
                      color: "#00c7b0",
                      fontSize: "18px",
                      fontWeight: 500,
                    }}
                  >
                    hello@qriosity.xyz
                  </Link>
                </Text>
              </Column>
            </Row>
          </Section>
          <Hr style={hr} />
          <Container style={{ textAlign: "center", color: "gray" }}>
            <Text style={paragraph}>
              If you have any questions or need help getting started, feel free
              to reach out to us at{" "}
              <Link href="mailto:support@qriosity.xyz">
                support@qriosity.xyz
              </Link>
            </Text>

            <Text>Sincerely, Qriosity💌</Text>
          </Container>
        </Section>
      </Container>
    </Body>
  </Html>
);

export default OnboardingEmail;

const main = {
  backgroundColor: "#f6f9fc",
  margin: "auto",
  maxWidth: "50em",
};

const feat = {
  padding: "20px 0",
  marginBotttom: "40px",
};

const footHeading = {
  fontSize: "18px",
  fontWeight: 500,
  lineHeight: " 24px",
  letterSpacing: "-0.2px",
  color: "#ffffff",
};

const footPara = {
  fontSize: "14px",
  lineHeight: "20px",
  letterSpacing: "-0.2px",
  color: "#d8d8d8",
};

const foot = {
  padding: "21px 20px 14px 20px",
  backgroundColor: "#1b1b1b",
  borderRadius: "8px",
  maxWidth: "45em",
};

const getStarted = {
  marginTop: "40px",
  padding: "20px 0",
  textAlign: "center" as const,
  borderRadius: "8px",
  backgroundColor: "#f6f9fc",
  maxWidth: "100%",
};

const logo = {
  backgroundColor: "#9bdbd6",
  borderRadius: "8px",
  height: "10rem",
};

const subHeading = {
  fontSize: "28px",
  padding: "10px 20px 0",
  fontWeight: 700,
  lineHeight: "34px",
  letterSpacing: "-0.4px",
  color: "#00c7b0",
};

const featIcon = {
  padding: "6px 10px 0 0",
};

const featParagraph = {
  lineHeight: "20px",
  fontSize: "14px",
  fontWeight: 300,
  letterSpacing: "-0.2px",
  color: "#001524",
  width: "150px",
  margin: "5px 0 0 0",
};

const featHeading = {
  fontSize: "16px",
  lineHeight: "28px",
  fontWeight: 500,
  letterSpacing: "-0.4px",
  color: "#151515",
  margin: "20px 0 5px 0",
};

const heading = {
  fontSize: "32px",
  padding: "10px 20px 0",
  fontWeight: 700,
  lineHeight: "34px",
  letterSpacing: "-0.4px",
  color: "#151515",
};

const container = {
  backgroundColor: "#ffffff",
  padding: "20px 0 48px",
  maxWidth: "45em",
  marginBottom: "24px",
};

const box = {
  padding: "48px 20px",
};

const hr = {
  borderColor: "#e6ebf1",
  margin: "20px 0",
};

const paragraph = {
  padding: "10px 20px 0",
  lineHeight: "28px",
  fontSize: "16px",
  fontWeight: 300,
  letterSpacing: "-0.2px",
  color: "#121212",
};

const greeting = {
  padding: "10px 20px 0",
  lineHeight: "28px",
  fontSize: "16px",
  fontWeight: 300,
  letterSpacing: "-0.2px",
  color: "#121212",
  textAlign: "left" as const,
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
