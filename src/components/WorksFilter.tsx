"use client";

import { useState } from "react";
import { Artwork } from "@/lib/mock";
import ArtworkCard from "@/components/ArtworkCard";

const commercialOptions = ["All", "Allowed", "Denied", "Consult"] as const;
const adultOptions = ["All", "Allowed", "Denied", "Consult"] as const;
const trainingOptions = ["All", "Light", "Standard", "Strong"] as const;
const sortOptions = ["New", "Popular"] as const;

interface WorksFilterProps {
  artworks: Artwork[];
}

export default function WorksFilter({ artworks }: WorksFilterProps) {
  const [commercial, setCommercial] = useState<string>("All");
  const [adult, setAdult] = useState<string>("All");
  const [training, setTraining] = useState<string>("All");
  const [sort, setSort] = useState<string>("New");
  const [search, setSearch] = useState("");

  const filtered = artworks.filter((artwork) => {
    if (commercial !== "All" && artwork.licenseTerms.commercial !== commercial.toLowerCase()) return false;
    if (adult !== "All" && artwork.licenseTerms.adult !== adult.toLowerCase()) return false;
    if (training !== "All" && artwork.licenseTerms.trainingType !== training.toLowerCase()) return false;
    if (search) {
      const q = search.toLowerCase();
      if (
        !artwork.title.toLowerCase().includes(q) &&
        !artwork.artistName.toLowerCase().includes(q) &&
        !artwork.tags.some((t) => t.toLowerCase().includes(q))
      ) {
        return false;
      }
    }
    return true;
  });

  return (
    <>
      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 mb-8 space-y-4">
        <p className="text-xs text-gray-400">License Filters — 用途別に作品を絞り込めます</p>
        <div>
          <input
            type="text"
            placeholder="Search by title, artist, or tag..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">用途: 商用</label>
            <div className="flex flex-wrap gap-1">
              {commercialOptions.map((opt) => (
                <button
                  key={opt}
                  onClick={() => setCommercial(opt)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-full border transition-colors ${
                    commercial === opt
                      ? "bg-indigo-600 text-white border-indigo-600"
                      : "bg-white text-gray-600 border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">用途: 成人向け</label>
            <div className="flex flex-wrap gap-1">
              {adultOptions.map((opt) => (
                <button
                  key={opt}
                  onClick={() => setAdult(opt)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-full border transition-colors ${
                    adult === opt
                      ? "bg-indigo-600 text-white border-indigo-600"
                      : "bg-white text-gray-600 border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">学習許諾</label>
            <div className="flex flex-wrap gap-1">
              {trainingOptions.map((opt) => (
                <button
                  key={opt}
                  onClick={() => setTraining(opt)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-full border transition-colors ${
                    training === opt
                      ? "bg-indigo-600 text-white border-indigo-600"
                      : "bg-white text-gray-600 border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">並び順</label>
            <div className="flex flex-wrap gap-1">
              {sortOptions.map((opt) => (
                <button
                  key={opt}
                  onClick={() => setSort(opt)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-full border transition-colors ${
                    sort === opt
                      ? "bg-indigo-600 text-white border-indigo-600"
                      : "bg-white text-gray-600 border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <p className="text-sm text-gray-500 mb-4">{filtered.length} works found</p>

      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((artwork) => (
            <ArtworkCard key={artwork.id} artwork={artwork} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-gray-400 text-lg">No works found matching your criteria.</p>
        </div>
      )}
    </>
  );
}
