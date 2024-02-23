"use client";
import { getQRCount } from "@/app/action";
import { QRContext } from "@/context/Context";
import { useContext, useEffect, useRef } from "react";

interface QRContextType {
  numQRs: number;
  setNumQRs: React.Dispatch<React.SetStateAction<number>>;
  dataLoaded: boolean;
  setDataLoaded: React.Dispatch<React.SetStateAction<boolean>>;
}

const GetQR = () => {
  const context = useContext(QRContext);
  const { setNumQRs, setDataLoaded } = context as QRContextType;
  const isLoading = useRef(false);

  useEffect(() => {
    const fetchData = async () => {
      if (!isLoading.current) {
        isLoading.current = true;
        setDataLoaded(false);
        const data = await getQRCount();
        if (data && data.num) {
          setNumQRs(data.num);
          setDataLoaded(true);
        }
        isLoading.current = false;
      }
    };

    fetchData();
  }, [setNumQRs, setDataLoaded]); // Include setDataLoaded in the dependencies array

  return <></>;
};

export default GetQR;
