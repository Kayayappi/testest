"use client";

import { useState } from "react";
import type { WorkForCard } from "@/lib/types";
import { licenseValueText, trainingTypeText } from "@/lib/license";
import AuthorBadge from "./AuthorBadge";
import LicenseBadges from "./LicenseBadges";
import TagPills from "./TagPills";
import WorkActions from "./WorkActions";

interface WorkDetailTabsProps {
  artwork: WorkForCard;
}

export default function WorkDetailTabs({ artwork }: WorkDetailTabsProps) {
  const [activeTab, setActiveTab] = useState<"overview" | "license">(() => {
    if (typeof window !== "undefined" && window.location.hash === "#license") {
      return "license";
    }
    return "overview";
  });

  const license = artwork.license;

  return (
    <div>
      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-6">
        <button
          onClick={() => setActiveTab("overview")}
          className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-colors ${
            activeTab === "overview"
              ? "border-indigo-600 text-indigo-600"
              : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
          }`}
        >
          Overview
        </button>
        <button
          onClick={() => setActiveTab("license")}
          className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-colors ${
            activeTab === "license"
              ? "border-indigo-600 text-indigo-600"
              : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
          }`}
        >
          License
        </button>
      </div>

      {/* Overview Tab */}
      {activeTab === "overview" && (
        <div className="space-y-5">
          <AuthorBadge
            artistSlug={artwork.artistProfile.slug}
            artistName={artwork.artistProfile.displayName}
            artistIconUrl={artwork.artistProfile.iconUrl}
            size="md"
          />

          <p className="text-gray-600 leading-relaxed">{artwork.description}</p>

          <TagPills tags={artwork.tags.map((t) => t.name)} />

          <WorkActions likes={artwork.likesCount} comments={artwork.commentsCount} />

          <button
            onClick={() => setActiveTab("license")}
            className="text-sm text-indigo-600 hover:text-indigo-700 font-medium"
          >
            ライセンス詳細を確認 &rarr;
          </button>
        </div>
      )}

      {/* License Tab */}
      {activeTab === "license" && license && (
        <div className="space-y-5">
          <LicenseBadges terms={license} />

          <div className="bg-gray-50 rounded-xl p-5 space-y-4 border border-gray-200">
            <h3 className="text-sm font-semibold text-gray-900">許諾条件</h3>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <span className="text-gray-500">商用利用:</span>{" "}
                <span className="font-medium">{licenseValueText(license.commercial)}</span>
              </div>
              <div>
                <span className="text-gray-500">成人向け:</span>{" "}
                <span className="font-medium">{licenseValueText(license.adult)}</span>
              </div>
              <div>
                <span className="text-gray-500">学習タイプ:</span>{" "}
                <span className="font-medium">{trainingTypeText(license.trainingType)}</span>
              </div>
              <div>
                <span className="text-gray-500">再配布:</span>{" "}
                <span className="font-medium">{licenseValueText(license.redistribution)}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <p className="text-3xl font-bold text-gray-900">
              &yen;{license.priceJpy.toLocaleString()}
            </p>
            <button
              className="px-6 py-3 rounded-lg bg-indigo-600 text-white font-semibold opacity-50 cursor-not-allowed"
              disabled
              title="Coming soon"
            >
              Acquire license (prototype)
            </button>
          </div>

          <p className="text-xs text-gray-400">
            Terms shown here describe allowed usage.
          </p>
        </div>
      )}
    </div>
  );
}
