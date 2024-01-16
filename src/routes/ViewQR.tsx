import { useEffect, useState } from "react";
import Shell from "../components/Shell";
import {
  ActionIcon,
  Card,
  Flex,
  Group,
  Stack,
  Text,
  Modal,
  ScrollArea,
} from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import axios, { AxiosResponse } from "axios";
import { IconAdjustments } from "@tabler/icons-react";
import QRDetailCard from "../components/QRDetailCard";
import { QRCode } from "qrcode";
import { useAuth0 } from "@auth0/auth0-react";

type resp = {
  qrObject: { S: string };
  neverExpires: { BOOL: boolean };
  user: { S: string };
  scansLeft: { N: number };
  expiry: { S: string };
  link: { S: string };
  id: { S: string };
  name: { S: string };
  desc: { S: string };
  infiniteScans: { BOOL: boolean };
};

type ResponseData = {
  items: resp[];
};

type QRList = {
  qrObject: QRCode;
  neverExpires: boolean;
  user: string;
  scansLeft: number;
  expiry: Date;
  link: string;
  id: string;
  name: string;
  desc: string;
  infiniteScans: boolean;
};

/**
 * Fetches QRs from the backend API based on the user logged in.
 * @param id - The ID of the data to fetch.
 * @returns A promise that resolves to the Axios response containing the fetched data.
 */
const fetchUrl = async (user: string): Promise<AxiosResponse<ResponseData>> => {
  console.log("called");
  return axios.get(`${import.meta.env.VITE_BACKEND_VIEW_QRS}`, {
    params: {
      user_id: user,
    },
  });
};

const processResponseData = (
  response: AxiosResponse<ResponseData>
): QRList[] => {
  return response.data.items.map((item) => ({
    qrObject: JSON.parse(item.qrObject.S),
    neverExpires: item.neverExpires.BOOL,
    user: item.user.S,
    scansLeft: Number(item.scansLeft.N),
    expiry: new Date(item.expiry.S),
    link: item.link.S,
    id: item.id.S,
    name: item.name.S,
    desc: item.desc.S,
    infiniteScans: item.infiniteScans.BOOL,
  }));
};

const ViewQR = () => {
  const [data, setData] = useState<QRList[]>([]);
  const [isModalOpen, { open, close }] = useDisclosure(false);
  const matches = useMediaQuery("(min-width: 48em)");
  const [selected, setSelected] = useState<QRList | null>(null);
  const { user } = useAuth0();
  useEffect(() => {
    const handleqr = async (): Promise<void> => {
      const response = await fetchUrl(user?.sub || "");
      console.log(response);
      const processedData = processResponseData(response);
      console.log("proce-> ", processedData);
      setData(processedData);
      // setData(dataOBJ);
    };
    handleqr();
  }, [user]);

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
        {selected && <QRDetailCard {...selected} />}
      </Modal>
      <Shell>
        <Stack mt={"md"}>
          <Text
            size={"3rem"}
            fw={900}
            variant="gradient"
            ta={"left"}
            mb={"xl"}
            gradient={{
              from: "rgba(0, 153, 224, 1)",
              to: "rgba(0, 255, 94, 1)",
              deg: 174,
            }}
          >
            View Qr
          </Text>
          {data.map((item) => (
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
            </Card>
          ))}
        </Stack>
      </Shell>
    </>
  );
};

export default ViewQR;
