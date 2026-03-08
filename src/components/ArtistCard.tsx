import Link from "next/link";
import Image from "next/image";
import type { ArtistForCard } from "@/lib/types";
import TagPills from "./TagPills";

interface ArtistCardProps {
  artist: ArtistForCard;
}

export default function ArtistCard({ artist }: ArtistCardProps) {
  return (
    <Link href={`/artists/${artist.slug}`} className="group block">
      <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
        {artist.previewImageUrl && (
          <div className="relative aspect-[16/9] overflow-hidden bg-gray-100">
            <Image
              src={artist.previewImageUrl}
              alt={`${artist.displayName} featured work`}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              unoptimized
            />
          </div>
        )}
        <div className="p-4 space-y-2">
          <div className="flex items-center gap-3">
            <Image
              src={artist.iconUrl}
              alt={artist.displayName}
              width={40}
              height={40}
              className="rounded-full"
              unoptimized
            />
            <div className="min-w-0">
              <h3 className="text-sm font-semibold text-gray-900 truncate group-hover:text-indigo-600 transition-colors">
                {artist.displayName}
              </h3>
              <p className="text-xs text-gray-500 line-clamp-1">{artist.bio}</p>
            </div>
          </div>
          <TagPills tags={artist.styleTags} limit={3} />
        </div>
      </div>
    </Link>
  );
}
