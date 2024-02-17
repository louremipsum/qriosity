import type { extendedQRList, status } from "@/types/viewqr";
import type { resp } from "@/types/viewqr";

const processQRList = (data: { items: resp[] }) => {
  const qrList: extendedQRList[] = data.items.map((item: resp) => {
    const qrObject = JSON.parse(item.qrObject.S);
    const neverExpires = item.neverExpires.BOOL;
    const startDate = new Date(item.start.S);
    const expiryDate = new Date(item.expiry.S);
    const scansLeft = Number(item.scansLeft.N);
    const infiniteScans = item.infiniteScans.BOOL;
    const currentDate = new Date();
    const lastModified = new Date(item.lastModified.S);

    let status: status = "Active";

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
      lastModified,
    };
  });

  return qrList;
};

export default processQRList;
