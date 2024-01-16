import {
  TextInput,
  Text,
  Button,
  Group,
  SimpleGrid,
  NumberInput,
  Image,
  rem,
  Modal,
  Checkbox,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { isInRange, isNotEmpty, useForm } from "@mantine/form";
import { DateInput } from "@mantine/dates";
import { IconCalendar } from "@tabler/icons-react";
import dayjs from "dayjs";
import { useState } from "react";
import axios from "axios";
import { QRCode } from "qrcode";
import QRCodeComponent from "./QRCodeGen";
import { useAuth0 } from "@auth0/auth0-react";

interface FormValues {
  name: string;
  desc: string;
  scansLeft: number;
  infiniteScans: boolean;
  expiry: Date;
  neverExpires: boolean;
  link: string;
  user: string;
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
  const [QR, setQR] = useState<QRCode | null>();
  const [opened, { open, close }] = useDisclosure(false);
  const [match, setMatch] = useState<CheckURLResponse>({});
  const API_URL = "https://safebrowsing.googleapis.com/v4/threatMatches:find";
  const [loading, setLoading] = useState<boolean>(false);
  const { user } = useAuth0();
  const form = useForm<FormValues>({
    initialValues: {
      name: "",
      desc: "",
      scansLeft: 1,
      infiniteScans: false,
      expiry: new Date(),
      neverExpires: false,
      link: "",
      user: user?.sub || "",
    },

    validate: {
      name: (value) =>
        value.length < 1 ? "First name must have at least 1 letters" : null,
      scansLeft: isInRange({ min: 1 }, "At least 1 scan should be there"),
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
      try {
        setLoading(true);
        const res = await axios.post(
          import.meta.env.VITE_BACKEND_CREATE_QR,
          form.values,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        // const res = backend(form.values);
        // setQR(res);
        setQR(res.data.qrObject);
      } catch (err) {
        notifications.show({
          color: "red",
          title: "Error",
          message:
            "There was an error while generating the QR Code. Please try again later.",
        });
      } finally {
        setLoading(false);
      }
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
        <b>{match.matches && match.matches![0].threatType} </b>.
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
            disabled={form.values.infiniteScans}
            placeholder="How many times can this QR be scanned?"
            {...form.getInputProps("scansLeft")}
          />
          <Checkbox
            label="Infinite Scans"
            description="The QR can be scanned for any number of times"
            mt={"lg"}
            color="teal"
            {...form.getInputProps("infiniteScans")}
          />
          <DateInput
            withAsterisk
            label="Expiry Date"
            placeholder="When should the QR expire?"
            rightSection={dateIcon}
            mt={"lg"}
            color="teal"
            disabled={form.values.neverExpires}
            minDate={dayjs(new Date()).add(1, "day").toDate()}
            {...form.getInputProps("expiry")}
          />
          <Checkbox
            label="No Expiry?"
            description="The QR will not have an expiry date"
            mt={"lg"}
            color="teal"
            {...form.getInputProps("neverExpires")}
          />
          <TextInput
            withAsterisk
            label="Link"
            mt={"lg"}
            placeholder="What link should be converted to QR Code?"
            {...form.getInputProps("link")}
          />

          <Group mt="xl">
            <Button type="submit" color="teal" loading={loading}>
              Submit
            </Button>
          </Group>
        </form>
        {QR && (
          <QRCodeComponent
            size={250}
            qrcodeObject={QR}
            name={form.values.name}
          />
        )}
      </SimpleGrid>
    </>
  );
};

export default QForm;
