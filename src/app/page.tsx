"use client";
import {
  Title,
  Text,
  Button,
  Stack,
  Group,
  BackgroundImage,
  Container,
  SimpleGrid,
  Paper,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Headers from "@/components/common/Header";
import Link from "next/link";
import { FooterLinks } from "@/components/common/Footer";
import Image from "next/image";
import classes from "@styles/HeroHeader.module.css";
import {
  IconChevronRight,
  IconQrcode,
  IconLink,
  IconCalendarTime,
  IconClockHour3,
  IconHash,
} from "@tabler/icons-react";
import { Fredericka_the_Great } from "next/font/google";

const FrederickaFont = Fredericka_the_Great({
  weight: "400",
  display: "swap",
  subsets: ["latin"],
});

type Feature = {
  title: string;
  description: string;
  icon: JSX.Element;
};

const featuresData: Feature[] = [
  {
    title: "Dynamic Content",
    description:
      "Generate QR Codes with dynamic content that can be updated at any time",
    icon: <IconQrcode size={64} stroke={1.5} color="teal" />,
  },
  {
    title: "Mask URL",
    description:
      "Your original link is masked with a URL to protect your privacy",
    icon: <IconLink size={64} stroke={1} color="teal" />,
  },
  {
    title: "Scheduled Expiry",
    description:
      "Set a date and time for the QR Code to expire and become inactive",
    icon: <IconCalendarTime size={64} stroke={1} color="teal" />,
  },
  {
    title: "Scheduled Activation",
    description:
      "Set a date and time for the QR Code to become active and scannable",
    icon: <IconCalendarTime size={64} stroke={1} color="teal" />,
  },
  {
    title: "Number of Scans",
    description:
      "Set the number of times the QR Code can be scanned before it expires",
    icon: <IconHash size={64} stroke={1} color="teal" />,
  },
  {
    title: "One-time Use",
    description: "Make one-time scanable QR Codes for special events or offers",
    icon: <IconClockHour3 size={64} stroke={1} color="teal" />,
  },
];

const Feature = () => {
  const feat = featuresData.map((feature: Feature, Index: number) => (
    <Paper
      key={Index}
      shadow="sm"
      radius="lg"
      p="xl"
      className={classes.featCard}
    >
      <div>{feature.icon}</div>
      <Text fz={"xl"} mt={"md"}>
        {feature.title}
      </Text>
      <Text c={"dimmed"} fz={"lg"} mt={"md"}>
        {feature.description}
      </Text>
    </Paper>
  ));
  return (
    <Container size="xl" id="features">
      <SimpleGrid
        cols={{ base: 1, sm: 2, lg: 2 }}
        spacing={{ base: 10, sm: "xl" }}
        verticalSpacing={{ base: "md", sm: "xl" }}
      >
        {feat}
      </SimpleGrid>
    </Container>
  );
};

function Video() {
  return (
    <video
      width="320"
      height="240"
      loop
      muted
      preload="auto"
      playsInline
      style={{ border: "1px dashed black" }}
    >
      <source src="/DemoVideo.gif" type="video/gif" />
      Your browser does not support the video tag.
    </video>
  );
}

const Demo = () => {
  return (
    <Stack mb={80} mt={80}>
      <Text fw={700} mt={80} ta="center" className={classes.featHeading}>
        How it all works out?
      </Text>
      <Image
        src={"/arrow.svg"}
        alt=""
        width={200}
        height={200}
        className={classes.arrow}
      />
      {/* TODO: fix the appearance of the text below (margin) for small screens */}
      <Group justify="space-around">
        <Stack w={"30%"}>
          <Text className={classes.demoTitle}>Create QR in 1-Click</Text>
          <Text className={classes.demoDesc}>
            Enter the Information and conditions of validity and click on button
            to generate QR Code along with the link which is embedded in the QR
            for easy testing
          </Text>
        </Stack>
        <Video />
      </Group>
    </Stack>
  );
};

const Index = () => {
  const [opened, { toggle }] = useDisclosure();
  // const computedColorScheme = useComputedColorScheme("light");

  return (
    <>
      <BackgroundImage src={"/bg.svg"} radius="xs">
        <Headers opened={opened} toggle={toggle} burger />
        <Container size="xl">
          <div className={classes.inner}>
            <div className={classes.contentTitle}>
              <Title className={classes.title}>
                Generate{" "}
                <span
                  className={`${classes.highlight} ${FrederickaFont.className}`}
                >
                  Temporary
                </span>{" "}
                <div style={{ marginTop: "1rem" }}>
                  QR Codes For
                  <div className={classes.slidingVertical}>
                    <span>Attendance</span>
                    <span>Events</span>
                    <span>URL Masking</span>
                    <span>Single-Use</span>
                    <span>Forms</span>
                  </div>
                </div>
              </Title>
              <Text c="dimmed" className={classes.description}>
                Build temporary QR Codes with Dynamic Content and Controls
              </Text>
              <Group mt={40}>
                <Link href="/dashboard/createqr">
                  <Button
                    color="teal"
                    size="md"
                    radius={"md"}
                    rightSection={<IconChevronRight />}
                  >
                    Get Started
                  </Button>
                </Link>
              </Group>
            </div>
            <Stack align="center">
              <Image
                src={"/landing.svg"}
                alt="scan illustration"
                width={500}
                height={500}
                priority={true}
                className={classes.image}
              />
              <a
                href="https://storyset.com/technology"
                className={classes.caption}
              >
                <i>Illustrations by Storyset</i>
              </a>
            </Stack>
          </div>
        </Container>
        {/* <Demo /> */}
        <Stack>
          <Text
            fw={700}
            mt={80}
            ta="center"
            className={classes.featHeading}
            variant="gradient"
            gradient={{ from: "rgba(67, 162, 222, 1)", to: "cyan", deg: 90 }}
            id="features"
          >
            Breathe Life into your QR Codes
          </Text>
          <Text mb={80} ta="center" className={classes.featDesc}>
            Make the QRs Dynamic and not just Static Text
          </Text>
          <Feature />
        </Stack>
        <Stack align="center" justify="center">
          <Text className={classes.ctaText}>
            Let&apos;s start building something amazing together
          </Text>
          <Link href="/dashboard/createqr">
            <Button
              color="teal"
              size="md"
              radius={"md"}
              mb={80}
              rightSection={<IconChevronRight />}
            >
              Start Building Your QR
            </Button>
          </Link>
        </Stack>
      </BackgroundImage>
      <FooterLinks />
    </>
  );
};

export default Index;
