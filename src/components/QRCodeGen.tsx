import React, { useEffect, useRef } from "react";
import { ActionIcon, Stack, Flex } from "@mantine/core";
import { IconCloudDownload } from "@tabler/icons-react";
import { QRCode } from "qrcode";

interface QRCodeComponentProps {
  qrcodeObject: QRCode | null;
  size: number;
  name: string;
}

const QRCodeComponent: React.FC<QRCodeComponentProps> = ({
  qrcodeObject,
  size,
  name,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const generateQR = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      const modulesSize = qrcodeObject!.modules.size;
      for (let i = 0; i < modulesSize; i++) {
        for (let j = 0; j < modulesSize; j++) {
          ctx.fillStyle = qrcodeObject!.modules.get(i, j) ? "#000" : "#fff";
          ctx.fillRect(
            (j * size) / modulesSize,
            (i * size) / modulesSize,
            size / modulesSize,
            size / modulesSize
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
      <Stack align="center">
        <Flex
          justify={"center"}
          align={"center"}
          mih={"200px"}
          style={{
            border: "1px dashed #00c7b0",
            borderRadius: "12px",
            width: "250px",
            height: "250px",
          }}
        >
          <canvas ref={canvasRef} width={size} height={size} />
        </Flex>
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
