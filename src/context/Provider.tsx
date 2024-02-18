"use client";
import React from "react";
import { QRContext } from "./Context";

export const QRProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [numQRs, setNumQRs] = React.useState(0);
  const [dataLoaded, setDataLoaded] = React.useState(false);

  return (
    <QRContext.Provider
      value={{ numQRs, setNumQRs, dataLoaded, setDataLoaded }}
    >
      {children}
    </QRContext.Provider>
  );
};
