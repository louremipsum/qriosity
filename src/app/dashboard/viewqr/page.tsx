"use server";
import { viewQRAction } from "@/app/action";
import ViewQR from "@/components/QR/ViewQR";
import type { LastEvaluatedKeyType, extendedQRList } from "@/types/viewqr";

const Page = async () => {
  const data = await viewQRAction(null);
  const qrList: extendedQRList[] = data.processedData;
  const lastEvaluatedKey: LastEvaluatedKeyType = data.lastEvaluatedKey;
  return (
    <>
      <ViewQR qrList={qrList} lastEvaluatedKey={lastEvaluatedKey} />
    </>
  );
};

export default Page;
