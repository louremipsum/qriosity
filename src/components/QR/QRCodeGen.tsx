import React, { useEffect, useRef } from "react";
import { ActionIcon, Stack, Flex } from "@mantine/core";
import { IconCloudDownload } from "@tabler/icons-react";
import { BitMatrix, QRCode } from "qrcode";
import CopyItem from "@/utils/CopyItem";

interface QRCodeComponentProps {
  qrcodeObject: QRCode | null;
  size: number;
  name: string;
  linkToQR: string;
}

const helper = (module: BitMatrix, i: number, j: number) => {
  const size = module.size;
  const data = Uint8Array.from(Object.values(module.data));
  return data[i * size + j];
};

const QRCodeComponent: React.FC<QRCodeComponentProps> = ({
  qrcodeObject,
  size,
  name,
  linkToQR,
}) => {
  const fSize = size - 100;
  const sSize = size + 100;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const generateQR = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      const modulesSize = qrcodeObject!.modules.size;
      const quietZone = 10; // size of quiet zone
      const qrSize = size - 2 * quietZone; // size of QR code, excluding quiet zone

      // Clear the canvas and fill with white color for quiet zone
      ctx.clearRect(0, 0, size, size);
      ctx.fillStyle = "#fff";
      ctx.fillRect(0, 0, size, size);

      for (let i = 0; i < modulesSize; i++) {
        for (let j = 0; j < modulesSize; j++) {
          ctx.fillStyle = helper(qrcodeObject!.modules, i, j) ? "#000" : "#fff";
          ctx.fillRect(
            quietZone + (j * qrSize) / modulesSize,
            quietZone + (i * qrSize) / modulesSize,
            qrSize / modulesSize,
            qrSize / modulesSize
          );
        }
      }
    };

    generateQR();
  }, [qrcodeObject, size, canvasRef]);

  const downloadQR = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dataUrl = canvas.toDataURL(`${name}/png`);
    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = `${name}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <Stack align="center" mt={"lg"}>
        <Flex
          justify={"center"}
          align={"center"}
          p={"sm"}
          mih={`"${fSize}px"`}
          style={{
            border: "1px dashed #00c7b0",
            borderRadius: "12px",
            width: `"${sSize}px"`,
            height: `"${sSize}px"`,
          }}
        >
          <canvas ref={canvasRef} width={size} height={size} />
        </Flex>
        <CopyItem item={linkToQR} />
        <ActionIcon
          variant="filled"
          size="lg"
          aria-label="Download"
          color="teal"
          onClick={downloadQR}
        >
          <IconCloudDownload
            style={{ width: "70%", height: "70%" }}
            stroke={1.5}
          />
        </ActionIcon>
      </Stack>
    </>
  );
};

export default QRCodeComponent;
