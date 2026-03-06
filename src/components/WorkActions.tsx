"use client";

import { useState } from "react";

interface WorkActionsProps {
  likes: number;
  comments: number;
}

export default function WorkActions({ likes, comments }: WorkActionsProps) {
  const [likeCount, setLikeCount] = useState(likes);
  const [liked, setLiked] = useState(false);

  const handleLike = () => {
    if (liked) {
      setLikeCount((c) => c - 1);
    } else {
      setLikeCount((c) => c + 1);
    }
    setLiked((prev) => !prev);
  };

  const handleShare = () => {
    alert("Share link copied! (prototype)");
  };

  return (
    <div className="flex items-center gap-6 text-sm text-gray-500">
      <button
        onClick={handleLike}
        className={`flex items-center gap-1.5 transition-colors ${
          liked ? "text-pink-500" : "hover:text-pink-500"
        }`}
      >
        <span>{liked ? "\u2665" : "\u2661"}</span>
        <span>Like</span>
        <span className="font-medium">{likeCount}</span>
      </button>

      <button
        onClick={handleShare}
        className="flex items-center gap-1.5 hover:text-indigo-500 transition-colors"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
        </svg>
        <span>Share</span>
      </button>

      <div className="flex items-center gap-1.5">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
        <span>Comments</span>
        <span className="font-medium">{comments}</span>
      </div>
    </div>
  );
}
