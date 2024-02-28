"use client";
import React from "react";

export interface QRContextType {
  numQRs: number | undefined;
  setNumQRs: React.Dispatch<React.SetStateAction<number | undefined>>;
  dataLoaded: boolean;
  setDataLoaded: React.Dispatch<React.SetStateAction<boolean>>;
}

export const QRContext = React.createContext<QRContextType | undefined>(
  undefined
);
