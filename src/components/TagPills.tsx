interface TagPillsProps {
  tags: string[];
  limit?: number;
}

export default function TagPills({ tags, limit }: TagPillsProps) {
  const displayed = limit ? tags.slice(0, limit) : tags;
  const remaining = limit && tags.length > limit ? tags.length - limit : 0;

  return (
    <div className="flex flex-wrap gap-1.5">
      {displayed.map((tag) => (
        <span
          key={tag}
          className="inline-flex items-center px-2 py-0.5 text-xs font-medium bg-gray-100 text-gray-700 rounded-full"
        >
          {tag}
        </span>
      ))}
      {remaining > 0 && (
        <span className="inline-flex items-center px-2 py-0.5 text-xs font-medium bg-gray-50 text-gray-500 rounded-full">
          +{remaining}
        </span>
      )}
    </div>
  );
}
