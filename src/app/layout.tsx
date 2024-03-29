import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import "@mantine/notifications/styles.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { theme } from "@/utils/theme";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { QRProvider } from "@/context/Provider";
import ProgressProvider from "@/components/common/ProgressBarProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Qriosity",
  description: "Make Dynamic Temporary QR codes",
  metadataBase: new URL("https://www.qriosity.xyz/"),
  openGraph: {
    title: "Qriosity",
    description: "Make dynamic temporary QR codes",
    url: "https://www.qriosity.xyz/",
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
    description: "Make dynamic temporary QR codes",
    siteId: "1467726470533754880",
    creator: "@louremipsum",
    creatorId: "1467726470533754880",
    images: [
      "https://github.com/louremipsum/qriosity/blob/main/public/ogImage.png?raw=true",
    ],
  },
  bookmarks: ["https://www.qriosity.xyz/"],
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
            <ProgressProvider>
              <Notifications />
              <QRProvider>{children}</QRProvider>
            </ProgressProvider>
          </MantineProvider>
          <SpeedInsights />
        </body>
      </UserProvider>
    </html>
  );
}
