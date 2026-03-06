"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { artworks, getFeaturedArtists, getFeaturedArtworks } from "@/lib/mock";

interface SidebarProps {
  className?: string;
}

// Collect all tags and count frequency
function getTrendingTags(limit: number = 10): { tag: string; count: number }[] {
  const tagCount: Record<string, number> = {};
  for (const artwork of artworks) {
    for (const tag of artwork.tags) {
      tagCount[tag] = (tagCount[tag] || 0) + 1;
    }
  }
  return Object.entries(tagCount)
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, limit);
}

function SidebarContent() {
  const trendingTags = getTrendingTags(10);
  const featuredArtists = getFeaturedArtists(3);
  const newWorks = getFeaturedArtworks(3);

  return (
    <div className="space-y-6">
      {/* Trending Tags */}
      <div>
        <h3 className="text-xs font-semibold text-gray-900 uppercase tracking-wider mb-3">
          Trending Tags
        </h3>
        <div className="flex flex-wrap gap-1.5">
          {trendingTags.map(({ tag }) => (
            <Link
              key={tag}
              href={`/works?q=${encodeURIComponent(tag)}`}
              className="inline-flex items-center px-2.5 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded-full hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
            >
              {tag}
            </Link>
          ))}
        </div>
      </div>

      {/* Featured Artists */}
      <div>
        <h3 className="text-xs font-semibold text-gray-900 uppercase tracking-wider mb-3">
          Featured Artists
        </h3>
        <div className="space-y-3">
          {featuredArtists.map((artist) => (
            <Link
              key={artist.id}
              href={`/artists/${artist.id}`}
              className="flex items-center gap-2.5 group"
            >
              <Image
                src={artist.iconUrl}
                alt={artist.name}
                width={28}
                height={28}
                className="rounded-full flex-shrink-0"
                unoptimized
              />
              <span className="text-sm text-gray-700 group-hover:text-indigo-600 transition-colors truncate">
                {artist.name}
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* New Works */}
      <div>
        <h3 className="text-xs font-semibold text-gray-900 uppercase tracking-wider mb-3">
          New Works
        </h3>
        <div className="space-y-3">
          {newWorks.map((work) => (
            <Link
              key={work.id}
              href={`/works/${work.id}`}
              className="flex items-center gap-2.5 group"
            >
              <Image
                src={work.imageUrl}
                alt={work.title}
                width={40}
                height={30}
                className="rounded object-cover flex-shrink-0"
                unoptimized
              />
              <span className="text-sm text-gray-700 group-hover:text-indigo-600 transition-colors truncate">
                {work.title}
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* License Quick Filters */}
      <div>
        <h3 className="text-xs font-semibold text-gray-900 uppercase tracking-wider mb-3">
          License Quick Filters
        </h3>
        <div className="flex flex-wrap gap-1.5">
          <Link
            href="/works?commercial=allowed"
            className="px-2.5 py-1 text-xs font-medium bg-green-50 text-green-700 rounded-full border border-green-200 hover:bg-green-100 transition-colors"
          >
            商用OK
          </Link>
          <Link
            href="/works?adult=allowed"
            className="px-2.5 py-1 text-xs font-medium bg-purple-50 text-purple-700 rounded-full border border-purple-200 hover:bg-purple-100 transition-colors"
          >
            成人OK
          </Link>
          <Link
            href="/works?training=light"
            className="px-2.5 py-1 text-xs font-medium bg-blue-50 text-blue-700 rounded-full border border-blue-200 hover:bg-blue-100 transition-colors"
          >
            学習 Light
          </Link>
          <Link
            href="/works?training=standard"
            className="px-2.5 py-1 text-xs font-medium bg-orange-50 text-orange-700 rounded-full border border-orange-200 hover:bg-orange-100 transition-colors"
          >
            学習 Standard
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function Sidebar({ className }: SidebarProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      {/* Desktop sidebar */}
      <aside className={`w-64 ${className ?? ""}`}>
        <SidebarContent />
      </aside>

      {/* Mobile toggle button */}
      <div className="lg:hidden mb-4">
        <button
          onClick={() => setDrawerOpen(true)}
          className="inline-flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Explore
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Mobile drawer overlay */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/40"
            onClick={() => setDrawerOpen(false)}
          />
          {/* Drawer */}
          <div className="fixed inset-y-0 left-0 w-72 bg-white shadow-xl overflow-y-auto p-5">
            <div className="flex items-center justify-between mb-5">
              <span className="text-sm font-semibold text-gray-900">Explore</span>
              <button
                onClick={() => setDrawerOpen(false)}
                className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <SidebarContent />
          </div>
        </div>
      )}
    </>
  );
}
