"use client";

export default function EntryCard({
  title,
  content,
  createdAt,
}: {
  title: string;
  content: string;
  createdAt: string;
}) {
  return (
    <div className="border border-gray-200 p-5 rounded-lg bg-white shadow-sm">
      <h3 className="font-semibold text-lg mb-2 text-gray-800">{title}</h3>
      <p className="text-gray-600 mb-3">{content}</p>
      <p className="text-xs text-gray-400">
        {new Date(createdAt).toLocaleString()}
      </p>
    </div>
  );
}
