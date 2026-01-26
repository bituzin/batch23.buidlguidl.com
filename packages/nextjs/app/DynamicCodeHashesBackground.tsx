"use client";

import { useEffect, useState } from "react";
import { useCodeDirection } from "~~/contexts/CodeDirectionContext";

export const DynamicCodeHashesBackground = ({
  horizontalBg,
  verticalBg,
}: {
  horizontalBg: React.ReactNode;
  verticalBg: React.ReactNode;
}) => {
  const { isVertical } = useCodeDirection();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return horizontalBg;

  return isVertical ? verticalBg : horizontalBg;
};
