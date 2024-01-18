import { ActionIcon } from "@mantine/core";
import { useComputedColorScheme, useMantineColorScheme } from "@mantine/core";
import { IconSun, IconMoon } from "@tabler/icons-react";

const ColorSchemeButton = () => {
  const { setColorScheme } = useMantineColorScheme({ keepTransitions: true });
  const computedColorScheme = useComputedColorScheme("light");

  const toggleColorScheme = () => {
    setColorScheme(computedColorScheme === "dark" ? "light" : "dark");
  };

  return (
    <ActionIcon
      variant="subtle"
      autoContrast
      size="lg"
      onClick={toggleColorScheme}
      aria-label="Color scheme"
      color="teal"
    >
      {computedColorScheme === "dark" ? (
        <IconMoon style={{ width: "70%", height: "70%" }} stroke={1.5} />
      ) : (
        <IconSun style={{ width: "70%", height: "70%" }} stroke={1.5} />
      )}
    </ActionIcon>
  );
};

export default ColorSchemeButton;
