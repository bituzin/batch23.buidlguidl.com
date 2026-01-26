"use client";

import { ReactNode, createContext, useContext, useEffect, useState } from "react";

interface CodeDirectionContextType {
  isVertical: boolean;
  setIsVertical: (value: boolean) => void;
}

const CodeDirectionContext = createContext<CodeDirectionContextType | undefined>(undefined);

export const CodeDirectionProvider = ({ children }: { children: ReactNode }) => {
  const [isVertical, setIsVertical] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem("codeDirection");
    if (stored === "vertical") {
      setIsVertical(true);
    }
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem("codeDirection", isVertical ? "vertical" : "horizontal");
    }
  }, [isVertical, mounted]);

  return (
    <CodeDirectionContext.Provider value={{ isVertical, setIsVertical }}>{children}</CodeDirectionContext.Provider>
  );
};

export const useCodeDirection = () => {
  const context = useContext(CodeDirectionContext);
  if (context === undefined) {
    throw new Error("useCodeDirection must be used within a CodeDirectionProvider");
  }
  return context;
};
