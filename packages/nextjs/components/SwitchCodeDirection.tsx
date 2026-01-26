"use client";

import { useEffect, useState } from "react";
import { useCodeDirection } from "~~/contexts/CodeDirectionContext";

export const SwitchCodeDirection = ({ className }: { className?: string }) => {
  const [mounted, setMounted] = useState(false);
  const { isVertical, setIsVertical } = useCodeDirection();

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggle = () => {
    setIsVertical(!isVertical);
  };

  if (!mounted) return null;

  return (
    <div className={`flex h-7 items-center justify-center ${className}`}>
      <button
        onClick={toggle}
        className={`w-10 h-5 rounded-full transition-all mt-5 -ml-7 ${isVertical ? "bg-red-600 hover:bg-red-700" : "bg-blue-700 hover:bg-blue-800"}`}
      />
    </div>
  );
};
