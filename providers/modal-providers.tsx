"use client";

import { useEffect, useState } from "react";

import { StoreModal } from "@/components/modals/store-modal";
//ไว้แก้ Hydration
export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted) {
    return null;
  }
  return (
    <>
      <StoreModal />
    </>
  );
};
