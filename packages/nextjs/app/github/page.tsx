import { getMergedPullRequests } from "~~/utils/github";

export default async function GithubPage() {
  const mergedPRs = await getMergedPullRequests(50);

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="flex flex-col items-center mb-8">
        <h1 className="text-4xl font-bold mb-2">Merged Pull Requests</h1>
        <p className="text-base-content/70">Community contributions to Batch #23</p>
      </div>

      <div className="space-y-4">
        {mergedPRs.map((pr) => {
          const mergedDate = new Date(pr.merged_at);
          const formattedDate = mergedDate.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          });
          const formattedTime = mergedDate.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
          });

          return (
            <div key={pr.number} className="card bg-base-200 shadow-lg hover:shadow-xl transition-shadow">
              <div className="card-body">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="badge badge-success">Merged</span>
                      <span className="text-sm opacity-60">#{pr.number}</span>
                    </div>
                    <h2 className="card-title text-lg mb-2">
                      <a
                        href={pr.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline"
                      >
                        {pr.title}
                      </a>
                    </h2>
                    <div className="flex items-center gap-2 text-sm opacity-70">
                      <img
                        src={pr.user.avatar_url}
                        alt={pr.user.login}
                        className="w-6 h-6 rounded-full"
                      />
                      <span>by {pr.user.login}</span>
                      <span>•</span>
                      <span>
                        {formattedDate} at {formattedTime}
                      </span>
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    <a
                      href={pr.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-sm btn-outline"
                    >
                      View on GitHub ↗
                    </a>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {mergedPRs.length === 0 && (
          <div className="text-center py-12">
            <p className="text-base-content/60">No merged pull requests found.</p>
          </div>
        )}
      </div>
    </div>
  );
}
