"use client";

import { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../lib/firebase";

export default function EntryForm({ onAddAction }: { onAddAction: () => void }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (!user) return;

    try {
      await addDoc(collection(db, "entries"), {
        uid: user.uid,
        title,
        content,
        createdAt: serverTimestamp(),
      });
      setTitle("");
      setContent("");
      onAddAction(); // callback to refresh entries list
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">New Journal Entry</h2>

      <div className="mb-4">
        <label className="block mb-1 font-medium">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border px-3 py-2 rounded"
          placeholder="Give your entry a title"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-medium">Content</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full border px-3 py-2 rounded h-32"
          placeholder="Write your thoughts here..."
          required
        />
      </div>

      <div className="flex justify-between">
        <button
          type="button"
          onClick={() => onAddAction()}
          className="border px-4 py-2 rounded"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-900"
        >
          Save Entry
        </button>
      </div>
    </form>
  );
}
