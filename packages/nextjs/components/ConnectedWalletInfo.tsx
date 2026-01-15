"use client";

import { zeroAddress } from "viem";
import { useAccount } from "wagmi";
import { CheckCircleIcon, ClockIcon, XCircleIcon } from "@heroicons/react/24/solid";
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
    <div className="flex items-center gap-2 mr-2">
      {isBatchMember && hasCheckedIn && (
        <div className="p-1 tooltip tooltip-left tooltip-success" data-tip="Checked in">
          <CheckCircleIcon className="h-5 w-5 text-success" />
        </div>
      )}

      {isBatchMember && !hasCheckedIn && (
        <div className="p-1 tooltip tooltip-left tooltip-warning" data-tip="Not checked in yet">
          <ClockIcon className="h-5 w-5 text-yellow-500" />
        </div>
      )}

      {!isBatchMember && (
        <div className="p-1 tooltip tooltip-left tooltip-warning" data-tip="Not a member">
          <XCircleIcon className="h-5 w-5 text-red-500" />
        </div>
      )}
    </div>
  );
};
