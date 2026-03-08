import type { Metadata } from "next";
import { getPublicWorks } from "@/lib/queries";
import WorksFilter from "@/components/WorksFilter";
import Sidebar from "@/components/Sidebar";

export const metadata: Metadata = {
  title: "Works | Artli",
};

export default async function WorksPage() {
  const works = await getPublicWorks();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex gap-8" data-page="works">
      <Sidebar className="hidden lg:block flex-shrink-0" />
      <div className="flex-1 min-w-0">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Works</h1>
        <p className="text-sm text-gray-500 mb-6">Browse works. Licensing details are available per work.</p>
        <WorksFilter artworks={works} />
      </div>
    </div>
  );
}
