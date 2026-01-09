"use client";

import { useReadContract } from "wagmi";
import { parseAbi } from "viem";
import { base } from "viem/chains";

const TALENT_BUILDER_SCORE_ADDRESS = "0xBBFeDA7c4d8d9Df752542b03CdD715F790B32D0B";
const TALENT_BUILDER_SCORE_ABI = parseAbi(["function getScoreByAddress(address wallet) view returns (uint256)"]);

export const useTalentBuilderScore = (address: string) => {
    const { data: score, isLoading } = useReadContract({
        address: TALENT_BUILDER_SCORE_ADDRESS,
        abi: TALENT_BUILDER_SCORE_ABI,
        functionName: "getScoreByAddress",
        args: [address],
        chainId: base.id,
        query: {
            enabled: !!address,
            staleTime: Infinity,
        },
    });

    return { data: score, isLoading };
};
