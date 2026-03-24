"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/lib/auth";
import WorkForm from "@/components/WorkForm";

export default function NewWorkPage() {
  const router = useRouter();
  const { user, isLoading } = useAuth();
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

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <div className="animate-pulse text-gray-400">Loading...</div>
      </div>
    );
  }

  if (!user || !user.isArtist) return null;

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
      const res = await fetch("/api/dashboard/artist/works", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userSlug: user.id,
          title: data.title,
          description: data.description,
          coverImageUrl: data.coverImageUrl,
          tags: data.tags,
          license: data.license,
        }),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to create work");
      }
      router.push("/dashboard/artist/works");
    } catch (error) {
      alert(error instanceof Error ? error.message : "Failed to create work");
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
        <h1 className="text-3xl font-bold text-gray-900 mt-2">Create New Work</h1>
        <p className="mt-1 text-sm text-gray-500">
          新規作成した作品は下書きとして保存されます。公開状態は作成後に編集画面から変更できます。
        </p>
      </div>

      <WorkForm
        mode="create"
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}
