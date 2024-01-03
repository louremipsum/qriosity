import {
  TextInput,
  Text,
  Button,
  Group,
  SimpleGrid,
  NumberInput,
  Stack,
  Image,
  rem,
  ActionIcon,
  Flex,
} from "@mantine/core";
import { isInRange, isNotEmpty, useForm } from "@mantine/form";
import { DateInput } from "@mantine/dates";
import { IconCalendar, IconCloudDownload } from "@tabler/icons-react";
import dayjs from "dayjs";
import { useState } from "react";

interface FormValues {
  name: string;
  desc: string;
  ttl: number;
  expiry: Date;
  link: string;
}

// import.meta.env.VITE_GOOGLE_API_KEY

const QForm = () => {
  const dateIcon = <IconCalendar style={{ width: rem(16), height: rem(16) }} />;
  const [QR, setQR] = useState<string>("");
  const form = useForm<FormValues>({
    initialValues: {
      name: "",
      desc: "",
      ttl: 1,
      expiry: new Date(),
      link: "",
    },

    validate: {
      name: isNotEmpty("Name is required"),
      ttl: isInRange({ min: 1 }, "At least 1 scan should be there"),
      // validate if the link is safe to use using GoogleBrowserAPI
    },
  });
  return (
    <>
      <Text
        size={"3rem"}
        fw={900}
        variant="gradient"
        ta={"left"}
        mb={"xl"}
        gradient={{
          from: "rgba(0, 153, 224, 1)",
          to: "rgba(0, 255, 94, 1)",
          deg: 174,
        }}
      >
        QR Generation
      </Text>
      <SimpleGrid cols={2} spacing="sm" verticalSpacing="xs" mt={"xl"}>
        <form onSubmit={form.onSubmit((values) => console.log(values))}>
          <TextInput
            withAsterisk
            label="Name"
            mt={"lg"}
            placeholder="Qriosity..."
            {...form.getInputProps("name")}
          />
          <TextInput
            label="Description"
            mt={"lg"}
            placeholder="What is the QR for?"
            {...form.getInputProps("desc")}
          />
          <NumberInput
            withAsterisk
            label="Valid Scans"
            mt={"lg"}
            min={1}
            placeholder="How many times can this QR be scanned?"
            {...form.getInputProps("ttl")}
          />

          <DateInput
            withAsterisk
            label="Expiry Date"
            placeholder="When should the QR expire?"
            rightSection={dateIcon}
            mt={"lg"}
            minDate={dayjs(new Date()).add(1, "day").toDate()}
            {...form.getInputProps("expiry")}
          />

          <TextInput
            withAsterisk
            label="Link"
            mt={"lg"}
            placeholder="What link should be converted to QR Code?"
            {...form.getInputProps("link")}
          />

          <Group mt="xl">
            <Button type="submit" color="teal">
              Submit
            </Button>
          </Group>
        </form>

        <Stack align="center">
          <Flex
            justify={"center"}
            align={"center"}
            mih={"200px"}
            style={{
              border: "1px dashed #00c7b0",
              borderRadius: "12px",
              width: "200px",
            }}
          >
            <Image
              src={QR}
              fallbackSrc="./Q.png"
              h={"150px"}
              w={"150px"}
              alt="QR Code"
            />
          </Flex>
          <ActionIcon
            variant="filled"
            size="lg"
            aria-label="Download"
            color="teal"
          >
            <IconCloudDownload
              style={{ width: "70%", height: "70%" }}
              stroke={1.5}
            />
          </ActionIcon>
        </Stack>
      </SimpleGrid>
    </>
  );
};

export default QForm;
