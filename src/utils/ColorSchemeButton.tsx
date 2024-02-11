import {
  ActionIcon,
  useComputedColorScheme,
  useMantineColorScheme,
  Text,
  rem,
} from "@mantine/core";
import { IconSun, IconMoon } from "@tabler/icons-react";
import cx from "clsx";
import classes from "@/styles/index.module.css";

type ColorSchemeButtonType = {
  text?: boolean;
};

const ColorSchemeButton = ({ text }: ColorSchemeButtonType) => {
  const { setColorScheme } = useMantineColorScheme({ keepTransitions: true });
  const computedColorScheme = useComputedColorScheme("light", {
    getInitialValueInEffect: true,
  });

  const nextColorScheme = computedColorScheme === "light" ? "dark" : "light";

  return text ? (
    <div
      onClick={() => setColorScheme(nextColorScheme)}
      style={{ display: "flex", alignItems: "center" }}
    >
      {nextColorScheme === "dark" ? (
        <IconMoon style={{ width: rem(24), height: rem(24) }} stroke={1.2} />
      ) : (
        <IconSun style={{ width: rem(24), height: rem(24) }} stroke={1.2} />
      )}
      <Text span fz={"md"} ml={"xs"}>
        Switch to {nextColorScheme}
      </Text>
    </div>
  ) : (
    <ActionIcon
      onClick={() => setColorScheme(nextColorScheme)}
      variant="default"
      size="xl"
      aria-label="Toggle color scheme"
      title="Toggle color scheme"
    >
      <IconSun className={cx(classes.icon, classes.light)} stroke={1.5} />
      <IconMoon className={cx(classes.icon, classes.dark)} stroke={1.5} />
    </ActionIcon>
  );
};

export default ColorSchemeButton;
