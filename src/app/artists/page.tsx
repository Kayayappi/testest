import type { Metadata } from "next";
import { artists } from "@/lib/mock";
import ArtistsFilter from "@/components/ArtistsFilter";

export const metadata: Metadata = {
  title: "Artists | Artli",
};

const allStyleTags = Array.from(
  new Set(artists.flatMap((a) => a.styleTags))
).sort();

export default function ArtistsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10" data-page="artists">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Artists | Artli</h1>
      <ArtistsFilter artists={artists} allStyleTags={allStyleTags} />
    </div>
  );
}
