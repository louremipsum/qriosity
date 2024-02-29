import { CopyButton, ActionIcon, Tooltip, rem, Text } from "@mantine/core";
import { IconCopy, IconCheck } from "@tabler/icons-react";
import classes from "@/styles/CopyItem.module.css";

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
            variant="outline"
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
    <div className={classes.copyDiv}>
      <Text c={"gray"} mr={"xs"}>
        {props.item}
      </Text>
      <Btn item={props.item} />
    </div>
  );
};

export default CopyItem;
