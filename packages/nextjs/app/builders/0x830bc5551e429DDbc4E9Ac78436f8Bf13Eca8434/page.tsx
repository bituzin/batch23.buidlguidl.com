"use client";

import Link from "next/link";
import * as icons from "./icons";
import { Address } from "@scaffold-ui/components";
import type { NextPage } from "next";
import { useTalentBuilderScore } from "~~/hooks/useTalentBuilderScore";

const BIO = `seasoned\u00A0dev (mostly both backend/fronted in\u00A0python/js but\u00A0also struggled with\u00A0enterprise java for\u00A0quite a\u00A0few years in\u00A0the beginning of\u00A0my\u00A0career, secretly in\u00A0love with\u00A0clojure and tinkered quite a\u00A0few other ecosystems/spheres too) actively seeking my\u00A0own path to\u00A0web3 transition. took part in multiple ETHGlobal and Devfolio hackathons with\u00A0a\u00A0few prizes\u00A0won`;

const SOCIAL_LINKS = [
  {
    href: "https://talent.app/guy-do-or-die",
    icon: icons.TalentIcon,
  },
  {
    href: "https://github.com/guy-do-or-die",
    icon: icons.GithubIcon,
  },
  {
    href: "https://t.me/guy_do_or_die",
    icon: icons.TelegramIcon,
  },
  {
    href: "https://linkedin.com/in/guy-do-or-die",
    icon: icons.LinkedInIcon,
  },
  {
    href: "https://instagram.com/guy_do_or_die",
    icon: icons.InstagramIcon,
  },
  {
    href: "https://facebook.com/guy.do.or.die",
    icon: icons.FacebookIcon,
  },
];

const GuyDoOrDiePage: NextPage = () => {
  const address = "0x830bc5551e429DDbc4E9Ac78436f8Bf13Eca8434";

  const { data: talentBuilderScore, isLoading } = useTalentBuilderScore(address);

  return (
    <div className="flex items-center flex-col grow pt-10">
      <div className="px-5">
        <div className="flex flex-col items-center bg-base-100 shadow-xl shadow-secondary/20 border-2 border-secondary/50 rounded-3xl p-8 min-w-[340px] max-w-[600px] transition-all hover:shadow-2xl hover:-translate-y-1">
          <h1 className="text-center mb-2">
            <span className="block text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Egor
            </span>
          </h1>

          <div className="flex flex-wrap items-center justify-center gap-4 my-6">
            <div className="flex items-center justify-center bg-base-200 rounded-lg w-44 h-14 px-2">
              <Address address={address} format="short" disableAddressLink />
            </div>

            <div className="flex items-center justify-center gap-2 bg-base-200 rounded-lg w-44 h-14 px-2">
              <span className="font-semibold text-sm">Builder Score:</span>
              {isLoading ? (
                <span className="loading loading-spinner loading-xs"></span>
              ) : (
                <span className="text-lg font-bold">{talentBuilderScore?.toString() ?? "-"}</span>
              )}
            </div>
          </div>

          <div className="flex gap-4 w-full justify-center my-6">
            {SOCIAL_LINKS.map(({ href, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                target="_blank"
                className="btn btn-ghost btn-sm btn-square hover:bg-base-300 transition-colors"
              >
                <Icon />
              </Link>
            ))}
          </div>

          <div className="w-full max-w-lg px-4">
            <style>{`
              @keyframes vim-blink {
                0%, 100% { opacity: 1; }
                50% { opacity: 0; }
              }
            `}</style>
            <p className="text-justify leading-7 opacity-80 text-xs md:text-sm font-medium tracking-normal md:tracking-wide">
              <span className="text-secondary mr-2 font-bold font-mono">$&gt;</span>
              {BIO}
              <span
                className="ml-1 inline-block w-2.5 h-5 bg-secondary align-middle"
                style={{ animation: "vim-blink 1s step-end infinite" }}
              ></span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuyDoOrDiePage;
