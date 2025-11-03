import { Star, Globe, Calendar } from "lucide-react";

export default function ShowMetadataSection({ tv }: { tv: any }) {
  return (
    <div className="bg-[#141414] p-6 rounded-2xl flex flex-wrap gap-6 items-center justify-between border border-gray-800 shadow-sm">
      <div className="flex items-center gap-2">
        <Calendar className="w-5 h-5 text-gray-400" />
        <span className="text-gray-300">
          {tv.first_air_date
            ? new Date(tv.first_air_date).toLocaleDateString()
            : "Unknown"}
        </span>
      </div>

      <div className="flex items-center gap-2">
        <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
        <span className="text-gray-300">
          {tv.vote_average ? tv.vote_average.toFixed(1) : "-"} / 10 (
          {tv.vote_count || 0} votes)
        </span>
      </div>

      <div className="flex items-center gap-2">
        <Globe className="w-5 h-5 text-gray-400" />
        <span className="text-gray-300 uppercase">
          {tv.original_language || "N/A"}
        </span>
      </div>

      <div className="text-gray-300">
        Status:{" "}
        <span className="text-white font-semibold">
          {tv.status || "Unknown"}
        </span>
      </div>

      {tv.episode_run_time?.length > 0 && (
        <div className="text-gray-300">
          Avg. Runtime: {tv.episode_run_time[0]} min
        </div>
      )}
    </div>
  );
}
