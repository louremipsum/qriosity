"use server";
import { getSession } from "@auth0/nextjs-auth0";
import ViewQR from "@/components/QR/ViewQR";
import type { QRList } from "@/types/viewqr";
import type { resp } from "@/types/viewqr";

const Page = async () => {
  const session = await getSession();
  const currentUser = JSON.stringify(session?.user.sub, null, 2);
  const resp = await fetch(
    "https://s2zv0ze2gg.execute-api.ap-south-1.amazonaws.com/getqrs?" +
      new URLSearchParams({ user_id: currentUser }),
    { next: { revalidate: 3600 } }
  );
  const data = await resp.json();
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
