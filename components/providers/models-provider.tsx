"use client";

import { useEffect, useState } from "react";

export const ModelsProvider = () => {
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    setIsMuted(true);
  }, []);

  if (!isMuted) {
    return null;
  }

  return (
    <>
    </>
  );
};
