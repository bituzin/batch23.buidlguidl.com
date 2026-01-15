export type GitHubPullRequest = {
  number: number;
  title: string;
  user: {
    login: string;
    avatar_url: string;
  };
  merged_at: string;
  html_url: string;
  created_at: string;
  body: string | null;
};

const GITHUB_API_URL = "https://api.github.com";
const REPO_OWNER = "BuidlGuidl";
const REPO_NAME = "batch23.buidlguidl.com";

export async function getMergedPullRequests(limit: number = 50): Promise<GitHubPullRequest[]> {
  try {
    const response = await fetch(
      `${GITHUB_API_URL}/repos/${REPO_OWNER}/${REPO_NAME}/pulls?state=closed&per_page=${limit}&sort=updated&direction=desc`,
      {
        headers: {
          Accept: "application/vnd.github.v3+json",
          // Opcjonalnie: dodaj token jeśli masz limit rate
          // Authorization: `token ${process.env.GITHUB_TOKEN}`,
        },
        next: { revalidate: 300 }, // Cache na 5 minut
      }
    );

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.statusText}`);
    }

    const pullRequests: GitHubPullRequest[] = await response.json();

    // Filtruj tylko zmergowane PR
    const mergedPRs = pullRequests.filter((pr) => pr.merged_at !== null);

    // Sortuj po dacie merge, najnowsze na górze
    mergedPRs.sort((a, b) => new Date(b.merged_at).getTime() - new Date(a.merged_at).getTime());

    return mergedPRs;
  } catch (error) {
    console.error("Error fetching merged pull requests:", error);
    return [];
  }
}
