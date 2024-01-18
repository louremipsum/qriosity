import { CopyButton, ActionIcon, Tooltip, rem, TextInput } from "@mantine/core";
import { IconCopy, IconCheck } from "@tabler/icons-react";

interface CopyItemProps {
  item: string;
}

const Btn = ({ item }: CopyItemProps) => {
  return (
    <CopyButton value={item} timeout={2000}>
      {({ copied, copy }) => (
        <Tooltip label={copied ? "Copied" : "Copy"} withArrow position="right">
          <ActionIcon
            color={copied ? "teal" : "gray"}
            variant="subtle"
            onClick={copy}
          >
            {copied ? (
              <IconCheck style={{ width: rem(16) }} />
            ) : (
              <IconCopy style={{ width: rem(16) }} />
            )}
          </ActionIcon>
        </Tooltip>
      )}
    </CopyButton>
  );
};

const CopyItem = (props: CopyItemProps) => {
  return (
    <TextInput
      disabled
      value={props.item}
      leftSection={<Btn item={props.item} />}
    />
  );
};

export default CopyItem;
