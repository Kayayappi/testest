import Link from "next/link";
import Image from "next/image";
import { Artist, getArtworksByArtistId } from "@/lib/mock";
import TagPills from "./TagPills";

interface ArtistCardProps {
  artist: Artist;
}

export default function ArtistCard({ artist }: ArtistCardProps) {
  const works = getArtworksByArtistId(artist.id);
  const previewWork = works[0];

  return (
    <Link href={`/artists/${artist.id}`} className="group block">
      <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
        {previewWork && (
          <div className="relative aspect-[16/9] overflow-hidden bg-gray-100">
            <Image
              src={previewWork.imageUrl}
              alt={`${artist.name} featured work`}
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
              alt={artist.name}
              width={40}
              height={40}
              className="rounded-full"
              unoptimized
            />
            <div className="min-w-0">
              <h3 className="text-sm font-semibold text-gray-900 truncate group-hover:text-indigo-600 transition-colors">
                {artist.name}
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
