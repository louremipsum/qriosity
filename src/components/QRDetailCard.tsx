import {
  Card,
  Text,
  Group,
  Button,
  SimpleGrid,
  TextInput,
  NumberInput,
  Checkbox,
  rem,
} from "@mantine/core";
import { useState } from "react";
import {
  useForm,
  isInRange,
  isNotEmpty,
  UseFormReturnType,
} from "@mantine/form";
import { IconDeviceFloppy, IconTrash } from "@tabler/icons-react";
import { QRCode } from "qrcode";
import { DateInput } from "@mantine/dates";
import { IconCalendar } from "@tabler/icons-react";
import QRCodeComponent from "./QRCodeGen";
import dayjs from "dayjs";
import axios from "axios";
import { notifications } from "@mantine/notifications";

type QRDetail = {
  qrObject?: QRCode;
  neverExpires: boolean;
  user: string;
  scansLeft: number;
  expiry: Date;
  link: string;
  id: string;
  name: string;
  desc: string;
  infiniteScans: boolean;
};

const handleSubmit = async (
  event: React.FormEvent<HTMLFormElement>,
  form: UseFormReturnType<QRDetail>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  event.preventDefault();

  // Get the current form values
  const currentValues = form.values;

  // Determine which fields have been modified
  const dirtyFields = Object.keys(currentValues).reduce<Partial<QRDetail>>(
    (acc, key) => {
      const fieldKey = key as keyof QRDetail;
      if (form.isDirty(fieldKey)) {
        // acc[fieldKey] = currentValues[fieldKey];
        acc[fieldKey] = currentValues[fieldKey];
      }
      return acc;
    },
    {} as Partial<QRDetail>
  );

  // If any fields have been modified, send them to the API
  if (Object.keys(dirtyFields).length > 0) {
    try {
      setLoading(true);
      const res = await axios.patch(
        import.meta.env.VITE_BACKEND_UPDATE_QRS,
        dirtyFields,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (res.status !== 200) throw new Error("Error while saving QR Code");
      notifications.show({
        color: "teal",
        title: "Success",
        message: "QR Code saved successfully!",
      });
    } catch (error) {
      notifications.show({
        color: "red",
        title: "Error",
        message: (error as Error).message,
      });
    } finally {
      setLoading(false);
    }
  }
};

const QRDetailCard = (props: QRDetail) => {
  const dateIcon = <IconCalendar style={{ width: rem(16), height: rem(16) }} />;
  const [loading, setLoading] = useState<boolean>(false);
  const form = useForm<QRDetail>({
    initialValues: {
      id: props.id,
      name: props.name,
      desc: props.desc,
      scansLeft: props.scansLeft,
      infiniteScans: props.infiniteScans,
      expiry: new Date(props.expiry),
      neverExpires: props.neverExpires,
      link: props.link,
      user: props.user,
    },

    validate: {
      name: (value: string) =>
        value.length < 1 ? "First name must have at least 1 letters" : null,
      scansLeft: isInRange({ min: 1 }, "At least 1 scan should be there"),
      link: isNotEmpty("Link is required"),
    },
  });

  return (
    <Card withBorder padding="xl" radius="md">
      <div>
        {props.qrObject && (
          <QRCodeComponent
            size={150}
            qrcodeObject={props.qrObject}
            name={props.name}
          />
        )}
      </div>
      <Text ta="center" fz="lg" fw={500} mt="sm">
        {props.name}
      </Text>
      <form onSubmit={(e) => handleSubmit(e, form, setLoading)}>
        <SimpleGrid
          cols={{ base: 1, sm: 2 }}
          spacing="xl"
          verticalSpacing="sm"
          mt={"xl"}
        >
          <TextInput
            withAsterisk
            label="Name"
            placeholder="Qriosity..."
            {...form.getInputProps("name")}
          />
          <TextInput
            label="Description"
            placeholder="What is the QR for?"
            {...form.getInputProps("desc")}
          />
          <NumberInput
            withAsterisk
            label="Valid Scans"
            min={1}
            placeholder="How many times can this QR be scanned?"
            {...form.getInputProps("scansLeft")}
          />
          <Checkbox
            label="Infinite Scans"
            description="The QR can be scanned for any number of times"
            mt={"xl"}
            color="teal"
            {...form.getInputProps("infiniteScans")}
          />
          <DateInput
            withAsterisk
            label="Expiry Date"
            placeholder="When should the QR expire?"
            rightSection={dateIcon}
            color="teal"
            disabled={form.values.neverExpires}
            minDate={dayjs(new Date()).add(1, "day").toDate()}
            {...form.getInputProps("expiry")}
          />
          <Checkbox
            label="No Expiry?"
            description="The QR will not have an expiry date"
            mt={"xl"}
            color="teal"
            checked={form.values.neverExpires}
            {...form.getInputProps("neverExpires")}
          />
          <TextInput
            withAsterisk
            label="Link"
            placeholder="What link should be converted to QR Code?"
            {...form.getInputProps("link")}
          />
        </SimpleGrid>
        <Group justify="space-between">
          <Button
            radius="md"
            color="teal"
            mt="xl"
            w={"40%"}
            size="md"
            variant="filled"
            type="submit"
            disabled={!form.isDirty()}
            loading={loading}
            leftSection={<IconDeviceFloppy />}
          >
            Save
          </Button>
          <Button
            radius="md"
            mt="md"
            color="red"
            size="md"
            w={"40%"}
            variant="outline"
            leftSection={<IconTrash />}
          >
            Delete
          </Button>
        </Group>
      </form>
    </Card>
  );
};

export default QRDetailCard;
