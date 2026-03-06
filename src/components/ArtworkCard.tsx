import Link from "next/link";
import Image from "next/image";
import { Artwork } from "@/lib/mock";
import AuthorBadge from "./AuthorBadge";

interface ArtworkCardProps {
  artwork: Artwork;
}

export default function ArtworkCard({ artwork }: ArtworkCardProps) {
  return (
    <Link href={`/works/${artwork.id}`} className="group block">
      <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
        <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
          <Image
            src={artwork.imageUrl}
            alt={artwork.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            unoptimized
          />
        </div>
        <div className="p-3 space-y-1.5">
          <AuthorBadge
            artistId={artwork.artistId}
            artistName={artwork.artistName}
            size="sm"
          />
          <h3 className="text-sm font-semibold text-gray-900 truncate group-hover:text-indigo-600 transition-colors">
            {artwork.title}
          </h3>
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-400 flex items-center gap-1">
              {"\u2661"} {artwork.likes}
            </span>
            <span className="text-xs text-gray-400">
              &yen;{artwork.priceJpy.toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
