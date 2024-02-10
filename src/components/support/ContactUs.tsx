import { ContactUsButton } from "@/components/common/SubmitButton";
import {
  BackgroundImage,
  SimpleGrid,
  Text,
  TextInput,
  Textarea,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import classes from "@styles/ContactUs.module.css";
import { ContactIconsList } from "./ContactIconsList";

type ContactForm = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export function ContactUs() {
  const form = useForm<ContactForm>({
    initialValues: {
      name: "",
      email: "",
      message: "",
      subject: "",
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      subject: (value) => (value.trim() ? null : "Subject is required"),
      message: (value) => (value.trim() ? null : "Message is required"),
    },
  });

  const handleSubmit = async () => {
    if (form.validate().hasErrors) return;
    try {
      const resp = await fetch("/api/send", {
        method: "POST",
        body: JSON.stringify(form.values),
      }).then((res) => res.json());
      if (resp.data) {
        form.reset();
        notifications.show({
          title: "Email sent",
          message: "We will get back to you within 24 hours",
          color: "teal",
        });
      }
      if (resp.error) {
        notifications.show({
          title: "Email failed",
          message: "Failed to send email, please try again later",
          color: "red",
        });
      }
    } catch (error) {
      console.error(error);
      notifications.show({
        title: "Email failed",
        message: "Failed to send email, please try again later",
        color: "red",
      });
    }
  };
  return (
    <BackgroundImage className={classes.wrapper} src={"/contactBg.svg"}>
      <SimpleGrid cols={{ base: 1, sm: 2 }} spacing={50}>
        <div>
          <Title className={classes.title}>Contact Us</Title>
          <Text className={classes.description} mt="sm" mb={30}>
            Email or complete the form for any support and we will get back to
            you within 24 hours
          </Text>

          <ContactIconsList />
        </div>
        <form className={classes.form} action={handleSubmit}>
          <Text className={classes.formTitle}>Get in Touch</Text>

          <TextInput
            label="Name"
            placeholder="John Doe"
            mb="md"
            {...form.getInputProps("name")}
          />
          <TextInput
            withAsterisk
            aria-required
            label="Email"
            placeholder="your@email.com"
            mb="md"
            {...form.getInputProps("email")}
          />
          <TextInput
            withAsterisk
            aria-required
            label="Subject"
            placeholder="Subject"
            mb="md"
            {...form.getInputProps("subject")}
          />
          <Textarea
            withAsterisk
            aria-required
            label="Your message"
            placeholder="Your message here..."
            minRows={4}
            mb="lg"
            {...form.getInputProps("message")}
          />
          <Text className={classes.terms} c={"dimmed"}>
            By Contacting us, you agree to our{" "}
            <a href="/terms-of-service" style={{ color: "#028378" }}>
              <b>Terms of Service</b>
            </a>{" "}
            and{" "}
            <a href="/privacy" style={{ color: "#028378" }}>
              <b>Privacy Policy</b>
            </a>
          </Text>
          <ContactUsButton />
        </form>
      </SimpleGrid>
    </BackgroundImage>
  );
}
