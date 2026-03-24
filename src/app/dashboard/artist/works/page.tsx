"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
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
  updatedAt: string;
}

export default function WorksListPage() {
  const router = useRouter();
  const { user, isLoading } = useAuth();
  const [works, setWorks] = useState<DashboardWork[]>([]);
  const [dataLoading, setDataLoading] = useState(true);

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login");
    }
  }, [isLoading, user, router]);

  useEffect(() => {
    if (!user || !user.isArtist) return;
    setDataLoading(true);
    fetch(`/api/dashboard/artist/works?userSlug=${encodeURIComponent(user.id)}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then((data: { works: DashboardWork[] }) => {
        setWorks(data.works ?? []);
      })
      .catch(() => {
        setWorks([]);
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

  if (!user.isArtist) {
    router.push("/dashboard/artist");
    return null;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Page header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Works Management</h1>
          <p className="mt-1 text-sm text-gray-500">
            作品の一覧と管理
          </p>
        </div>
        <Link
          href="/dashboard/artist/works/new"
          className="px-5 py-2.5 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          新規作品を作成
        </Link>
      </div>

      {works.length === 0 ? (
        /* Empty state */
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-10 text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-indigo-100 flex items-center justify-center">
            <svg className="w-8 h-8 text-indigo-500" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">まだ作品がありません</h2>
          <p className="text-sm text-gray-500 mb-6">最初の作品を作成しましょう</p>
          <Link
            href="/dashboard/artist/works/new"
            className="inline-flex px-5 py-2.5 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors"
          >
            新規作品を作成
          </Link>
        </div>
      ) : (
        /* Works table */
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Updated</th>
                <th className="text-right px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {works.map((work) => (
                <tr key={work.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <span className="text-sm font-medium text-gray-900">{work.title}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex text-xs font-medium px-2.5 py-1 rounded-full ${statusStyles[work.status] ?? "bg-gray-100 text-gray-600"}`}>
                      {statusLabels[work.status] ?? work.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-500">{work.updatedAt}</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-3">
                      <Link
                        href={`/dashboard/artist/works/${work.id}/edit`}
                        className="text-sm font-medium text-indigo-600 hover:text-indigo-800 transition-colors"
                      >
                        Edit
                      </Link>
                      {work.status === "public" && (
                        <Link
                          href={`/works/${work.slug}`}
                          className="text-sm font-medium text-gray-500 hover:text-gray-700 transition-colors"
                        >
                          View
                        </Link>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
