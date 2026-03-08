"use client";

import Link from "next/link";
import Image from "next/image";

interface AuthorBadgeProps {
  artistSlug: string;
  artistName: string;
  artistIconUrl?: string;
  size?: "sm" | "md";
}

export default function AuthorBadge({ artistSlug, artistName, artistIconUrl, size = "sm" }: AuthorBadgeProps) {
  const iconUrl = artistIconUrl ?? "";
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
        href={`/artists/${artistSlug}`}
        className="text-xs text-gray-600 hover:text-indigo-600 transition-colors truncate"
        onClick={(e) => e.stopPropagation()}
      >
        {artistName}
      </Link>
    </div>
  );
}
