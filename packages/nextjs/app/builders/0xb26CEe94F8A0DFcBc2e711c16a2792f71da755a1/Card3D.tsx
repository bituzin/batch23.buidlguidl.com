"use client";

import { useRef } from "react";

type Props = {
  children?: React.ReactNode | React.ReactNode[];
};

export const Card3D = ({ children }: Props) => {
  const boundingRef = useRef<DOMRect | null>(null);

  return (
    <div className="[perspective:1200px] shadow-2xl shadow-secondary">
      <div
        onMouseLeave={() => (boundingRef.current = null)}
        onMouseEnter={ev => {
          boundingRef.current = ev.currentTarget.getBoundingClientRect();
        }}
        onMouseMove={ev => {
          if (!boundingRef.current) return;
          const x = ev.clientX - boundingRef.current.left;
          const y = ev.clientY - boundingRef.current.top;
          const xPercentage = x / boundingRef.current.width;
          const yPercentage = y / boundingRef.current.height;
          const xRotation = (xPercentage - 0.5) * 20;
          const yRotation = (0.5 - yPercentage) * 20;

          ev.currentTarget.style.setProperty("--x-rotation", `${yRotation}deg`);
          ev.currentTarget.style.setProperty("--y-rotation", `${xRotation}deg`);
          ev.currentTarget.style.setProperty("--x", `${xPercentage * 100}%`);
          ev.currentTarget.style.setProperty("--y", `${yPercentage * 100}%`);
        }}
        className="group relative max-w-sm md:max-w-md rounded-lg border border-secondary bg-base-100 p-4 lg:p-6 text-base-content transition-transform ease-out hover:[transform:rotateX(var(--x-rotation))_rotateY(var(--y-rotation))_scale(1.07)]"
      >
        {children}
        <div className="pointer-events-none absolute inset-0 dark:group-hover:bg-[radial-gradient(at_var(--x)_var(--y),rgba(255,255,255,0.1)_20%,transparent_80%)] group-hover:bg-[radial-gradient(at_var(--x)_var(--y),#ffffff10_20%,transparent_80%)]" />
      </div>
    </div>
  );
};
