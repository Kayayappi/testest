import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { artworks, getArtworkById, getArtworksByArtistId, LicenseValue, TrainingType } from "@/lib/mock";
import LicenseBadges from "@/components/LicenseBadges";
import TagPills from "@/components/TagPills";
import ArtworkCard from "@/components/ArtworkCard";

function licenseValueText(value: LicenseValue): string {
  switch (value) {
    case "allowed":
      return "許可";
    case "denied":
      return "不可";
    case "consult":
      return "要相談";
  }
}

function trainingTypeText(type: TrainingType): string {
  switch (type) {
    case "light":
      return "Light — 軽量学習のみ許可";
    case "standard":
      return "Standard — 標準的な学習利用可";
    case "strong":
      return "Strong — 大規模学習も許可";
  }
}

export function generateStaticParams() {
  return artworks.map((a) => ({ id: a.id }));
}

export async function generateMetadata({ params }: WorkDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const artwork = getArtworkById(id);
  return {
    title: artwork ? `Work: ${artwork.title} | Artli` : "Work Not Found | Artli",
  };
}

interface WorkDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function WorkDetailPage({ params }: WorkDetailPageProps) {
  const { id } = await params;
  const artwork = getArtworkById(id);

  if (!artwork) {
    notFound();
  }

  const moreFromArtist = getArtworksByArtistId(artwork.artistId)
    .filter((a) => a.id !== artwork.id)
    .slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10" data-page="work-detail" data-id={id}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Image */}
        <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-gray-100">
          <Image
            src={artwork.imageUrl}
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
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Work: {artwork.title}</h1>
            <Link
              href={`/artists/${artwork.artistId}`}
              className="mt-1 inline-block text-indigo-600 hover:text-indigo-700 font-medium"
            >
              {artwork.artistName}
            </Link>
          </div>

          <p className="text-gray-600 leading-relaxed">{artwork.description}</p>

          <TagPills tags={artwork.tags} />

          {/* License */}
          <div className="bg-gray-50 rounded-xl p-5 space-y-4 border border-gray-200">
            <h3 className="text-sm font-semibold text-gray-900">許諾条件</h3>
            <LicenseBadges terms={artwork.licenseTerms} />
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <span className="text-gray-500">商用利用:</span>{" "}
                <span className="font-medium">{licenseValueText(artwork.licenseTerms.commercial)}</span>
              </div>
              <div>
                <span className="text-gray-500">成人向け:</span>{" "}
                <span className="font-medium">{licenseValueText(artwork.licenseTerms.adult)}</span>
              </div>
              <div>
                <span className="text-gray-500">学習タイプ:</span>{" "}
                <span className="font-medium">{trainingTypeText(artwork.licenseTerms.trainingType)}</span>
              </div>
              <div>
                <span className="text-gray-500">再配布:</span>{" "}
                <span className="font-medium">{licenseValueText(artwork.licenseTerms.redistribution)}</span>
              </div>
            </div>
          </div>

          {/* Price & Acquire */}
          <div className="flex items-center gap-4">
            <p className="text-3xl font-bold text-gray-900">
              ¥{artwork.priceJpy.toLocaleString()}
            </p>
            <button
              className="px-6 py-3 rounded-lg bg-indigo-600 text-white font-semibold opacity-50 cursor-not-allowed"
              disabled
              title="Coming in Prompt 2"
            >
              Acquire (prototype)
            </button>
          </div>
        </div>
      </div>

      {/* More from this artist */}
      {moreFromArtist.length > 0 && (
        <section className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            More from {artwork.artistName}
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
