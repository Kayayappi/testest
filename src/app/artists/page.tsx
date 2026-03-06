"use client";

import { useState } from "react";
import { artists } from "@/lib/mock";
import ArtistCard from "@/components/ArtistCard";

const allStyleTags = Array.from(
  new Set(artists.flatMap((a) => a.styleTags))
).sort();

export default function ArtistsPage() {
  const [selectedTag, setSelectedTag] = useState<string>("All");
  const [search, setSearch] = useState("");

  const filtered = artists.filter((artist) => {
    if (selectedTag !== "All" && !artist.styleTags.includes(selectedTag)) return false;
    if (search) {
      const q = search.toLowerCase();
      if (
        !artist.name.toLowerCase().includes(q) &&
        !artist.bio.toLowerCase().includes(q) &&
        !artist.styleTags.some((t) => t.toLowerCase().includes(q))
      ) {
        return false;
      }
    }
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Artists</h1>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 mb-8 space-y-4">
        <input
          type="text"
          placeholder="Search artists..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        />

        <div>
          <label className="block text-xs font-medium text-gray-500 mb-2">Style Tag</label>
          <div className="flex flex-wrap gap-1.5">
            <button
              onClick={() => setSelectedTag("All")}
              className={`px-3 py-1.5 text-xs font-medium rounded-full border transition-colors ${
                selectedTag === "All"
                  ? "bg-indigo-600 text-white border-indigo-600"
                  : "bg-white text-gray-600 border-gray-300 hover:bg-gray-50"
              }`}
            >
              All
            </button>
            {allStyleTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-3 py-1.5 text-xs font-medium rounded-full border transition-colors ${
                  selectedTag === tag
                    ? "bg-indigo-600 text-white border-indigo-600"
                    : "bg-white text-gray-600 border-gray-300 hover:bg-gray-50"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>

      <p className="text-sm text-gray-500 mb-4">{filtered.length} artists found</p>

      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((artist) => (
            <ArtistCard key={artist.id} artist={artist} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-gray-400 text-lg">No artists found matching your criteria.</p>
        </div>
      )}
    </div>
  );
}
