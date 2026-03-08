import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { getAllWorkSlugs, getWorkBySlug, getWorksByArtistSlug } from "@/lib/queries";
import ArtworkCard from "@/components/ArtworkCard";
import WorkDetailTabs from "@/components/WorkDetailTabs";

export async function generateStaticParams() {
  const slugs = await getAllWorkSlugs();
  return slugs.map((slug) => ({ id: slug }));
}

export async function generateMetadata({ params }: WorkDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const artwork = await getWorkBySlug(id);
  return {
    title: artwork ? `Work: ${artwork.title} | Artli` : "Work Not Found | Artli",
  };
}

interface WorkDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function WorkDetailPage({ params }: WorkDetailPageProps) {
  const { id } = await params;
  const artwork = await getWorkBySlug(id);

  if (!artwork) {
    notFound();
  }

  const moreFromArtist = (await getWorksByArtistSlug(artwork.artistProfile.slug, { publicOnly: true }))
    .filter((a) => a.id !== artwork.id)
    .slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10" data-page="work-detail" data-id={id}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Image */}
        <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-gray-100">
          <Image
            src={artwork.coverImageUrl}
            alt={artwork.title}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
            unoptimized
          />
        </div>

        {/* Info */}
        <div className="space-y-6">
          <h1 className="text-3xl font-bold text-gray-900">{artwork.title}</h1>
          <WorkDetailTabs artwork={artwork} />
        </div>
      </div>

      {/* More from this artist */}
      {moreFromArtist.length > 0 && (
        <section className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            More from {artwork.artistProfile.displayName}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {moreFromArtist.map((a) => (
              <ArtworkCard key={a.id} artwork={a} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
