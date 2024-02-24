// src/context/QRContext.tsx
"use client";
import React from "react";

export interface QRContextType {
  numQRs: number;
  setNumQRs: React.Dispatch<React.SetStateAction<number>>;
  dataLoaded: boolean;
  setDataLoaded: React.Dispatch<React.SetStateAction<boolean>>;
  role: string;
  setRole: React.Dispatch<React.SetStateAction<string>>;
}

export const QRContext = React.createContext<QRContextType | undefined>(
  undefined
);
