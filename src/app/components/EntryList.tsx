"use client";

export default function EntryList({
  id,
  title,
  content,
  createdAt,
  onDeleteAction,
}: {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  onDeleteAction: (id: string) => void;
}) {
  return (
    <div className="border border-gray-200 p-5 rounded-lg bg-white shadow-sm">
      <h3 className="font-semibold text-lg mb-2 text-gray-800">{title}</h3>
      <p className="text-xs text-gray-400 mb-2">
        {new Date(createdAt).toLocaleString()}
      </p>
      <p className="text-gray-600 mb-3">{content}</p>
      <button
        onClick={() => onDeleteAction(id)}
        className="text-sm text-gray-500 hover:text-red-500 hover:bg-red-50 border border-gray-200 px-3 py-2 rounded bg-white shadow-sm font-semibold" 
      >
      🗑️ Delete
      </button>
    </div>
  );
}
