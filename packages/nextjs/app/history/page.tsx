import { getCheckIns } from "~~/services/graph/client";
import { Address } from "@scaffold-ui/components";

export default async function HistoryPage() {
  const checkIns = await getCheckIns(100);

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="flex flex-col items-center mb-8">
        <h1 className="text-4xl font-bold mb-2">Batch #23 History</h1>
        <p className="text-base-content/70">Timeline of builder check-ins</p>
      </div>

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-base-300"></div>

        {/* Check-in items */}
        <div className="space-y-8">
          {checkIns.map((checkIn, index) => {
            const date = new Date(parseInt(checkIn.blockTimestamp) * 1000);
            const formattedDate = date.toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            });
            const formattedTime = date.toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
            });

            return (
              <div key={checkIn.id} className="relative pl-20">
                {/* Timeline dot */}
                <div className="absolute left-6 top-2 w-5 h-5 bg-primary rounded-full border-4 border-base-100 z-10"></div>

                {/* Content card */}
                <div className="card bg-base-200 shadow-lg hover:shadow-xl transition-shadow">
                  <div className="card-body p-4">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                      <div className="flex items-center gap-3">
                        <div className="badge badge-primary badge-sm">Check-in</div>
                        <Address address={checkIn.builder.address} />
                      </div>
                      <div className="text-sm text-base-content/60">
                        <span className="font-medium">{formattedDate}</span>
                        <span className="ml-2">{formattedTime}</span>
                      </div>
                    </div>
                    <div className="text-xs mt-2 opacity-60">
                      <a
                        href={`https://arbiscan.io/tx/${checkIn.transactionHash}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline"
                      >
                        View transaction ↗
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {checkIns.length === 0 && (
          <div className="text-center py-12">
            <p className="text-base-content/60">No check-ins found yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
