"use client";
import { viewQRAction } from "@/app/action";
import QRDetailCard from "@/components/QR/QRDetailCard";
import type {
  LastEvaluatedKeyType,
  QRList,
  extendedQRList,
} from "@/types/viewqr";
import {
  ActionIcon,
  Badge,
  Box,
  Card,
  Drawer,
  Flex,
  Group,
  Image,
  Modal,
  ScrollArea,
  SimpleGrid,
  Stack,
  Text,
} from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { IconAdjustments, IconPlus } from "@tabler/icons-react";
import Link from "next/link";
import { Dispatch, SetStateAction, useState } from "react";
import LoadMoreButton from "./LoadMoreButton";

export const dynamic = "force-dynamic";

type Props = {
  qrList: extendedQRList[];
  lastEvaluatedKey: LastEvaluatedKeyType;
};

type QRCardProps = {
  item: extendedQRList;
  setSelected: Dispatch<SetStateAction<QRList | null>>;
  open: () => void;
};

const QRCard = ({ item, setSelected, open }: QRCardProps) => {
  return (
    <Card
      shadow={"sm"}
      padding={"md"}
      radius={"lg"}
      withBorder
      key={item.id}
      mb={"md"}
    >
      <Stack justify="space-between" mb={"md"}>
        <Group justify="space-between" h={74}>
          <Box w={"70%"}>
            <Flex direction="column">
              <Text size={"sm"} fw={400} c={"dimmed"}>
                Name
              </Text>
              <Text size={"xl"} fw={500} truncate="end">
                {item.name}
              </Text>
              <Text size={"sm"} truncate="end">
                {item.desc}
              </Text>
            </Flex>
          </Box>
          <ActionIcon
            color="teal"
            onClick={() => {
              setSelected(item);
              open();
            }}
          >
            <IconAdjustments />
          </ActionIcon>
        </Group>
        <Badge
          color={
            item.status === "Active"
              ? "teal"
              : item.status === "Scheduled"
              ? "blue"
              : "red"
          }
          variant="light"
        >
          {item.status}
        </Badge>

        <Flex direction="column" mt={"md"}>
          <Group m={0} h={44}>
            <Text fw={500}>Expiry:</Text>
            {item.neverExpires ? (
              <span style={{ fontSize: "28px" }} aria-description="Infinite">
                ∞
              </span>
            ) : (
              item.expiry.toDateString()
            )}
          </Group>
          <Group m={0} h={44}>
            <Text fw={500}>Scans Left:</Text>

            {item.infiniteScans ? (
              <span style={{ fontSize: "28px" }} aria-description="Infinite">
                ∞
              </span>
            ) : (
              <span>{item.scansLeft}</span>
            )}
          </Group>
        </Flex>

        <Text size={"sm"} c={"dimmed"} fs="italic">
          Last Modified: {item.lastModified.toDateString()}
        </Text>
      </Stack>
    </Card>
  );
};

const ViewQR = ({ qrList, lastEvaluatedKey }: Props) => {
  const [isWindowOpen, { open, close }] = useDisclosure(false);
  const matches = useMediaQuery("(min-width: 49em)");
  const [selected, setSelected] = useState<QRList | null>(null);
  const [QRList, setQRList] = useState<extendedQRList[]>(qrList);
  const [lastEvalKey, setLastEvalKey] =
    useState<LastEvaluatedKeyType>(lastEvaluatedKey);
  const [moreQRs, setMoreQRs] = useState(() => !!lastEvaluatedKey);
  const [loading, setLoading] = useState(false);
  const matchBigScreen = useMediaQuery("(min-width: 90em)");

  const getData = async () => {
    setLoading(true);
    const data = await viewQRAction(lastEvalKey);
    setQRList((prev) => [...prev, ...data.processedData]);
    if (data.lastEvaluatedKey) {
      setMoreQRs(true);
      setLastEvalKey(data.lastEvaluatedKey);
    } else {
      setMoreQRs(false);
    }
    setLoading(false);
    return;
  };

  return (
    <>
      {matchBigScreen ? (
        <Drawer
          opened={isWindowOpen}
          onClose={close}
          title="Details"
          scrollAreaComponent={ScrollArea.Autosize}
          position="right"
          size="60%"
        >
          {selected && <QRDetailCard {...selected} closeModal={close} />}
        </Drawer>
      ) : (
        <Modal
          opened={isWindowOpen}
          onClose={close}
          title="QR Details"
          centered
          size="70%"
          fullScreen={!matches}
          scrollAreaComponent={ScrollArea.Autosize}
          overlayProps={{
            backgroundOpacity: 0.55,
            blur: 3,
          }}
        >
          {selected && <QRDetailCard {...selected} closeModal={close} />}
        </Modal>
      )}

      <Stack mt={"md"}>
        <Group justify="space-between" mb={"xl"}>
          <Text size={"3rem"} fw={700} ta={"left"} mb={"xl"} c={"teal"}>
            View QR
          </Text>
          <Link href="/dashboard/createqr">
            <ActionIcon
              color="teal"
              variant="filled"
              size={"xl"}
              mr={"sm"}
              radius={"md"}
            >
              <IconPlus />
            </ActionIcon>
          </Link>
        </Group>

        {QRList.length === 0 ? (
          <Stack align="center">
            <Image src={"/NotFound.svg"} h={"40%"} w={"40%"} alt="Not Found" />
            <Text size={"xl"} fw={500} ta={"center"} mt={"xl"}>
              You currently have no QRs
            </Text>
            <Text size={"sm"} ta={"center"} c={"dimmed"}>
              Start by creating one!
            </Text>
            <Text>
              If you feel like even though you have QRs and they are not
              displayed here, contact{" "}
              <Link href={"/support"} style={{ color: "teal" }}>
                support
              </Link>
            </Text>
          </Stack>
        ) : (
          <SimpleGrid
            cols={{ base: 1, sm: 2, md: 2, lg: 4, xl: 4, xxl: 6 }}
            spacing={{ base: 10, sm: "xl" }}
            verticalSpacing={{ base: "md", sm: "xl" }}
          >
            {QRList.map((item, index) => (
              <QRCard
                item={item}
                setSelected={setSelected}
                open={open}
                key={index}
              />
            ))}
          </SimpleGrid>
        )}
        {moreQRs && (
          <LoadMoreButton
            onClick={() => getData()}
            moreQR={moreQRs}
            loading={loading}
          />
        )}
      </Stack>
    </>
  );
};

export default ViewQR;
