// src/context/QRContext.tsx
"use client";
import React from "react";

interface QRContextType {
  numQRs: number;
  setNumQRs: React.Dispatch<React.SetStateAction<number>>;
  dataLoaded: boolean;
  setDataLoaded: React.Dispatch<React.SetStateAction<boolean>>;
}

export const QRContext = React.createContext<QRContextType | undefined>(
  undefined
);
