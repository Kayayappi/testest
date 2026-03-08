import type { Metadata } from "next";
import { getAllArtists } from "@/lib/queries";
import ArtistsFilter from "@/components/ArtistsFilter";
import Sidebar from "@/components/Sidebar";

export const metadata: Metadata = {
  title: "Artists | Artli",
};

export default async function ArtistsPage() {
  const artists = await getAllArtists();

  const allStyleTags = Array.from(
    new Set(artists.flatMap((a) => a.styleTags))
  ).sort();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex gap-8" data-page="artists">
      <Sidebar className="hidden lg:block flex-shrink-0" />
      <div className="flex-1 min-w-0">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Artists</h1>
        <p className="text-sm text-gray-500 mb-6">Discover artists and explore their works and license terms.</p>
        <ArtistsFilter artists={artists} allStyleTags={allStyleTags} />
      </div>
    </div>
  );
}
