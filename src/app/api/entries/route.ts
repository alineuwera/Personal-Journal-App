import { db } from "@/app/lib/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const uid = searchParams.get("uid");

  if (!uid) {
    return NextResponse.json({ error: "Missing uid" }, { status: 400 });
  }

  const q = query(collection(db, "entries"), where("uid", "==", uid));
  const querySnapshot = await getDocs(q);

  const entries = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
    createdAt: doc.data().createdAt?.toDate().toISOString() || null, // convert to string safely
  }));

  return NextResponse.json(entries);
}
