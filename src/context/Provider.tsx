"use client";
import React from "react";
import { QRContext } from "./Context";

export const QRProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [numQRs, setNumQRs] = React.useState<number | undefined>(0);
  const [dataLoaded, setDataLoaded] = React.useState<boolean>(false);

  return (
    <QRContext.Provider
      value={{ numQRs, setNumQRs, dataLoaded, setDataLoaded }}
    >
      {children}
    </QRContext.Provider>
  );
};
