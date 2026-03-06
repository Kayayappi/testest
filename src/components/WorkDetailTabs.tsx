"use client";

import { useState } from "react";
import { Artwork } from "@/lib/mock";
import { licenseValueText, trainingTypeText } from "@/lib/license";
import AuthorBadge from "./AuthorBadge";
import LicenseBadges from "./LicenseBadges";
import TagPills from "./TagPills";
import WorkActions from "./WorkActions";

interface WorkDetailTabsProps {
  artwork: Artwork;
}

export default function WorkDetailTabs({ artwork }: WorkDetailTabsProps) {
  const [activeTab, setActiveTab] = useState<"overview" | "license">("overview");

  const priceJpy = artwork.priceJpy;

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
            artistId={artwork.artistId}
            artistName={artwork.artistName}
            size="md"
          />

          <p className="text-gray-600 leading-relaxed">{artwork.description}</p>

          <TagPills tags={artwork.tags} />

          <WorkActions likes={artwork.likes} comments={artwork.comments} />

          <button
            onClick={() => setActiveTab("license")}
            className="text-sm text-indigo-600 hover:text-indigo-700 font-medium"
          >
            ライセンス詳細を確認 &rarr;
          </button>
        </div>
      )}

      {/* License Tab */}
      {activeTab === "license" && (
        <div className="space-y-5">
          <LicenseBadges terms={artwork.licenseTerms} />

          <div className="bg-gray-50 rounded-xl p-5 space-y-4 border border-gray-200">
            <h3 className="text-sm font-semibold text-gray-900">許諾条件</h3>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <span className="text-gray-500">商用利用:</span>{" "}
                <span className="font-medium">{licenseValueText(artwork.licenseTerms.commercial)}</span>
              </div>
              <div>
                <span className="text-gray-500">成人向け:</span>{" "}
                <span className="font-medium">{licenseValueText(artwork.licenseTerms.adult)}</span>
              </div>
              <div>
                <span className="text-gray-500">学習タイプ:</span>{" "}
                <span className="font-medium">{trainingTypeText(artwork.licenseTerms.trainingType)}</span>
              </div>
              <div>
                <span className="text-gray-500">再配布:</span>{" "}
                <span className="font-medium">{licenseValueText(artwork.licenseTerms.redistribution)}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <p className="text-3xl font-bold text-gray-900">
              &yen;{priceJpy.toLocaleString()}
            </p>
            <button
              className="px-6 py-3 rounded-lg bg-indigo-600 text-white font-semibold opacity-50 cursor-not-allowed"
              disabled
              title="Coming soon"
            >
              Acquire (prototype)
            </button>
          </div>

          <p className="text-xs text-gray-400">
            ※ 取得機能は今後実装予定です
          </p>
        </div>
      )}
    </div>
  );
}
