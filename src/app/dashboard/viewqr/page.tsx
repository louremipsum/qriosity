"use server";
import { getSession } from "@auth0/nextjs-auth0";
import ViewQR from "@/components/QR/ViewQR";
import type { QRList } from "@/types/viewqr";
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
  const qrList: QRList[] = data.items.map((item: resp) => ({
    qrObject: JSON.parse(item.qrObject.S),
    neverExpires: item.neverExpires.BOOL,
    user: item.user.S,
    scansLeft: Number(item.scansLeft.N),
    start: new Date(item.start.S),
    expiry: new Date(item.expiry.S),
    link: item.link.S,
    id: item.id.S,
    name: item.name.S,
    desc: item.desc.S,
    infiniteScans: item.infiniteScans.BOOL,
    linkToQr: item.linkToQr.S,
  }));
  return (
    <>
      <ViewQR qrList={qrList} />
    </>
  );
};

export default Page;
