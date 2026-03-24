"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/lib/auth";
import WorkForm from "@/components/WorkForm";

interface WorkData {
  id: string;
  slug: string;
  title: string;
  description: string;
  coverImageUrl: string;
  status: string;
  tags: string[];
  license: {
    commercial: string;
    adult: string;
    trainingType: string;
    redistribution: string;
    priceJpy: number;
  } | null;
}

export default function EditWorkPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const { user, isLoading } = useAuth();
  const [work, setWork] = useState<WorkData | null>(null);
  const [dataLoading, setDataLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login");
    }
  }, [isLoading, user, router]);

  useEffect(() => {
    if (!isLoading && user && !user.isArtist) {
      router.push("/dashboard/artist");
    }
  }, [isLoading, user, router]);

  useEffect(() => {
    if (!user || !user.isArtist) return;
    setDataLoading(true);
    fetch(`/api/dashboard/artist/works/${id}?userSlug=${encodeURIComponent(user.id)}`)
      .then((res) => {
        if (res.status === 404) {
          setNotFound(true);
          return null;
        }
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then((data: WorkData | null) => {
        if (data) setWork(data);
      })
      .catch(() => {
        setNotFound(true);
      })
      .finally(() => setDataLoading(false));
  }, [user, id]);

  if (isLoading || (user?.isArtist && dataLoading)) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <div className="animate-pulse text-gray-400">Loading...</div>
      </div>
    );
  }

  if (!user || !user.isArtist) return null;

  if (notFound || !work) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-10">
          <h2 className="text-xl font-bold text-gray-900 mb-2">作品が見つかりません</h2>
          <p className="text-sm text-gray-500 mb-6">指定された作品は存在しないか、アクセス権がありません。</p>
          <Link
            href="/dashboard/artist/works"
            className="inline-flex px-5 py-2.5 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Back to Works
          </Link>
        </div>
      </div>
    );
  }

  const handleSubmit = async (data: {
    title: string;
    description: string;
    coverImageUrl: string;
    tags: string[];
    status: string;
    license: {
      commercial: string;
      adult: string;
      trainingType: string;
      redistribution: string;
      priceJpy: number;
    };
  }) => {
    setIsSubmitting(true);
    try {
      const res = await fetch(`/api/dashboard/artist/works/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userSlug: user.id,
          title: data.title,
          description: data.description,
          coverImageUrl: data.coverImageUrl,
          tags: data.tags,
          status: data.status,
          license: data.license,
        }),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to update work");
      }
      router.push("/dashboard/artist/works");
    } catch (error) {
      alert(error instanceof Error ? error.message : "Failed to update work");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <Link
          href="/dashboard/artist/works"
          className="text-sm text-indigo-600 hover:text-indigo-800 transition-colors"
        >
          &larr; Back to Works
        </Link>
        <h1 className="text-3xl font-bold text-gray-900 mt-2">Edit Work</h1>
        <p className="mt-1 text-sm text-gray-500">
          {work.title} の編集
        </p>
      </div>

      <WorkForm
        mode="edit"
        initialData={work}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}
