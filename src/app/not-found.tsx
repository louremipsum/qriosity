"use client";
import Link from "next/link";
import { Button, Group, Image, Text } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import classes from "@styles/ViewLink.module.css";
import { FooterLinks } from "@/components/common/Footer";

export default function NotFound() {
  const matches = useMediaQuery("(min-width: 48em)");

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
        <Group justify={!matches ? "around" : "center"}>
          <main>
            <div className={classes.label}>404</div>
            <Text size="lg" ta="center" className={classes.description}>
              Oops! You found something that does not exist.
            </Text>
            <Group justify="center">
              <Link href="/">
                <Button variant="white" color="teal" size="md">
                  Go to Home
                </Button>
              </Link>
            </Group>
          </main>
          {matches && (
            <Image
              src={"/NotFound404.svg"}
              h={"40%"}
              w={"40%"}
              alt="Not Found"
            />
          )}
        </Group>
      </div>
      <FooterLinks />
    </>
  );
}
