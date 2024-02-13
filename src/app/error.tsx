"use client"; // Error components must be Client Components

import { useEffect } from "react";
import { Button, Title, Stack } from "@mantine/core";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
  }, [error]);

  return (
    <>
      <Stack justify="center" align="center">
        <Title order={1}>Something went wrong!</Title>
        <Button
          color="teal"
          variant="filled"
          onClick={
            // Attempt to recover by trying to re-render the segment
            () => reset()
          }
        >
          Try again
        </Button>
      </Stack>
    </>
  );
}
