import { Card, Text } from "@mantine/core";
import QRCodeComponent from "./QRCodeGen";
import type { QRDetail } from "@/types/viewqr";
import UpdateQRForm from "@/components/QR/UpdateQRForm";

interface QRDetailCardProps extends QRDetail {
  closeModal: () => void;
}

const QRDetailCard = (props: QRDetailCardProps) => {
  return (
    <>
      <Card withBorder padding="xl" radius="md">
        <div>
          {props.qrObject && (
            <QRCodeComponent
              size={150}
              qrcodeObject={props.qrObject}
              name={props.name}
              linkToQR={props.linkToQr}
            />
          )}
        </div>
        <Text ta="center" fz="lg" fw={500} mt="sm">
          {props.name}
        </Text>
        <UpdateQRForm {...props} closeModal={props.closeModal} />
      </Card>
    </>
  );
};

export default QRDetailCard;
