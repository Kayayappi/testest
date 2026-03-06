import Link from "next/link";
import { getFeaturedArtworks, getFeaturedArtists } from "@/lib/mock";
import ArtworkCard from "@/components/ArtworkCard";
import ArtistCard from "@/components/ArtistCard";
import Sidebar from "@/components/Sidebar";
import { BRAND } from "@/lib/brand";

export default function HomePage() {
  const featuredWorks = getFeaturedArtworks(6);
  const featuredArtists = getFeaturedArtists(4);

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
            {BRAND.name}
          </h1>
          <p className="mt-4 text-lg sm:text-xl text-indigo-100 max-w-2xl mx-auto">
            アーティストの作品を探索し、お気に入りを見つけよう。
            <br className="hidden sm:block" />
            {BRAND.taglineJa}
          </p>
          <div className="mt-8 flex items-center justify-center gap-4">
            <Link
              href="/works"
              className="inline-flex items-center px-6 py-3 rounded-lg bg-white text-indigo-600 font-semibold shadow-lg hover:bg-indigo-50 transition-colors"
            >
              Browse Works
            </Link>
            <Link
              href="/artists"
              className="inline-flex items-center px-6 py-3 rounded-lg bg-white/10 text-white font-semibold border border-white/30 hover:bg-white/20 transition-colors"
            >
              Browse Artists
            </Link>
          </div>
        </div>
      </section>

      {/* Main content with sidebar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex gap-8">
        <Sidebar className="hidden lg:block flex-shrink-0" />
        <div className="flex-1 min-w-0">
          {/* Featured Works */}
          <section>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-gray-900">Featured Works</h2>
              <Link
                href="/works"
                className="text-sm font-medium text-indigo-600 hover:text-indigo-700"
              >
                View all &rarr;
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4">
              {featuredWorks.map((artwork) => (
                <ArtworkCard key={artwork.id} artwork={artwork} />
              ))}
            </div>
          </section>

          {/* Featured Artists */}
          <section className="mt-16">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-gray-900">
                Featured Artists
              </h2>
              <Link
                href="/artists"
                className="text-sm font-medium text-indigo-600 hover:text-indigo-700"
              >
                View all &rarr;
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {featuredArtists.map((artist) => (
                <ArtistCard key={artist.id} artist={artist} />
              ))}
            </div>
          </section>
        </div>
      </div>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          作品を探してみましょう
        </h2>
        <p className="text-gray-500 mb-8 max-w-lg mx-auto">
          アーティストの作品を探索し、お気に入りを見つけよう。
        </p>
        <div className="flex items-center justify-center gap-4">
          <Link
            href="/works"
            className="inline-flex items-center px-6 py-3 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-colors"
          >
            Browse Works
          </Link>
          <Link
            href="/artists"
            className="inline-flex items-center px-6 py-3 rounded-lg border border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 transition-colors"
          >
            Browse Artists
          </Link>
        </div>
      </section>
    </div>
  );
}
