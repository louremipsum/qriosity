"use client";
import { Group, Button } from "@mantine/core";
import { useFormStatus } from "react-dom";
import { IconDeviceFloppy } from "@tabler/icons-react";
import { useAppSelector } from "@lib/hook";

export function SubmitButton() {
  const { pending } = useFormStatus();
  const qrCount = useAppSelector((state) => state.app.qrCount);
  const userRole = useAppSelector((state) => state.app.userRole);
  return (
    <Group mt="xl">
      <Button
        type="submit"
        color="teal"
        loading={pending}
        disabled={qrCount >= 5}
      >
        Submit
      </Button>
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
