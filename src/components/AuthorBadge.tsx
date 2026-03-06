import Link from "next/link";
import Image from "next/image";
import { getArtistById } from "@/lib/mock";

interface AuthorBadgeProps {
  artistId: string;
  artistName: string;
  size?: "sm" | "md";
}

export default function AuthorBadge({ artistId, artistName, size = "sm" }: AuthorBadgeProps) {
  const artist = getArtistById(artistId);
  const iconUrl = artist?.iconUrl ?? "";
  const iconSize = size === "sm" ? 24 : 32;

  return (
    <div className="flex items-center gap-1.5">
      {iconUrl && (
        <Image
          src={iconUrl}
          alt={artistName}
          width={iconSize}
          height={iconSize}
          className="rounded-full flex-shrink-0"
          unoptimized
        />
      )}
      <Link
        href={`/artists/${artistId}`}
        className="text-xs text-gray-600 hover:text-indigo-600 transition-colors truncate"
      >
        {artistName}
      </Link>
    </div>
  );
}
