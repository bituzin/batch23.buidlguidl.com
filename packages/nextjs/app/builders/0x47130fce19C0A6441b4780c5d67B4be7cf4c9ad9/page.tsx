import Link from "next/link";
import { Address } from "@scaffold-ui/components";
import type { NextPage } from "next";

const Proskairos: NextPage = () => {
  return (
    <div className="flex items-center flex-col flex-grow pt-10 px-4">
      <div className="w-full max-w-4xl">
        <h1 className="text-center mb-8">
          <span className="block text-4xl font-bold">Hey builders! ⚙️</span>
        </h1>

        {/* Card */}
        <div className="bg-base-100 border border-base-300 shadow-md rounded-3xl p-4 sm:p-6 md:p-8">
          {/* Terminal */}
          <div className="bg-[#0b0f14] rounded-2xl border border-base-300 font-mono text-xs sm:text-sm text-gray-200 overflow-hidden">
            {/* Header */}
            <div className="flex items-center gap-2 px-4 py-3 bg-[#111827] border-b border-base-300">
              <div className="flex gap-2">
                <span className="h-3 w-3 rounded-full bg-red-500" />
                <span className="h-3 w-3 rounded-full bg-yellow-500" />
                <span className="h-3 w-3 rounded-full bg-green-500" />
              </div>
              <span className="ml-3 text-xs text-gray-400 truncate">proskairos@home — terminal</span>
            </div>

            {/* Body */}
            <div className="p-4 sm:p-6 space-y-2">
              {/* whoami command */}
              <div className="flex flex-wrap items-baseline gap-1">
                <span className="text-green-400">user@home</span>
                <span className="text-gray-400">:</span>
                <span className="text-blue-400">~</span>
                <span className="text-gray-400">$</span>
                <span className="ml-1">whoami</span>
              </div>
              <div className="text-cyan-400 pl-0">proskairos</div>

              {/* cat command */}
              <div className="flex flex-wrap items-baseline gap-1 mt-4">
                <span className="text-green-400">user@home</span>
                <span className="text-gray-400">:</span>
                <span className="text-blue-400">~</span>
                <span className="text-gray-400">$</span>
                <span className="ml-1">cat intro.txt</span>
              </div>
              <p className="text-gray-300 pl-0 leading-relaxed">
                Building and learning full-stack applications across Web2 & Web3, with a focus on collaboration and
                clean architecture.
              </p>

              {/* neofetch command */}
              <div className="flex flex-wrap items-baseline gap-1 mt-4">
                <span className="text-green-400">user@home</span>
                <span className="text-gray-400">:</span>
                <span className="text-blue-400">~</span>
                <span className="text-gray-400">$</span>
                <span className="ml-1">neofetch</span>
              </div>

              {/* Neofetch output */}
              <div className="mt-2 space-y-1">
                <div>
                  <span className="text-purple-400">proskairos@home</span>
                </div>
                <div>
                  <span className="text-gray-500">--------------------</span>
                </div>
                <div>
                  <span className="text-yellow-400">Role:</span>
                  <span className="ml-2"> Developer</span>
                </div>
                <div>
                  <span className="text-yellow-400">GitHub:</span>
                  <span className="ml-2">proskairos</span>
                </div>
                <div>
                  <span className="text-yellow-400">Email:</span>
                  <span className="ml-2">proskairos@tuta.io</span>
                </div>
              </div>

              {/* Cursor */}
              <div className="flex flex-wrap items-baseline gap-1 mt-4">
                <span className="text-green-400">user@home</span>
                <span className="text-gray-400">:</span>
                <span className="text-blue-400">~</span>
                <span className="text-gray-400">$</span>
                <span className="ml-1 animate-pulse">_</span>
              </div>
            </div>
          </div>

          {/* Links */}
          <div className="divider mt-8 mb-6">Links</div>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="https://github.com/proskairos"
              target="_blank"
              rel="noreferrer"
              className="btn btn-primary btn-sm rounded-full"
            >
              GitHub
            </Link>
            <Link href="mailto:proskairos@tuta.io" className="btn btn-secondary btn-sm rounded-full">
              Email
            </Link>
          </div>

          {/* Address */}
          <div className="mt-6 flex justify-center">
            <Address address="0x47130fce19C0A6441b4780c5d67B4be7cf4c9ad9" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Proskairos;
