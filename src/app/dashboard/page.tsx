"use client";

import { useState, useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import EntryForm from "@/app/components/EntryForm";
import EntryList from "@/app/components/EntryList";
import { auth } from "../lib/firebase";

type Entry = {
  id: string;
  title: string;
  content: string;
  createdAt: string;
};

export default function DashboardPage() {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [userUid, setUserUid] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) setUserUid(user.uid);
      else window.location.href = "/login";
    });
    return () => unsubscribe();
  }, []);

  async function fetchEntries() {
    if (!userUid) return;
    const res = await fetch(`/api/entries?uid=${userUid}`);
    const data = await res.json();
    setEntries(data);
  }

  useEffect(() => {
    fetchEntries();
  }, [userUid]);

  // delete handler
    // delete handler with confirmation
  async function handleDelete(id: string) {
    const confirmDelete = window.confirm("Are you sure you want to delete this entry?");
    if (!confirmDelete) return;

    const res = await fetch(`/api/entries/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      fetchEntries();
    } else {
      alert("Failed to delete entry.");
    }
  }


  return (
    <div className="max-w-5xl mx-auto py-10 px-6">
      <div className="flex justify-between items-center mb-20 bg-white p-6 rounded shadow">
        <h1 className="text-3xl font-bold text-gray-800">Personal Journal</h1>
        <button
          onClick={() => signOut(auth)}
          className="border border-gray-300 px-4 py-2 rounded hover:bg-gray-50"
        >
          Sign Out
        </button>
      </div>

      {!showForm && (
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-700">My Journal</h2>
          <button
            onClick={() => setShowForm(true)}
            className="bg-gray-800 text-white flex items-center gap-2 px-4 py-2 rounded hover:bg-gray-900"
          >
            <span>➕</span> New Entry
          </button>
        </div>
      )}

      {showForm && (
        <div className="mb-8">
          <EntryForm
            onAddAction={() => {
              fetchEntries();
              setShowForm(false);
            }}
          />
        </div>
      )}

      {!showForm && (
        <div className="grid md:grid-cols-2 gap-6">
          {entries.map((entry) => (
            <EntryList
              key={entry.id}
              id={entry.id}
              title={entry.title}
              createdAt={entry.createdAt}
              content={entry.content}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}
