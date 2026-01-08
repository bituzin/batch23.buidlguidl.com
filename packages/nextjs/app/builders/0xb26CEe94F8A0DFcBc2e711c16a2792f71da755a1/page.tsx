"use client";

import { Card3D } from "./Card3D";
import { GithubIcon } from "./SocialIcons/GithubIcon";
import { LinkedInIcon } from "./SocialIcons/LinkedInIcon";
import { useAddress } from "@scaffold-ui/hooks";
import { type NextPage } from "next";
import { BuidlGuidlLogo } from "~~/components/assets/BuidlGuidlLogo";
import { BlockieAvatar } from "~~/components/scaffold-eth";

const ADDRESS = "0xb26CEe94F8A0DFcBc2e711c16a2792f71da755a1";
const NAME = "Agustin Jaralampidis";
const GITHUB_LINK = "https://github.com/ajaralampidis";
const LINKEDIN_LINK = "https://www.linkedin.com/in/ajaralampidis/";

const AgusJaraBuilderPage: NextPage = () => {
  const { checkSumAddress, shortAddress, ens, ensAvatar } = useAddress({ address: ADDRESS });

  return (
    <section className="w-full h-full flex items-center justify-center mt-12">
      <article className="h-full">
        <Card3D>
          <header>
            <h1 className="text-2xl md:text-3xl font-bold flex flex-row gap-2 items-center">
              <span aria-hidden="true" className="inline-block">
                {ensAvatar ? (
                  // next/image is not suitable here: dynamic external source (unless we add IFPS as a source)
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={ensAvatar} width={30} height={30} alt={`${NAME} avatar`} className="rounded-full" />
                ) : (
                  <BlockieAvatar address={checkSumAddress as `0x${string}`} size={30} />
                )}
              </span>
              <span>{NAME}</span>
            </h1>

            <p className="font-mono text-xs text-base-content/70">
              {ens ? `${ens} | ${shortAddress}` : checkSumAddress}
            </p>
          </header>

          <section>
            <p>
              Hi, I am Agus. 👋
              <br />A web developer from 🇦🇷 enjoying this Batch and learning Web3.
            </p>

            <p>
              Very thankful to{" "}
              <a
                href="https://buidlguidl.com/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex gap-1 align-text-bottom"
              >
                <BuidlGuidlLogo className="w-3 h-5" aria-hidden="true" />
                <span className="link">BuidlGuidl</span>
              </a>{" "}
              for allowing me and many devs to speedrun through Ethereum.
            </p>
          </section>

          <footer className="flex flex-row items-center gap-2 mt-6">
            <a href={GITHUB_LINK} target="_blank" rel="noreferrer" aria-label="GitHub profile">
              <GithubIcon className="size-3 hover:fill-primary" />
            </a>

            <a href={LINKEDIN_LINK} target="_blank" rel="noreferrer" aria-label="LinkedIn profile">
              <LinkedInIcon className="size-3 hover:fill-primary" />
            </a>
          </footer>
        </Card3D>
      </article>
    </section>
  );
};

export default AgusJaraBuilderPage;
