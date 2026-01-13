"use client";

import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";

const HeroBatchCard = () => {
  const { data: checkedInCount, isLoading } = useScaffoldReadContract({
    contractName: "BatchRegistry",
    functionName: "checkedInCounter",
  });
  return (
    <div className="p-8 bg-base-100/30 border border-base-content">
      <h1 className="text-center">
        <span className="block text-2xl mb-2">Welcome to</span>
        <span className="block text-4xl font-bold">Batch #23</span>
      </h1>
      <p className="text-center text-lg">Engineering the decentralized frontier, one Pull Request at a time.</p>
      <p className="text-lg flex gap-2 justify-center">
        <span className="font-bold">Checked in builders count:</span>
        {isLoading ? (
          <span className="loading loading-spinner loading-sm"></span>
        ) : (
          <span>{checkedInCount?.toString()}</span>
        )}
      </p>
    </div>
  );
};

export { HeroBatchCard };
