"use client";
import { Dispatch, SetStateAction, useState } from "react";
import Shell from "@/components/common/Shell";
import {
  ActionIcon,
  Card,
  Flex,
  Group,
  Stack,
  Text,
  Modal,
  ScrollArea,
  Image,
  Badge,
} from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { IconAdjustments, IconPlus } from "@tabler/icons-react";
import QRDetailCard from "@/components/QR/QRDetailCard";
import type { QRList, extendedQRList } from "@/types/viewqr";
import Link from "next/link";

type Props = {
  qrList: extendedQRList[];
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
      <Group justify="space-between" mb={"md"}>
        <Flex direction="column">
          <Text size={"sm"} fw={400} c={"dimmed"}>
            Name
          </Text>
          <Text size={"xl"} fw={500}>
            {item.name}
          </Text>
          <Text size={"sm"}>{item.desc}</Text>
        </Flex>
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
    </Card>
  );
};

const ViewQR = ({ qrList }: Props) => {
  const [isModalOpen, { open, close }] = useDisclosure(false);
  const matches = useMediaQuery("(min-width: 48em)");
  const [selected, setSelected] = useState<QRList | null>(null);

  return (
    <>
      <Modal
        opened={isModalOpen}
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
      <Shell>
        <Stack mt={"md"}>
          <Group justify="space-between" mb={"xl"}>
            <Text
              size={"3rem"}
              fw={900}
              variant="gradient"
              ta={"left"}
              gradient={{
                from: "rgba(0, 153, 224, 1)",
                to: "rgba(0, 255, 94, 1)",
                deg: 174,
              }}
            >
              View Qr
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
          {qrList.length === 0 ? (
            <Stack align="center">
              <Image
                src={"/NotFound.svg"}
                h={"40%"}
                w={"40%"}
                alt="Not Found"
              />
              <Text size={"xl"} fw={500} ta={"center"} mt={"xl"}>
                You currently have no QRs
              </Text>
              <Text size={"sm"} ta={"center"} c={"dimmed"}>
                Start by creating one!
              </Text>
            </Stack>
          ) : (
            qrList.map((item, index) => (
              <QRCard
                item={item}
                setSelected={setSelected}
                open={open}
                key={index}
              />
            ))
          )}
        </Stack>
      </Shell>
    </>
  );
};

export default ViewQR;
