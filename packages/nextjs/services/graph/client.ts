export type Builder = {
  id: string;
  address: string;
  checkInCount: number;
  firstCheckIn: number;
  lastCheckIn: number;
};

export const SUBGRAPH_URL =
  process.env.NEXT_PUBLIC_SUBGRAPH_URL || "https://api.studio.thegraph.com/query/1724087/batch-23/version/latest";

export const GET_BUILDERS_QUERY = `
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

export async function getBuilders(): Promise<Builder[]> {
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

const GET_BUILDER_AND_CHECKIN_QUERY = `
query GetBuilders  {
  builders(orderBy: lastCheckIn, orderDirection: desc) {
    address
    checkIns(first:1) {
      transactionHash
      checkInContract
    }
  }
}`;

export type BuilderWithCheckIn = {
  address: string;
  checkIns: CheckIn[];
};

export type CheckIn = {
  transactionHash: string;
  checkInContract: string;
};

export async function getBuildersAndCheckIns(): Promise<BuilderWithCheckIn[]> {
  const res = await fetch(SUBGRAPH_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: GET_BUILDER_AND_CHECKIN_QUERY,
    }),
    next: { revalidate: 60 }, // Revalidate every 60 seconds
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch builders with checkins: ${res.statusText}`);
  }

  const { data } = await res.json();
  return data?.builders || [];
}
