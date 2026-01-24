import { CSSProperties, ReactNode } from "react";
import "./VerticalMarqueeAnimation.css";

type InfiniteVerticalScrollProps = {
  children: ReactNode | ReactNode[];
  duration?: string; // e.g. '6000s', '10s'
  timing?: string; // e.g. 'linear', 'ease-in-out'
  iteration?: string; // e.g. 'infinite', '1'
  direction?: "normal" | "reverse" | "alternate" | "alternate-reverse";
  delay?: string;
  className?: string;
  style?: CSSProperties;
};

export const InfiniteVerticalScroll = ({
  children,
  duration = "300s",
  timing = "linear",
  iteration = "infinite",
  direction = "normal",
  delay = "0s",
  className = "",
  style = {},
}: InfiniteVerticalScrollProps) => {
  const cssVars: CSSProperties = {
    "--animate-vertical-marquee-duration": duration,
    "--animate-vertical-marquee-timing": timing,
    "--animate-vertical-marquee-iteration": iteration,
    "--animate-vertical-marquee-direction": direction,
    "--animate-vertical-marquee-delay": delay,
  } as CSSProperties;

  return (
    <div className={`h-full relative flex flex-col overflow-y-hidden ${className}`} style={{ ...cssVars, ...style }}>
      <div className="animate-vertical-marquee">{children}</div>
      <div className="animate-vertical-marquee" aria-hidden="true">
        {children}
      </div>
    </div>
  );
};
