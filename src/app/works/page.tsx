import type { Metadata } from "next";
import { artworks } from "@/lib/mock";
import WorksFilter from "@/components/WorksFilter";

export const metadata: Metadata = {
  title: "Works | Artli",
};

export default function WorksPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10" data-page="works">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Works | Artli</h1>
      <WorksFilter artworks={artworks} />
    </div>
  );
}
