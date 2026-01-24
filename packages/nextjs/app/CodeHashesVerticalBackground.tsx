import "./HomeStyles.css";
import { InfiniteHorizontalScroll } from "~~/components/InfiniteHorizontalScroll";
import Repeater from "~~/components/Repeater";
import { type BuilderWithCheckIn, getBuildersAndCheckIns } from "~~/services/graph/client";

export const CodeHashesVerticalBackground = async () => {
  const builders: BuilderWithCheckIn[] = await getBuildersAndCheckIns();

  return (
    <div className="absolute r-0 l-0 w-full h-full b-0 t-0 dark:bg-gray-950 bg-gray-300 overflow-hidden -z-10">
      {/* Rotate the entire container 90 degrees */}
      <div
        className="absolute r-0 l-0 w-full h-full b-0 t-0 rotate-90 origin-center"
        style={{ width: "100vh", height: "100vw", left: "calc(50% - 50vh)", top: "calc(50% - 50vw)" }}
      >
        <Repeater
          containerClasses="absolute r-0 l-0 w-full h-full b-0 t-0 dark:bg-gray-950 bg-gray-300 overflow-hidden"
          containerStyle={{
            WebkitMaskImage: "radial-gradient(ellipse at center, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 90%)",
            maskImage: "radial-gradient(ellipse at center, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 90%)",
          }}
        >
          <div
            className={`dark:text-green-900/50 text-green-100/75 font-mono ${builders.length ? "animate-fade-in-home" : ""}`}
          >
            {builders.map((builder, index) => {
              const text = `Builder:${builder.address} checkIn hash:${builder.checkIns[0].transactionHash} contract:${builder.checkIns[0].checkInContract}`;
              return (
                <InfiniteHorizontalScroll
                  key={builder.address}
                  delay={`-${Math.random() * 100}s`}
                  direction={index % 2 === 0 ? "normal" : "reverse"}
                >
                  <div className="whitespace-nowrap select-none pointer-events-none flex items-center leading-tight">
                    <span className="pl-2">
                      {/* Repeating text so that covers full-width for very big screens */}
                      {text} {text} {text} {text} {text}
                    </span>
                  </div>
                </InfiniteHorizontalScroll>
              );
            })}
          </div>
        </Repeater>
      </div>
      <div className="relative h-full w-full bg-transparent">
        <div className="w-full h-32 bg-gradient-to-t from-green-600/60 dark:from-green-600/70 blur-3xl via-transparent to-transparent opacity-40 animate-gradient-up pointer-events-none" />
      </div>
    </div>
  );
};
