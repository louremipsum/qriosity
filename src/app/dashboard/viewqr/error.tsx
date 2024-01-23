"use client";
import { Button, Stack, Text, Image } from "@mantine/core";
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <Stack align="center">
      <Image src={"/NotFound.svg"} h={"40%"} w={"40%"} alt="Not Found" />
      <Text size={"xl"} fw={500} ta={"center"} mt={"xl"}>
        Hmm... something went wrong
      </Text>
      <Text size={"sm"} ta={"center"} c={"dimmed"}>
        There seems to be an error fetching your QRs{" "}
      </Text>
      <Button onClick={reset} variant={"outline"} color={"teal"}>
        Try Again
      </Button>
    </Stack>
  );
}
