"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/lib/auth";

interface AcquisitionItem {
  id: string;
  workId: string;
  workTitle: string;
  workImageUrl: string;
  artistName: string;
  artistId: string;
  acquiredAt: string;
  licenseSummary: string;
  commercialAllowed: boolean;
  priceJpy: number;
}

interface DeveloperDashboardProfile {
  companyName: string;
  purpose: string;
}

export default function DeveloperDashboardPage() {
  const router = useRouter();
  const { user, isLoading } = useAuth();
  const [acqs, setAcqs] = useState<AcquisitionItem[]>([]);
  const [profile, setProfile] = useState<DeveloperDashboardProfile | null>(null);
  const [dataLoading, setDataLoading] = useState(true);

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login");
    }
  }, [isLoading, user, router]);

  useEffect(() => {
    if (!user || !user.isDeveloper) return;
    setDataLoading(true);
    fetch(`/api/dashboard/developer?userSlug=${encodeURIComponent(user.id)}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then((data: { acquisitions: AcquisitionItem[]; profile: DeveloperDashboardProfile | null }) => {
        setAcqs(data.acquisitions ?? []);
        setProfile(data.profile ?? null);
      })
      .catch(() => {
        setAcqs([]);
        setProfile(null);
      })
      .finally(() => setDataLoading(false));
  }, [user]);

  if (isLoading || (user?.isDeveloper && dataLoading)) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <div className="animate-pulse text-gray-400">Loading...</div>
      </div>
    );
  }

  if (!user) return null;

  // Not a developer — show empty state
  if (!user.isDeveloper) {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-10">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-blue-100 flex items-center justify-center">
            <svg className="w-8 h-8 text-blue-500" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            Developer tools are not enabled for this account yet.
          </h2>
          <p className="text-sm text-gray-500 mb-6 max-w-md mx-auto">
            デベロッパーツールを有効にすると、作品の取得・ライセンス管理、利用ログ、ダウンロードなどの機能が利用できます。
          </p>
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={() => alert("この機能はプロトタイプでは利用できません。デモアカウント dev@artli.dev でお試しください。")}
              className="px-5 py-2.5 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Enable Developer Tools
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
  const commercialAllowed = acqs.filter((a) => a.commercialAllowed).length;
  const consultRequired = acqs.filter((a) => !a.commercialAllowed).length;
  const recentAcqs = [...acqs].sort((a, b) => b.acquiredAt.localeCompare(a.acquiredAt)).slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Page header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Developer Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500">
          Welcome back, {profile?.companyName ?? user.displayName}
        </p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        <SummaryCard label="Acquired Works" value={acqs.length} color="indigo" />
        <SummaryCard label="Commercial Allowed" value={commercialAllowed} color="green" />
        <SummaryCard label="Consultation Required" value={consultRequired} color="yellow" />
        <SummaryCard label="Recent Acquisitions" value={recentAcqs.length} color="blue" />
      </div>

      {/* Acquisitions list */}
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Acquisition History</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {acqs.map((acq) => (
          <div key={acq.id} className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
            <div className="relative aspect-[4/3]">
              <Image
                src={acq.workImageUrl}
                alt={acq.workTitle}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              {acq.commercialAllowed ? (
                <span className="absolute top-3 right-3 text-xs font-medium px-2.5 py-1 rounded-full bg-green-100 text-green-700">
                  Commercial OK
                </span>
              ) : (
                <span className="absolute top-3 right-3 text-xs font-medium px-2.5 py-1 rounded-full bg-yellow-100 text-yellow-700">
                  Consult
                </span>
              )}
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-gray-900 mb-1">{acq.workTitle}</h3>
              <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
                <span>by</span>
                <Link
                  href={`/artists/${acq.artistId}`}
                  className="text-indigo-600 hover:text-indigo-700 font-medium"
                >
                  {acq.artistName}
                </Link>
              </div>
              <p className="text-xs text-gray-400 mb-2">Acquired: {acq.acquiredAt}</p>
              <p className="text-xs text-gray-600 bg-gray-50 rounded-lg px-2.5 py-1.5 mb-3">
                {acq.licenseSummary}
              </p>
              <div className="flex gap-2">
                <Link
                  href={`/works/${acq.workId}`}
                  className="flex-1 text-center text-xs font-medium text-indigo-600 border border-indigo-200 rounded-lg py-1.5 hover:bg-indigo-50 transition-colors"
                >
                  View Work
                </Link>
                <button
                  onClick={() => alert("Download — プロトタイプでは利用不可")}
                  className="flex-1 text-xs font-medium text-gray-600 border border-gray-200 rounded-lg py-1.5 hover:bg-gray-50 transition-colors"
                >
                  Download
                </button>
                <button
                  onClick={() => alert("Usage Log — プロトタイプでは利用不可")}
                  className="flex-1 text-xs font-medium text-gray-600 border border-gray-200 rounded-lg py-1.5 hover:bg-gray-50 transition-colors"
                >
                  Usage Log
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
    blue: "bg-blue-50 text-blue-700",
    indigo: "bg-indigo-50 text-indigo-700",
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
      <p className="text-sm text-gray-500 mb-1">{label}</p>
      <p className={`text-2xl font-bold ${colorMap[color] ?? "text-gray-900"}`}>{value.toLocaleString()}</p>
    </div>
  );
}
