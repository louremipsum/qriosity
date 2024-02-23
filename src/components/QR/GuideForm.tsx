"use client";
import { formAction } from "@/app/action";
import { SubmitButton } from "@/components/common/SubmitButton";
import type { CheckURLResponse, FormValues } from "@/types/form";
import {
  BackgroundImage,
  Button,
  Checkbox,
  Flex,
  Group,
  Image,
  Modal,
  NumberInput,
  Stepper,
  Text,
  TextInput,
  rem,
  StepperProps,
  Container,
  Transition,
  Box,
} from "@mantine/core";
import { DateTimePicker } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { useDisclosure, useScrollIntoView } from "@mantine/hooks";
import { IconCalendar } from "@tabler/icons-react";
import dayjs from "dayjs";
import { QRCode } from "qrcode";
import { useState } from "react";
import QRCodeComponent from "./QRCodeGen";

function StyledStepper(props: StepperProps) {
  return (
    <Stepper
      styles={{
        stepBody: {
          display: "none",
        },
        stepIcon: {
          display: "none",
        },
        step: {
          display: "none",
        },
        separator: {
          display: "none",
        },
      }}
      {...props}
    />
  );
}

function GuideForm() {
  const [active, setActive] = useState(0);
  const dateIcon = <IconCalendar style={{ width: rem(16), height: rem(16) }} />;
  const [opened, { open, close }] = useDisclosure(false);
  const [match, setMatch] = useState<CheckURLResponse>({});
  const [linkToQR, setLinkToQR] = useState<string>("");
  const { scrollIntoView, targetRef } = useScrollIntoView<HTMLDivElement>();
  const [QR, setQR] = useState<QRCode | null>();
  const [transitionOpen, setTransitionOpen] = useState(true);
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

    validate: (values) => {
      if (active === 0) {
        return {
          name:
            values.name.trim().length < 1
              ? "Name must have at least 1 letters"
              : null && values.name.length > 50
              ? "Name must have at most 50 letters"
              : null,
        };
      }

      if (active === 1) {
        return {
          desc:
            values.desc.length > 100
              ? "Description must have at most 100 letters"
              : null,
        };
      }

      if (active === 2) {
        return {
          scansLeft:
            values.scansLeft < 1 ? "At least 1 scan should be there" : null,
        };
      }
      if (active === 4) {
        return {
          expiry:
            !values.neverExpires &&
            dayjs(values.expiry).isBefore(dayjs(values.start))
              ? "Expiry date and time cannot be before the start date and time"
              : null,
        };
      }
      if (active === 5) {
        return {
          link: values.link.trim().length < 1 ? "Link is required" : null,
        };
      }

      return {};
    },
  });

  const nextStep = () =>
    setActive((current) => {
      if (form.validate().hasErrors) {
        return current;
      }
      return current < 6 ? current + 1 : current;
    });

  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));

  const handleSubmit = async () => {
    if (form.validate().hasErrors) return;
    const response = await formAction(form.values);
    if (response.action === "URLNotSafe") {
      open();
      setMatch(response.matches!);
      return;
    } else if (response.action === "QRCreationFailed") {
      return;
    } else if (response.action === "QRCodeCreated") {
      // React Confettii
      setQR(response.qrObject);
      setLinkToQR(response.link!);
      scrollIntoView();
      return;
    }
  };

  return (
    <BackgroundImage src={"/guideBg.svg"}>
      <Flex
        mih={"100vh"}
        gap="md"
        justify="center"
        align="center"
        direction="row"
        wrap="wrap"
      >
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
        <form action={handleSubmit}>
          <Container size={"lg"}>
            <StyledStepper active={active} color="teal">
              <Transition
                mounted={transitionOpen}
                transition="fade"
                duration={400}
                timingFunction="ease"
              >
                {(styles) => (
                  <Box style={styles}>
                    <Stepper.Step label="Name" description="QR Name">
                      <Text fw={500} fz={"lg"} c={"white"}>
                        Lets Start with Naming our QR
                      </Text>
                      <Text>
                        Its actually for you to later recogize it and can be
                        changed later so don&apos;t worry too much about it and
                        name it anything
                      </Text>
                      <TextInput
                        withAsterisk
                        label="Name"
                        mt={"lg"}
                        placeholder="Qriosity..."
                        {...form.getInputProps("name")}
                      />
                    </Stepper.Step>
                  </Box>
                )}
              </Transition>
              <Stepper.Step label="Second step" description="Description">
                <Text>How would you like to describe</Text>
                <Text>
                  You can write here some description or context about the QR
                  for your reference
                </Text>
                <TextInput
                  label="Description"
                  mt={"lg"}
                  placeholder="What is the QR for?"
                  {...form.getInputProps("desc")}
                />
              </Stepper.Step>
              <Stepper.Step label="Third Step" description="Number of Scans">
                <Text>Number of times your QR can be scanned</Text>
                <Text>
                  You can set the number of the times your QR can be scanned
                  before which it becomes expired. There is an additional option
                  to set the QR to be scanned infinite times.
                </Text>
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
              </Stepper.Step>
              <Stepper.Step label="Fourth Step" description="Scheduling">
                <Text>Scheduling Date and Time</Text>
                <Text>At what time and date should the QR be active?</Text>
                <Text>
                  Although this is a paid feature but since we are meeting for
                  the first time so let&apos;s say it&apos;s on the house
                </Text>
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
              </Stepper.Step>
              <Stepper.Step label="Fifth step" description="Expiry">
                <Text>Expiry Date and Time</Text>
                <Text>
                  At what time and date should the QR expire? If you don&apos;t
                  want it to ever expire then you can click the checkmark for
                  never expires
                </Text>
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
              </Stepper.Step>
              <Stepper.Step label="Final step" description="Link">
                <Text>Link</Text>
                <Text>
                  What link should be converted to QR Code? This link would not
                  be visible to the user scanning the QR Code and will be used
                  to redirect the user to the link.
                </Text>
                <TextInput
                  withAsterisk
                  label="Link"
                  mt={"lg"}
                  placeholder="What link should be converted to QR Code?"
                  {...form.getInputProps("link")}
                />
              </Stepper.Step>
              <Stepper.Step label="Your QR" description="Generated QR">
                <Text>Here is your QR Code</Text>
                <Text>
                  You can download it and use it as you like. You can also share
                  it with your friends and family.
                </Text>
              </Stepper.Step>
              <Stepper.Completed>
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
              </Stepper.Completed>
            </StyledStepper>
          </Container>
          <Group justify="flex-end" mt="xl">
            {active !== 0 && (
              <Button variant="default" color="teal" onClick={prevStep}>
                Back
              </Button>
            )}
            {active !== 6 && (
              <Button color="teal" onClick={nextStep}>
                Next step
              </Button>
            )}
            {active === 6 && <SubmitButton />}
          </Group>
        </form>
      </Flex>
    </BackgroundImage>
  );
}

export default GuideForm;
