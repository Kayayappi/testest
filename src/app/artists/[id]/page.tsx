import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { artists, getArtistById, getArtworksByArtistId } from "@/lib/mock";
import TagPills from "@/components/TagPills";
import ArtworkCard from "@/components/ArtworkCard";

export function generateStaticParams() {
  return artists.map((a) => ({ id: a.id }));
}

export async function generateMetadata({ params }: ArtistDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const artist = getArtistById(id);
  return {
    title: artist ? `Artist: ${artist.name} | Artli` : "Artist Not Found | Artli",
  };
}

interface ArtistDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function ArtistDetailPage({ params }: ArtistDetailPageProps) {
  const { id } = await params;
  const artist = getArtistById(id);

  if (!artist) {
    notFound();
  }

  const allWorks = getArtworksByArtistId(artist.id);
  const featuredWorks = allWorks.filter((w) =>
    artist.featuredArtworkIds.includes(w.id)
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10" data-page="artist-detail" data-id={id}>
      {/* Profile */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-10">
        <div className="flex flex-col sm:flex-row items-start gap-6">
          <Image
            src={artist.iconUrl}
            alt={artist.name}
            width={96}
            height={96}
            className="rounded-full flex-shrink-0"
            unoptimized
          />
          <div className="space-y-3 min-w-0">
            <h1 className="text-3xl font-bold text-gray-900">Artist: {artist.name}</h1>
            <p className="text-gray-600 leading-relaxed">{artist.bio}</p>
            <TagPills tags={artist.styleTags} />
            {artist.links.length > 0 && (
              <div className="flex flex-wrap gap-3">
                {artist.links.map((link) => (
                  <a
                    key={link}
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-indigo-600 hover:text-indigo-700 hover:underline"
                  >
                    {new URL(link).hostname}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Policy Summary */}
      <section className="mb-10">
        <div className="bg-indigo-50 rounded-xl p-5 border border-indigo-100">
          <h2 className="text-sm font-semibold text-indigo-900 mb-2">Policy Summary</h2>
          <p className="text-sm text-indigo-800">{artist.policySummary}</p>
        </div>
      </section>

      {/* Featured Works */}
      {featuredWorks.length > 0 && (
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Works</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredWorks.map((artwork) => (
              <ArtworkCard key={artwork.id} artwork={artwork} />
            ))}
          </div>
        </section>
      )}

      {/* All Works */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">All Works</h2>
        {allWorks.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {allWorks.map((artwork) => (
              <ArtworkCard key={artwork.id} artwork={artwork} />
            ))}
          </div>
        ) : (
          <p className="text-gray-400">No works yet.</p>
        )}
      </section>

      {/* Back link */}
      <div className="mt-10">
        <Link
          href="/artists"
          className="text-sm text-indigo-600 hover:text-indigo-700 font-medium"
        >
          &larr; Back to Artists
        </Link>
      </div>
    </div>
  );
}
