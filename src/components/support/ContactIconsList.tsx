import { Box, Stack, Text, rem } from "@mantine/core";
import classes from "@styles/ContactIcons.module.css";
import { IconAt, IconMapPin, IconSun } from "@tabler/icons-react";

interface ContactIconProps
  extends Omit<React.ComponentPropsWithoutRef<"div">, "title"> {
  icon: typeof IconSun;
  title: React.ReactNode;
  description: React.ReactNode;
}

function ContactIcon({
  icon: Icon,
  title,
  description,
  ...others
}: ContactIconProps) {
  return (
    <div className={classes.wrapper} {...others}>
      <Box mr="md">
        <Icon style={{ width: rem(24), height: rem(24) }} />
      </Box>

      <div>
        <Text size="xs" className={classes.title}>
          {title}
        </Text>
        <Text className={classes.description}>{description}</Text>
      </div>
    </div>
  );
}

const MOCKDATA = [
  { title: "Email", description: "support@qriosity.xyz", icon: IconAt },
  { title: "Address", description: "India", icon: IconMapPin },
  {
    title: "Working hours",
    description: "10 a.m. - 5 p.m.(IST)",
    icon: IconSun,
  },
];

export function ContactIconsList() {
  const items = MOCKDATA.map((item, index) => (
    <ContactIcon key={index} {...item} />
  ));
  return <Stack>{items}</Stack>;
}
