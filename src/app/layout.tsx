import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import "@mantine/notifications/styles.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import NextTopLoader from "nextjs-toploader";
import { theme } from "@/utils/theme";
import StoreProvider from "./StoreProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Qriosity",
  description: "Make temporary QR codes",
  metadataBase: new URL("https://qriosityx.vercel.app/"),
  openGraph: {
    title: "Qriosity",
    description: "Make temporary QR codes",
    url: "https://qriosityx.vercel.app/",
    siteName: "Qriosity",
    images: [
      {
        url: "https://github.com/louremipsum/qriosity/blob/main/public/Group_2.png?raw=true",
        width: 800,
        height: 600,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: false,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: false,
      noimageindex: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    card: "summary_large_image",
    title: "Qriosity",
    description: "Make temporary QR codes",
    siteId: "1467726470533754880",
    creator: "@louremipsum",
    creatorId: "1467726470533754880",
    images: [
      "https://github.com/louremipsum/qriosity/blob/main/public/Group_2.png?raw=true",
    ],
  },
  bookmarks: ["https://qriosityx.vercel.app/"],
  other: {
    "google-site-verification": process.env.GSV!,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <UserProvider>
        <body className={inter.className}>
          <MantineProvider theme={theme}>
            <NextTopLoader color={theme.colors?.teal![5]} showSpinner={false} />
            <Notifications />
            <StoreProvider>{children}</StoreProvider>
          </MantineProvider>
        </body>
      </UserProvider>
    </html>
  );
}
