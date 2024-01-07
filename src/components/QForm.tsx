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
  Modal,
  Flex,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { isInRange, isNotEmpty, useForm } from "@mantine/form";
import { DateInput } from "@mantine/dates";
import { IconCalendar, IconCloudDownload } from "@tabler/icons-react";
import dayjs from "dayjs";
import { useState } from "react";
import axios from "axios";

interface FormValues {
  name: string;
  desc: string;
  ttl: number;
  expiry: Date;
  link: string;
}

interface CheckURLResponse {
  matches?: {
    threatType: string;
    platformType: string;
    threat: {
      url: string;
    };
    cacheDuration: string;
    threatEntryType: string;
  }[];
}

const QForm = () => {
  const dateIcon = <IconCalendar style={{ width: rem(16), height: rem(16) }} />;
  const [QR, setQR] = useState<string>("");
  const [opened, { open, close }] = useDisclosure(false);
  const [match, setMatch] = useState<CheckURLResponse>({});
  const API_URL = "https://safebrowsing.googleapis.com/v4/threatMatches:find";
  const form = useForm<FormValues>({
    initialValues: {
      name: "",
      desc: "",
      ttl: 1,
      expiry: new Date(),
      link: "",
    },

    validate: {
      name: (value) =>
        value.length < 1 ? "First name must have at least 1 letters" : null,
      ttl: isInRange({ min: 1 }, "At least 1 scan should be there"),
      link: isNotEmpty("Link is required"),
    },
  });

  const checkURL = async (url: string): Promise<CheckURLResponse> => {
    try {
      const response = await axios.post(
        API_URL,
        {
          client: {
            clientId: "Qriosity", // Replace with your client ID
            clientVersion: "1.0.0", // Replace with your client version
          },
          threatInfo: {
            threatTypes: ["MALWARE", "SOCIAL_ENGINEERING", "UNWANTED_SOFTWARE"],
            platformTypes: ["ANY_PLATFORM"],
            threatEntryTypes: ["URL"],
            threatEntries: [{ url }],
          },
        },
        {
          params: { key: import.meta.env.VITE_GOOGLE_API_KEY },
        }
      );

      return response.data;
    } catch (error) {
      console.error("Error checking URL:", error);
      // Handle the error accordingly, e.g., log it or return false
      return { matches: [] };
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (form.validate().hasErrors) return;
    const response = await checkURL(form.values.link);
    setMatch(response);
    if (!response.matches) {
      console.log(form.values);
    } else {
      // Display modal here
      // You can use Mantine's Modal component for this
      open();
    }
  };

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title="Unsafe URL Detected"
        centered
        overlayProps={{
          backgroundOpacity: 0.55,
          blur: 3,
        }}
      >
        <Image
          src={"./warning.png"}
          alt="warning"
          h={100}
          w="auto"
          fit="contain"
          m={"1rem auto"}
        />
        The link you have entered is unsafe according to Google Safe Browsing.
        Please try again. The link has been reported as{" "}
        <b>{match.matches![0].threatType} </b>.
      </Modal>
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
        <form onSubmit={handleSubmit}>
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

//TODO: safe browsing api
//TODO: when click submit then see if filled data is not same as previous data, check safe browsing api, get the s3 link
// and set it to image tag, download it via HTML2Canvas library from frontend
