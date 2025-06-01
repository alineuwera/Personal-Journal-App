// components/EntryList.tsx
"use client";

type Entry = {
  id: string;
  title: string;
  body: string;
  createdAt: any;
};

export default function EntryList({
  entries,
  onDeleteAction,
}: {
  entries: Entry[];
  onDeleteAction: (id: string) => void;
}) {
  if (entries.length === 0)
    return <p className="text-gray-600">No journal entries yet.</p>;

  return (
    <ul className="space-y-4">
      {entries.map(({ id, title, body, createdAt }) => (
        <li
          key={id}
          className="bg-gray-50 rounded-md p-4 shadow-sm flex justify-between items-start"
        >
          <div className="max-w-[85%]">
            <h3 className="font-semibold text-lg text-gray-800">{title}</h3>
            <p className="text-sm text-gray-400 mb-2">
              {new Date(createdAt?.seconds * 1000).toLocaleString()}
            </p>
            <p className="text-gray-700 whitespace-pre-wrap">{body}</p>
          </div>
          <button
            onClick={() => onDeleteAction(id)}
            className="text-red-600 hover:text-red-800 font-bold ml-4 self-start"
            aria-label={`Delete entry ${title}`}
          >
            &times;
          </button>
        </li>
      ))}
    </ul>
  );
}
