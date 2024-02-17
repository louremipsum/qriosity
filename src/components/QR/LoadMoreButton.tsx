import { Button, Stack } from "@mantine/core";

const LoadMoreButton = ({
  onClick,
  moreQR,
  loading,
}: {
  onClick: any;
  moreQR: boolean;
  loading: boolean;
}) => {
  return (
    <Stack w={"100%"} align="center">
      <Button
        onClick={onClick}
        variant="light"
        color="teal"
        aria-disabled={!moreQR}
        disabled={!moreQR}
        w={"30%"}
        loading={loading}
        loaderProps={{ type: "bars" }}
        radius={"xl"}
      >
        {moreQR ? "Load More" : "No More QRs to Load"}
      </Button>
    </Stack>
  );
};

export default LoadMoreButton;
