import {
  Text,
  Group,
  Button,
  SimpleGrid,
  TextInput,
  NumberInput,
  Checkbox,
  rem,
  Modal,
  Stack,
  Image,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  useForm,
  isInRange,
  isNotEmpty,
  UseFormReturnType,
} from "@mantine/form";
import { IconTrash } from "@tabler/icons-react";
import { DateTimePicker } from "@mantine/dates";
import { IconCalendar } from "@tabler/icons-react";
import dayjs from "dayjs";
import { notifications } from "@mantine/notifications";
import type { QRDetail } from "@/types/viewqr";
import { formDeleteAction, formUpdateAction } from "@/app/action";
import { SaveButton } from "../common/SubmitButton";
import { useState } from "react";

const calcDirtyFields = (form: UseFormReturnType<QRDetail>) => {
  const currentValues = form.values;

  // Determine which fields have been modified
  const dirtyFields: Partial<QRDetail> = {};

  if (form.isDirty("qrObject")) dirtyFields.qrObject = currentValues.qrObject;
  if (form.isDirty("neverExpires"))
    dirtyFields.neverExpires = currentValues.neverExpires;
  if (form.isDirty("user")) dirtyFields.user = currentValues.user;
  if (form.isDirty("scansLeft"))
    dirtyFields.scansLeft = currentValues.scansLeft;
  if (form.isDirty("start")) dirtyFields.start = currentValues.start;
  if (form.isDirty("expiry")) dirtyFields.expiry = currentValues.expiry;
  if (form.isDirty("link")) dirtyFields.link = currentValues.link;
  if (form.isDirty("id")) dirtyFields.id = currentValues.id;
  if (form.isDirty("name")) dirtyFields.name = currentValues.name;
  if (form.isDirty("desc")) dirtyFields.desc = currentValues.desc;
  if (form.isDirty("infiniteScans"))
    dirtyFields.infiniteScans = currentValues.infiniteScans;
  dirtyFields.id = currentValues.id;

  return dirtyFields;
};

const handleDelete = async (
  id: string,
  closeModal: () => void,
  setIsDeleting: (state: boolean) => void
) => {
  setIsDeleting(true);
  const response = await formDeleteAction(id);
  if (response.action === "QRDeletionFailed") {
    notifications.show({
      color: "red",
      title: "Error",
      message: response.message,
    });
  } else if (response.action === "QRCodeDeleted") {
    notifications.show({
      color: "teal",
      title: "Success",
      message: response.message,
    });
    setIsDeleting(false);
    closeModal();
  }
};

interface DeleteModalProps {
  opened: boolean;
  close: () => void;
  handleDelete: (
    id: string,
    closeModal: () => void,
    setIsDeleting: (state: boolean) => void
  ) => void;
  form: UseFormReturnType<QRDetail>;
  props: QRDetailCardProps;
}

const DeleteModal: React.FC<DeleteModalProps> = ({
  opened,
  close,
  handleDelete,
  form,
  props,
}) => {
  const [isDeleting, setIsDeleting] = useState(false);
  return (
    <Modal opened={opened} onClose={close} title="Confirm Delete" centered>
      <Stack m={"md"}>
        <Image src="/delete.svg" width={200} height={200} />
        <Text fw={"500"} mt={"xl"} ta={"center"}>
          Are you sure you want to delete this QR code?
        </Text>
        <Group justify="space-around">
          <Button
            variant="filled"
            color="red"
            style={{ width: "40%" }}
            type="submit"
            loading={isDeleting}
            onClick={() =>
              handleDelete(form.values.id, props.closeModal, setIsDeleting)
            }
          >
            Delete
          </Button>
          <Button
            onClick={() => close()}
            color="teal"
            variant="subtle"
            style={{ width: "40%" }}
          >
            Cancel
          </Button>
        </Group>
      </Stack>
    </Modal>
  );
};

interface QRFormProps {
  form: UseFormReturnType<QRDetail>;
  handleSave: () => Promise<void>;
  open: () => void;
}

const QRForm: React.FC<QRFormProps> = ({ form, handleSave, open }) => (
  <form action={handleSave}>
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
        checked={form.values.infiniteScans}
        {...form.getInputProps("infiniteScans")}
      />
      <DateTimePicker
        withAsterisk
        label="Start Date"
        valueFormat="DD MMM YYYY hh:mm A"
        placeholder="When should the QR start?"
        rightSection={
          <IconCalendar style={{ width: rem(16), height: rem(16) }} />
        }
        mt={"lg"}
        color="teal"
        minDate={new Date()}
        {...form.getInputProps("start")}
      />
      <DateTimePicker
        withAsterisk
        label="Expiry Date"
        valueFormat="DD MMM YYYY hh:mm A"
        placeholder="When should the QR expire?"
        rightSection={
          <IconCalendar style={{ width: rem(16), height: rem(16) }} />
        }
        mt={"lg"}
        color="teal"
        disabled={form.values.neverExpires}
        minDate={new Date()}
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
      <SaveButton isDirty={form.isDirty} />
      <Button
        radius="md"
        mt="xl"
        color="red"
        size="md"
        w={"40%"}
        variant="outline"
        leftSection={<IconTrash />}
        onClick={() => open()}
      >
        Delete
      </Button>
    </Group>
  </form>
);

interface QRDetailCardProps extends QRDetail {
  closeModal: () => void;
}

const UpdateQRForm = (props: QRDetailCardProps) => {
  const [opened, { open, close }] = useDisclosure(false);
  const form = useForm<QRDetail>({
    initialValues: {
      id: props.id,
      name: props.name,
      desc: props.desc,
      scansLeft: props.scansLeft,
      infiniteScans: props.infiniteScans,
      start: new Date(props.start),
      expiry: new Date(props.expiry),
      neverExpires: props.neverExpires,
      link: props.link,
      user: props.user,
      linkToQr: props.linkToQr,
    },

    validate: {
      name: (value: string) =>
        value.length < 1 ? "First name must have at least 1 letters" : null,
      scansLeft: isInRange({ min: 1 }, "At least 1 scan should be there"),
      link: isNotEmpty("Link is required"),
      expiry: (value, values) =>
        !values.neverExpires &&
        dayjs(value.valueOf()).isBefore(dayjs(values.start).valueOf())
          ? "Expiry date and time cannot be before the start date and time"
          : null,
    },
  });

  const handleSave = async () => {
    if (form.validate().hasErrors) return;
    const dirtyValues = calcDirtyFields(form);

    const response = await formUpdateAction(dirtyValues);
    if (response.action === "QRUpdateFailed") {
      notifications.show({
        color: "red",
        title: "Error",
        message: response.message,
      });
    } else if (response.action === "QRCodeUpdated") {
      notifications.show({
        color: "teal",
        title: "Success",
        message: response.message,
      });
      props.closeModal();
    }
  };
  return (
    <>
      <DeleteModal
        opened={opened}
        close={close}
        handleDelete={handleDelete}
        form={form}
        props={props}
      />
      <QRForm form={form} handleSave={handleSave} open={open} />
    </>
  );
};

export default UpdateQRForm;
