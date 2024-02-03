import { Text, Container, useComputedColorScheme, Image } from "@mantine/core";
import classes from "@styles/FooterLinks.module.css";
import Link from "next/link";

const data = [
  {
    title: "About",
    links: [
      { label: "Features", link: "/" },
      { label: "Pricing", link: "/pricing" },
      { label: "Support", link: "/support" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", link: "/privacy" },
      { label: "Terms of Service", link: "/terms-of-service" },
    ],
  },
];

export function FooterLinks() {
  const computedColorScheme = useComputedColorScheme("light");

  const groups = data.map((group) => {
    const links = group.links.map((link, index) => (
      <Link key={index} className={classes.link} href={link.link}>
        {link.label}
      </Link>
    ));

    return (
      <div className={classes.wrapper} key={group.title}>
        <Text className={classes.title}>{group.title}</Text>
        {links}
      </div>
    );
  });

  return (
    <footer className={classes.footer}>
      <Container className={classes.inner}>
        <div className={classes.logo}>
          <div>
            <Image
              src={
                computedColorScheme === "light"
                  ? "/LogoLight.png"
                  : "/LogoDark.png"
              }
              alt="logo"
              w={"150px"}
            />
          </div>
          <Text size="xs" c="dimmed" className={classes.description}>
            Build Temporary QRs with Dynamic Content and Controls
          </Text>
        </div>
        <div className={classes.groups}>{groups}</div>
      </Container>
      <Container className={classes.afterFooter}>
        <Text c="dimmed" size="sm">
          © 2024 Qriosity All rights reserved.
        </Text>
      </Container>
    </footer>
  );
}
