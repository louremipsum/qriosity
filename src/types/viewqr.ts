import { QRCode } from "qrcode";

export type QRList = {
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

export type resp = {
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

export type QRDetail = {
  qrObject?: QRCode;
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
