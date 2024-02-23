"use client";
import { formAction } from "@/app/action";
import { SubmitButton } from "@/components/common/SubmitButton";
import type { CheckURLResponse, FormValues } from "@/types/form";
import { useUser } from "@auth0/nextjs-auth0/client";
import {
  Box,
  Checkbox,
  Group,
  Image,
  Modal,
  NumberInput,
  SimpleGrid,
  Stack,
  Text,
  TextInput,
  rem,
} from "@mantine/core";
import { DateTimePicker } from "@mantine/dates";
import { hasLength, isInRange, isNotEmpty, useForm } from "@mantine/form";
import { useDisclosure, useScrollIntoView } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { IconCalendar, IconLock } from "@tabler/icons-react";
import dayjs from "dayjs";
import { QRCode } from "qrcode";
import { useState } from "react";
import QRCodeComponent from "./QRCodeGen";

const QForm = () => {
  const dateIcon = <IconCalendar style={{ width: rem(16), height: rem(16) }} />;
  const [QR, setQR] = useState<QRCode | null>();
  const [linkToQR, setLinkToQR] = useState<string>("");
  const [opened, { open, close }] = useDisclosure(false);
  const [match, setMatch] = useState<CheckURLResponse>({});
  const { scrollIntoView, targetRef } = useScrollIntoView<HTMLDivElement>();
  const { user } = useUser();
  const role = (user?.rolesArray as string[])[0];
  const form = useForm<FormValues>({
    name: "qr-form",
    initialValues: {
      name: "",
      desc: "",
      scansLeft: 1,
      infiniteScans: false,
      start: new Date(),
      expiry: new Date(),
      neverExpires: false,
      link: "",
      user: "",
    },

    validate: {
      name: (value) =>
        value.length < 1
          ? "Name must have at least 1 letters"
          : value.length > 50
          ? "Name must have at most 50 letters"
          : null,
      desc: hasLength(
        { max: 100 },
        "Description must have at most 100 letters"
      ),
      scansLeft: isInRange({ min: 1 }, "At least 1 scan should be there"),
      link: isNotEmpty("Link is required"),
      expiry: (value, values) =>
        !values.neverExpires && dayjs(value).isBefore(dayjs(values.start))
          ? "Expiry date and time cannot be before the start date and time"
          : null,
    },
  });

  const handleSubmit = async () => {
    if (form.validate().hasErrors) return;
    const response = await formAction(form.values);
    if (response.action === "URLNotSafe") {
      open();
      setMatch(response.matches!);
      return;
    } else if (response.action === "QRCreationFailed") {
      notifications.show({
        title: "Error",
        message: response.message,
        color: "red",
      });
      return;
    } else if (response.action === "QRCodeCreated") {
      notifications.show({
        title: "Success",
        message: "QR Code created successfully",
        color: "green",
      });
      setQR(response.qrObject);
      setLinkToQR(response.link!);
      scrollIntoView();
      return;
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
          src={"/warning.png"}
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
        fw={700}
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
      <SimpleGrid
        cols={{ base: 1, sm: 2 }}
        spacing="sm"
        verticalSpacing="xs"
        mt={"xl"}
      >
        <form action={handleSubmit}>
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
          {role === "Hobby" ? (
            <Box
              mt={"lg"}
              style={{
                border: "1px solid #C9C9C9",
                borderRadius: "12px",
                backgroundColor: "#F5F5F5",
                cursor: "not-allowed",
              }}
              p={"xs"}
            >
              <Stack>
                <Group justify="space-between">
                  <Text fw={500}>Available in Pro</Text>
                  <IconLock style={{ color: "#02acb0" }} />
                </Group>
                <DateTimePicker
                  withAsterisk
                  label="Start Date"
                  valueFormat="DD MMM YYYY hh:mm A"
                  placeholder="When should the QR start?"
                  rightSection={dateIcon}
                  color="teal"
                  disabled
                  minDate={new Date()}
                  {...form.getInputProps("start")}
                />
              </Stack>
            </Box>
          ) : (
            <DateTimePicker
              withAsterisk
              label="Start Date"
              valueFormat="DD MMM YYYY hh:mm A"
              placeholder="When should the QR start?"
              rightSection={dateIcon}
              mt={"lg"}
              color="teal"
              minDate={new Date()}
              {...form.getInputProps("start")}
            />
          )}
          <DateTimePicker
            withAsterisk
            label="Expiry Date"
            valueFormat="DD MMM YYYY hh:mm A"
            placeholder="When should the QR expire?"
            rightSection={dateIcon}
            mt={"lg"}
            color="teal"
            disabled={form.values.neverExpires}
            minDate={new Date()}
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
          <SubmitButton />
        </form>
        <div ref={targetRef}>
          {QR && (
            <QRCodeComponent
              size={250}
              qrcodeObject={QR}
              name={form.values.name}
              linkToQR={linkToQR}
            />
          )}
        </div>
      </SimpleGrid>
    </>
  );
};

export default QForm;
