"use server";
import { getSession } from "@auth0/nextjs-auth0";
import ViewQR from "@/components/QR/ViewQR";
import type { extendedQRList } from "@/types/viewqr";
import type { resp } from "@/types/viewqr";
import axios, { AxiosResponse } from "axios";

const createAccessToken = async () => {
  const options = {
    method: "POST",
    url: process.env.URL_AT,
    headers: { "content-type": "application/x-www-form-urlencoded" },
    data: new URLSearchParams({
      client_id: process.env.AUTH0_CLIENT_ID!,
      client_secret: process.env.AUTH0_CLIENT_SECRET!,
      audience: process.env.AUTH0_AUDIENCE!,
      grant_type: "client_credentials",
    }),
  };

  try {
    const response: AxiosResponse = await axios(options);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

const Page = async () => {
  const session = await getSession();
  const currentUser = JSON.stringify(session?.user.sub, null, 2);
  const token = await createAccessToken();

  const resp = await fetch(
    `${process.env.VIEW_QRS}?` + new URLSearchParams({ user_id: currentUser }),
    {
      headers: {
        Authorization: `Bearer ${token.access_token}`,
      },
      next: { revalidate: 3600 },
    }
  );
  const data = await resp.json();
  if (!data) {
    return {
      notFound: true,
    };
  }
  const qrList: extendedQRList[] = data.items.map((item: resp) => {
    const qrObject = JSON.parse(item.qrObject.S);
    const neverExpires = item.neverExpires.BOOL;
    const startDate = new Date(item.start.S);
    const expiryDate = new Date(item.expiry.S);
    const scansLeft = Number(item.scansLeft.N);
    const infiniteScans = item.infiniteScans.BOOL;
    const currentDate = new Date();

    let status = "Active";

    // Check if the link is yet to be activated
    if (startDate && currentDate < startDate) {
      status = "Scheduled";
    }

    // Check if the link has expired due to ttl or expiry date
    const isScansLeftZero = !infiniteScans && scansLeft <= 0;
    const isExpired = !neverExpires && currentDate > expiryDate;

    if (isScansLeftZero || isExpired) {
      status = "Expired";
    }

    return {
      qrObject,
      neverExpires,
      user: item.user.S,
      scansLeft,
      start: startDate,
      expiry: expiryDate,
      link: item.link.S,
      id: item.id.S,
      name: item.name.S,
      desc: item.desc.S,
      infiniteScans,
      linkToQr: item.linkToQr.S,
      status,
    };
  });

  return (
    <>
      <ViewQR qrList={qrList} />
    </>
  );
};

export default Page;
