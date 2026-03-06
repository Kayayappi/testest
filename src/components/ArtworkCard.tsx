"use client";

import Link from "next/link";
import Image from "next/image";
import { Artwork } from "@/lib/mock";
import AuthorBadge from "./AuthorBadge";

interface ArtworkCardProps {
  artwork: Artwork;
}

export default function ArtworkCard({ artwork }: ArtworkCardProps) {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
      {/* Thumbnail + Title link */}
      <Link href={`/works/${artwork.id}`} className="group block">
        <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
          <Image
            src={artwork.imageUrl}
            alt={artwork.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
            unoptimized
          />
        </div>
        <div className="px-3 pt-2">
          <h3 className="text-sm font-semibold text-gray-900 truncate group-hover:text-indigo-600 transition-colors">
            {artwork.title}
          </h3>
        </div>
      </Link>

      <div className="px-3 pb-3 pt-1.5 space-y-1.5">
        {/* Author Badge */}
        <AuthorBadge
          artistId={artwork.artistId}
          artistName={artwork.artistName}
          size="sm"
        />

        {/* License chip + Like count */}
        <div className="flex items-center justify-between">
          <Link
            href={`/works/${artwork.id}#license`}
            className="inline-flex items-center px-2 py-0.5 text-xs font-medium bg-gray-100 text-gray-500 rounded-full hover:bg-gray-200 transition-colors"
            onClick={(e) => e.stopPropagation()}
          >
            License
          </Link>
          <span className="text-xs text-gray-400 flex items-center gap-1">
            {"\u2661"} {artwork.likes}
          </span>
        </div>
      </div>
    </div>
  );
}
