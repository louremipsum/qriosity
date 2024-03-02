"use client";
import Header from "@/components/common/Header";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import {
  Card,
  Container,
  Stack,
  Text,
  Image,
  Button,
  SimpleGrid,
  SegmentedControl,
  List,
  ThemeIcon,
  rem,
  BackgroundImage,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import {
  IconCircleCheck,
  IconCircleArrowUpRightFilled,
  IconCreditCardPay,
  IconPhone,
} from "@tabler/icons-react";
import { UserProfile, useUser } from "@auth0/nextjs-auth0/client";
import { useRouter } from "next/navigation";
import { FooterLinks } from "@/components/common/Footer";

interface PricePlan {
  title: string;
  img: string;
  alt: string;
  use: string;
  monthlyPrice?: string;
  annualPrice?: string;
  features?: string[];
  btnText: string;
  hrefMonthly: string;
  hrefYearly: string;
  btnIcon: JSX.Element;
  disabled: boolean;
}

const price: PricePlan[] = [
  {
    title: "Hobby",
    img: "/Hobby.svg",
    alt: "Hobby plan illustration",
    use: "Ideal for individuals and quick testing",
    monthlyPrice: "$0",
    annualPrice: "$0",
    features: [
      "2 temporary QR codes",
      "Unlimited Updates to QR codes",
      "Expiry based on date, time, or scans",
      "Maximum 100 scans per QR",
    ],
    btnText: "Get Started for Free",
    hrefMonthly: "/dashboard/createqr",
    hrefYearly: "/dashboard/createqr",
    btnIcon: (
      <IconCircleArrowUpRightFilled
        style={{ width: rem(16), height: rem(16) }}
      />
    ),
    disabled: false,
  },
  {
    title: "Pro",
    img: "/Pro.svg",
    alt: "Pro plan illustration",
    use: "Empower small businesses with versatility",
    monthlyPrice: "$6",
    annualPrice: "$5",
    features: [
      "1000 Temporary QR codes",
      "Unlimited Updates to QR codes",
      "Expiry and scheduling of QR codes",
      "Analytics",
    ],
    btnText: "Buy Now",
    hrefMonthly: "STRIPE_PRICE_PRO_MON",
    hrefYearly: "STRIPE_PRICE_PRO_YEAR",
    btnIcon: <IconCreditCardPay style={{ width: rem(16), height: rem(16) }} />,
    disabled: false,
  },
  {
    title: "Business",
    img: "/Business.svg",
    alt: "Business plan illustration",
    use: "Unleash the ultimate QR experience for growth",
    // monthlyPrice: "$15.99",
    // annualPrice: "$14.99",
    // features: [
    //   "All features of Starter, plus",
    //   "1000 QR codes with unlimited updates",
    //   "Priority access to latest features",
    //   "Dedicated support and onboarding",
    // ],
    btnText: "Contact Us",
    hrefMonthly: "/support",
    hrefYearly: "/support",
    btnIcon: <IconPhone style={{ width: rem(16), height: rem(16) }} />,
    disabled: false,
  },
];

const dynamicLink = (
  user: UserProfile,
  pricingPlan: string,
  item: PricePlan,
  router: any
) => {
  return async () => {
    if (item.title === "Hobby") {
      if (user) router.push("/dashboard/createqr");
      else
        router.push(
          `/api/auth/login?returnTo=${encodeURIComponent(
            "/dashboard/createqr"
          )}`
        );
      return;
    }
    if (item.title === "Business") {
      router.push("/support");
      return;
    }
    if (!user) {
      router.push(`/api/auth/login?returnTo=${encodeURIComponent("/pricing")}`);
      return;
    }

    const priceId =
      pricingPlan === "Monthly" ? item.hrefMonthly : item.hrefYearly;
    try {
      const response = await axios.post("/api/checkout-session", {
        userId: user.sub,
        email: user.email,
        name: user.name,
        priceId,
      });
      const { sessionId } = response.data;

      const stripe = await loadStripe(
        process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
      );
      if (stripe) {
        await stripe.redirectToCheckout({ sessionId });
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
};

const Pricing = () => {
  const [opened, { toggle }] = useDisclosure();
  const [pricingPlan, setPricingPlan] = useState("Monthly");
  const { user } = useUser();
  const router = useRouter();
  return (
    <>
      <BackgroundImage src="/bgPrice.svg">
        <Header opened={opened} toggle={toggle} burger />
        <Stack align="center">
          <Container size="md">
            <Text fz={"2rem"} fw={700} m={0} ta={"center"}>
              Find the perfect plan to fit your QR code needs
            </Text>
            <Text fz={"1rem"} fw={400} ta={"center"} mt={"lg"}>
              Unleash the power of temporary, customizable QR codes for seamless
              experiences and enhanced engagement. Choose a plan that suits your
              needs and unlock a world of possibilities
            </Text>
          </Container>
          <SegmentedControl
            color="teal"
            radius={"xl"}
            data={["Monthly", "Yearly"]}
            m={"lg"}
            value={pricingPlan}
            onChange={setPricingPlan}
          />
          <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} mb={40}>
            {price.map((item, index) => (
              <Card
                key={index}
                shadow="sm"
                padding="lg"
                radius="md"
                withBorder
                mb={"lg"}
                w={"20rem"}
              >
                <Card.Section>
                  <div style={{ backgroundColor: "white" }}>
                    <Image
                      src={item.img}
                      alt={item.alt}
                      w={"20rem"}
                      h={"9rem"}
                    />
                  </div>
                </Card.Section>
                <Text fw={500} fz={"2em"} mt={"md"}>
                  {item.title}
                </Text>
                <Text fw={300} c={"dimmed"} h={"3.5rem"}>
                  {item.use}
                </Text>
                {item.monthlyPrice && (
                  <Text size={"1.5em"} c="teal" mt={"md"} p={"xs"}>
                    <span style={{ marginRight: "0.5rem", fontSize: "1.8em" }}>
                      {pricingPlan === "Monthly"
                        ? item.monthlyPrice
                        : item.annualPrice}
                    </span>{" "}
                    /{pricingPlan.toLowerCase()}
                  </Text>
                )}
                {item.features && (
                  <List
                    spacing="sm"
                    size="sm"
                    center
                    p={"xs"}
                    mt={"md"}
                    icon={
                      <ThemeIcon color="teal" size={24} radius="xl">
                        <IconCircleCheck
                          style={{ width: rem(16), height: rem(16) }}
                        />
                      </ThemeIcon>
                    }
                  >
                    {item.features.map((feature, featureIndex) => (
                      <List.Item key={featureIndex}>{feature}</List.Item>
                    ))}
                  </List>
                )}
                <Button
                  color="teal"
                  mt="xl"
                  fullWidth
                  radius="md"
                  rightSection={item.btnIcon}
                  disabled={item.disabled}
                  onClick={dynamicLink(user!, pricingPlan, item, router)}
                >
                  {item.btnText}
                </Button>
              </Card>
            ))}
          </SimpleGrid>
        </Stack>
      </BackgroundImage>
      <FooterLinks />
    </>
  );
};

export default Pricing;
