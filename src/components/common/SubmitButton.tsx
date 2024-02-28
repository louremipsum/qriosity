"use client";
import { getQRCount } from "@/app/action";
import { QRContext, QRContextType } from "@/context/Context";
import { useUser } from "@auth0/nextjs-auth0/client";
import { Button, Group, Stack, Text } from "@mantine/core";
import {
  IconDeviceFloppy,
  IconInfoCircleFilled,
  IconSend,
} from "@tabler/icons-react";
import { useContext, useEffect, useRef } from "react";
import { useFormStatus } from "react-dom";

export function SubmitButton() {
  const { pending } = useFormStatus();
  const { user } = useUser();
  const context = useContext(QRContext);
  const { setNumQRs, setDataLoaded } = context as QRContextType;
  const qrCount = context?.numQRs;
  const isHobbyUser = (user?.rolesArray as string[])[0] === "Hobby";
  const isQRCountLimitReached = qrCount! >= 2;
  const isDataLoaded = context?.dataLoaded;

  const isLoading = useRef(false);

  useEffect(() => {
    const fetchData = async () => {
      if (!isLoading.current) {
        isLoading.current = true;
        setDataLoaded(false);
        const data = await getQRCount();

        if (data) {
          setNumQRs(data.num);
          setDataLoaded(true);
        }
        isLoading.current = false;
      }
    };

    fetchData();
  }, [setNumQRs, setDataLoaded]);

  return (
    <Group mt="xl">
      {isDataLoaded ? (
        isHobbyUser && isQRCountLimitReached ? (
          <>
            <Stack mt={"md"}>
              <Group>
                <IconInfoCircleFilled stroke={1} style={{ color: "#02acb0" }} />
                <Text c="gray" size="sm">
                  You can only create up to 2 QR codes
                </Text>
              </Group>
              <Button type="button" color="teal" disabled>
                Limit Reached
              </Button>
            </Stack>
          </>
        ) : (
          <Button type="submit" color="teal" loading={pending}>
            Submit
          </Button>
        )
      ) : (
        <Button color="teal" loading></Button>
      )}
    </Group>
  );
}

type SaveButtonProps = {
  isDirty: () => boolean;
};

export function SaveButton({ isDirty }: SaveButtonProps) {
  const { pending } = useFormStatus();
  return (
    <Button
      radius="md"
      color="teal"
      mt="xl"
      w={"40%"}
      size="md"
      variant="filled"
      type="submit"
      disabled={!isDirty()}
      loading={pending}
      leftSection={<IconDeviceFloppy />}
    >
      Save
    </Button>
  );
}

export function ContactUsButton() {
  const { pending } = useFormStatus();
  return (
    <Button
      color="teal"
      rightSection={<IconSend />}
      radius={"md"}
      mt={"xl"}
      size="md"
      loading={pending}
      type="submit"
    >
      Send message
    </Button>
  );
}
