"use client";

import { zeroAddress } from "viem";
import { useAccount } from "wagmi";
import {
  CheckCircleIcon,
  ClipboardDocumentCheckIcon,
  ExclamationTriangleIcon,
  UserIcon,
  XCircleIcon,
} from "@heroicons/react/24/solid";
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";

export const ConnectedWalletInfo = () => {
  const { address, isConnected } = useAccount();

  const { data: isMember } = useScaffoldReadContract({
    contractName: "BatchRegistry",
    functionName: "allowList",
    args: [address ?? zeroAddress],
  });

  const { data: checkInContract } = useScaffoldReadContract({
    contractName: "BatchRegistry",
    functionName: "yourContractAddress",
    args: [address ?? zeroAddress],
  });

  const isBatchMember = Boolean(isMember);

  const hasCheckedIn = checkInContract !== undefined && checkInContract !== zeroAddress;

  if (!isConnected) return null;

  return (
    <div className="flex flex-col items-end gap-2">
      <div className="rounded-xl border border-base-300 bg-base-200 mr-2 px-4 py-3 space-y-2 text-sm shadow-sm min-w-[220px]">
        <div className="flex items-center gap-2">
          <UserIcon className="h-4 w-4 text-base-content/70" />
          <span className="flex-1">Batch Member</span>

          {isBatchMember ? (
            <span className="flex items-center gap-1 text-success">
              <CheckCircleIcon className="h-4 w-4" />
              Yes
            </span>
          ) : (
            <span className="flex items-center gap-1 text-error">
              <XCircleIcon className="h-4 w-4" />
              No
            </span>
          )}
        </div>

        {isBatchMember && (
          <div className="flex items-center gap-2">
            <ClipboardDocumentCheckIcon className="h-4 w-4 text-base-content/70" />
            <span className="flex-1">Checked In</span>

            {hasCheckedIn ? (
              <span className="flex items-center gap-1 text-success">
                <CheckCircleIcon className="h-4 w-4" />
                Done
              </span>
            ) : (
              <span className="flex items-center gap-1 text-warning">
                <XCircleIcon className="h-4 w-4" />
                Not yet
              </span>
            )}
          </div>
        )}

        {!isBatchMember && (
          <div className="flex items-center gap-2 rounded-lg bg-warning/10 px-2 py-1 text-warning">
            <ExclamationTriangleIcon className="h-4 w-4" />
            <span className="text-xs font-medium">Sorry! You&apos;re not in allowlist</span>
          </div>
        )}
      </div>
    </div>
  );
};
