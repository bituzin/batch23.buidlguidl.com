import Link from "next/link";
import { Address } from "@scaffold-ui/components";

type Builder = {
  id: string;
  address: string;
  checkInCount: number;
  firstCheckIn: number;
  lastCheckIn: number;
};

const SUBGRAPH_URL = "https://api.studio.thegraph.com/query/1722630/batch-23-buidlguidl/version/latest";

const GET_BUILDERS_QUERY = `
  query GetBuilders {
    builders(orderBy: lastCheckIn, orderDirection: desc) {
      id
      address
      checkInCount
      firstCheckIn
      lastCheckIn
    }
  }
`;

async function getBuilders(): Promise<Builder[]> {
  const res = await fetch(SUBGRAPH_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: GET_BUILDERS_QUERY,
    }),
    next: { revalidate: 60 }, // Revalidate every 60 seconds
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch builders: ${res.statusText}`);
  }

  const { data } = await res.json();
  return data?.builders || [];
}

export default async function BuildersPage() {
  let builders: Builder[] = [];
  let error: string | null = null;

  try {
    builders = await getBuilders();
  } catch (e: any) {
    error = e.message;
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center h-screen px-4">
        <div className="max-w-2xl w-full bg-base-100 shadow-xl rounded-2xl p-8 border border-base-300">
          <div className="flex items-center gap-4 mb-4">
            <svg className="w-12 h-12 text-error" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h2 className="text-2xl font-bold">Error Loading Builders</h2>
          </div>

          <p className="text-base-content/70 mb-4">Error: {error}</p>

          <div className="bg-base-200 rounded-lg p-4 mb-4">
            <p className="text-sm font-mono text-base-content/60">
              Network: Arbitrum One
              <br />
              Contract: 0xDfa17B7e7b77c741e7C08f3F9fBa421e08c5EE6B
              <br />
              Start Block: 418605653
            </p>
          </div>

          <div className="flex gap-3">
            <a href="/builders" className="btn btn-primary">
              Refresh Page
            </a>
            <a
              href="https://thegraph.com/studio/subgraph/batch-23-buidlguidl"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline"
            >
              Check Sync Status
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center py-10 px-5">
      <h1 className="text-4xl font-bold mb-8 text-primary">Batch 23 Builders</h1>
      <div className="overflow-x-auto w-full max-w-5xl bg-base-100 shadow-xl rounded-2xl border border-base-300">
        <table className="table w-full">
          <thead>
            <tr className="bg-base-200 text-lg">
              <th>Builder</th>
              <th>Check-ins</th>
              <th>First Seen</th>
              <th>Last Check-in</th>
              <th>Profile</th>
            </tr>
          </thead>
          <tbody>
            {builders.map(builder => (
              <tr key={builder.id} className="hover:bg-base-200 transition-colors">
                <td>
                  <Address address={builder.address} />
                </td>
                <td className="font-mono">{builder.checkInCount}</td>
                <td>{new Date(builder.firstCheckIn * 1000).toLocaleDateString()}</td>
                <td>{new Date(builder.lastCheckIn * 1000).toLocaleString()}</td>
                <td>
                  <Link
                    href={`/builders/${builder.address}`}
                    className="btn btn-outline btn-sm btn-primary rounded-full px-4 hover:scale-105 transition-transform"
                  >
                    View Profile
                  </Link>
                </td>
              </tr>
            ))}
            {builders.length === 0 && (
              <tr>
                <td colSpan={5} className="py-16">
                  <div className="flex flex-col items-center gap-4">
                    <div className="text-6xl opacity-20">👥</div>
                    <h3 className="text-2xl font-bold text-base-content/70">No Builders Yet</h3>
                    <p className="text-base-content/50 max-w-md text-center">
                      The subgraph has successfully synced, but no builders have checked in to the BatchRegistry
                      contract yet. Be the first to check in!
                    </p>
                    <a
                      href="https://arbiscan.io/address/0xDfa17B7e7b77c741e7C08f3F9fBa421e08c5EE6B#writeContract"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary btn-sm mt-2"
                    >
                      View Contract on Arbiscan
                    </a>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
