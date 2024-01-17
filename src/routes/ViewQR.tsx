import { useEffect, useState, useCallback } from "react";
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
  Loader,
  Image,
} from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import axios, { AxiosResponse } from "axios";
import { IconAdjustments } from "@tabler/icons-react";
import QRDetailCard from "../components/QRDetailCard";
import { QRCode } from "qrcode";
import { useAuth0 } from "@auth0/auth0-react";
import { QRContext } from "../components/QRContext";
import { notifications } from "@mantine/notifications";

type resp = {
  qrObject: { S: string };
  neverExpires: { BOOL: boolean };
  user: { S: string };
  scansLeft: { N: number };
  start: { S: string };
  expiry: { S: string };
  link: { S: string };
  id: { S: string };
  name: { S: string };
  desc: { S: string };
  infiniteScans: { BOOL: boolean };
  linkToQr: { S: string };
};

type ResponseData = {
  items: resp[];
};

type QRList = {
  qrObject: QRCode;
  neverExpires: boolean;
  user: string;
  scansLeft: number;
  start: Date;
  expiry: Date;
  link: string;
  id: string;
  name: string;
  desc: string;
  infiniteScans: boolean;
  linkToQr: string;
};

/**
 * Fetches QRs from the backend API based on the user logged in.
 * @param id - The ID of the data to fetch.
 * @returns A promise that resolves to the Axios response containing the fetched data.
 */
const fetchUrl = async (user: string): Promise<AxiosResponse<ResponseData>> => {
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
    start: new Date(item.start.S),
    expiry: new Date(item.expiry.S),
    link: item.link.S,
    id: item.id.S,
    name: item.name.S,
    desc: item.desc.S,
    infiniteScans: item.infiniteScans.BOOL,
    linkToQr: item.linkToQr.S,
  }));
};

const ViewQR = () => {
  const [data, setData] = useState<QRList[]>([]);
  const [isModalOpen, { open, close }] = useDisclosure(false);
  const matches = useMediaQuery("(min-width: 48em)");
  const [isLoading, setIsLoading] = useState(false);
  const [selected, setSelected] = useState<QRList | null>(null);
  const { user } = useAuth0();

  const refreshQRs = useCallback(async () => {
    try {
      setIsLoading(true); // Add this line
      const response = await fetchUrl(user?.sub || "");
      const processedData = processResponseData(response);
      setData(processedData);
      close();
    } catch (error) {
      notifications.show({
        title: "Error",
        message: "There was an error fetching your QR codes.",
        color: "red",
      });
    } finally {
      setIsLoading(false);
    }
  }, [user, close]); // Assuming fetchUrl and processResponseData don't change

  useEffect(() => {
    refreshQRs();
  }, [refreshQRs]);

  return (
    <>
      <QRContext.Provider value={{ refreshQRs }}>
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
            {isLoading ? (
              <Flex justify={"center"} align={"center"} mih={"100vh"}>
                <Loader size={50} color="teal" type="bars" />
              </Flex>
            ) : data.length === 0 ? (
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
              data.map((item) => (
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
              ))
            )}
          </Stack>
        </Shell>
      </QRContext.Provider>
    </>
  );
};

export default ViewQR;
