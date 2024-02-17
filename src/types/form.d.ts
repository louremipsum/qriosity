import { QRCode } from "qrcode";

export interface FormValues {
  name: string;
  desc: string;
  scansLeft: number;
  infiniteScans: boolean;
  start: Date;
  expiry: Date;
  neverExpires: boolean;
  link: string;
  user: string;
}

export interface CheckURLResponse {
  matches?: {
    threatType: string;
    platformType: string;
    threat: {
      url: string;
    };
    cacheDuration: string;
    threatEntryType: string;
  }[];
}
type Action =
  | "URLNotSafe"
  | "URLSafe"
  | "QRCodeCreated"
  | "QRCreationFailed"
  | "QRDeletionFailed"
  | "QRCodeDeleted"
  | "QRCodeUpdated"
  | "QRUpdateFailed"
  | "QRLinkFound";

export interface ActionResponse {
  action: Action;
  matches?: CheckURLResponse;
  message?: string;
  qrObject?: QRCode | null;
  link?: string;
  error?: string;
}

export interface FullQRFormValues {
  id: string;
  name: string;
  desc: string;
  scansLeft: number;
  infiniteScans: boolean;
  start: Date;
  expiry: Date;
  neverExpires: boolean;
  link: string;
  user: string;
  linkToQR: string;
}
