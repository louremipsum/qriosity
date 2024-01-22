"use client";
import { Group, Button } from "@mantine/core";
import { useFormStatus } from "react-dom";
import { IconDeviceFloppy, IconTrash } from "@tabler/icons-react";

export function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Group mt="xl">
      <Button type="submit" color="teal" loading={pending}>
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
