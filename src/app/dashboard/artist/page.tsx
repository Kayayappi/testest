"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/lib/auth";

const statusStyles: Record<string, string> = {
  public: "bg-green-100 text-green-700",
  private: "bg-gray-100 text-gray-600",
  draft: "bg-yellow-100 text-yellow-700",
};

const statusLabels: Record<string, string> = {
  public: "Public",
  private: "Private",
  draft: "Draft",
};

interface DashboardWork {
  id: string;
  slug: string;
  title: string;
  imageUrl: string;
  status: string;
  likes: number;
  acquisitions: number;
  createdAt: string;
  licenseTerms: {
    commercial: string;
    adult: string;
    trainingType: string;
    redistribution: string;
  } | null;
}

interface ArtistDashboardProfile {
  displayName: string;
  bio: string;
  styleTags: string[];
  policySummary: string;
}

export default function ArtistDashboardPage() {
  const router = useRouter();
  const { user, isLoading } = useAuth();
  const [works, setWorks] = useState<DashboardWork[]>([]);
  const [profile, setProfile] = useState<ArtistDashboardProfile | null>(null);
  const [dataLoading, setDataLoading] = useState(true);

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login");
    }
  }, [isLoading, user, router]);

  useEffect(() => {
    if (!user || !user.isArtist) return;
    setDataLoading(true);
    fetch(`/api/dashboard/artist?userSlug=${encodeURIComponent(user.id)}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then((data: { works: DashboardWork[]; profile: ArtistDashboardProfile | null }) => {
        setWorks(data.works ?? []);
        setProfile(data.profile ?? null);
      })
      .catch(() => {
        setWorks([]);
        setProfile(null);
      })
      .finally(() => setDataLoading(false));
  }, [user]);

  if (isLoading || (user?.isArtist && dataLoading)) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <div className="animate-pulse text-gray-400">Loading...</div>
      </div>
    );
  }

  if (!user) return null;

  // Not an artist — show empty state
  if (!user.isArtist) {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-10">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-purple-100 flex items-center justify-center">
            <svg className="w-8 h-8 text-purple-500" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            Artist tools are not enabled for this account yet.
          </h2>
          <p className="text-sm text-gray-500 mb-6 max-w-md mx-auto">
            アーティストツールを有効にすると、作品の公開・管理、ライセンス設定、統計閲覧などの機能が利用できます。
          </p>
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={() => alert("この機能はプロトタイプでは利用できません。デモアカウント artist@artli.dev でお試しください。")}
              className="px-5 py-2.5 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Enable Artist Tools
            </button>
            <Link
              href="/"
              className="px-5 py-2.5 text-sm font-medium text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Full dashboard
  const publicWorks = works.filter((w) => w.status === "public");
  const draftPrivateWorks = works.filter((w) => w.status === "draft" || w.status === "private");
  const totalLikes = works.reduce((sum, w) => sum + w.likes, 0);
  const totalAcquisitions = works.reduce((sum, w) => sum + w.acquisitions, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Page header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Artist Dashboard</h1>
          <p className="mt-1 text-sm text-gray-500">
            Welcome back, {profile?.displayName ?? user.displayName}
          </p>
        </div>
        <button
          onClick={() => alert("この機能はプロトタイプでは利用できません。")}
          className="px-5 py-2.5 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          New Work
        </button>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        <SummaryCard label="Public Works" value={publicWorks.length} color="green" />
        <SummaryCard label="Drafts / Private" value={draftPrivateWorks.length} color="yellow" />
        <SummaryCard label="Total Likes" value={totalLikes} color="pink" />
        <SummaryCard label="Acquisitions" value={totalAcquisitions} color="indigo" />
      </div>

      {/* Works list */}
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Your Works</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {works.map((work) => (
          <div key={work.id} className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
            <div className="relative aspect-[4/3]">
              <Image
                src={work.imageUrl}
                alt={work.title}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <span className={`absolute top-3 right-3 text-xs font-medium px-2.5 py-1 rounded-full ${statusStyles[work.status]}`}>
                {statusLabels[work.status]}
              </span>
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-gray-900 mb-1">{work.title}</h3>
              <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
                <span className="flex items-center gap-1">
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                  {work.likes}
                </span>
                <span>{work.acquisitions} acquisitions</span>
                <span>{work.createdAt}</span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => alert("License settings — プロトタイプでは利用不可")}
                  className="flex-1 text-xs font-medium text-indigo-600 border border-indigo-200 rounded-lg py-1.5 hover:bg-indigo-50 transition-colors"
                >
                  License Settings
                </button>
                <button
                  onClick={() => alert("Edit work — プロトタイプでは利用不可")}
                  className="flex-1 text-xs font-medium text-gray-600 border border-gray-200 rounded-lg py-1.5 hover:bg-gray-50 transition-colors"
                >
                  Edit
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SummaryCard({ label, value, color }: { label: string; value: number; color: string }) {
  const colorMap: Record<string, string> = {
    green: "bg-green-50 text-green-700",
    yellow: "bg-yellow-50 text-yellow-700",
    pink: "bg-pink-50 text-pink-700",
    indigo: "bg-indigo-50 text-indigo-700",
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
      <p className="text-sm text-gray-500 mb-1">{label}</p>
      <p className={`text-2xl font-bold ${colorMap[color] ?? "text-gray-900"}`}>{value.toLocaleString()}</p>
    </div>
  );
}
