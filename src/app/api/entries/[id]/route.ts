import { NextRequest, NextResponse } from "next/server";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "@/app/lib/firebase";

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const id = params.id;

  try {
    await deleteDoc(doc(db, "entries", id));
    return NextResponse.json({ message: "Entry deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Failed to delete entry:", error);
    return NextResponse.json({ message: "Failed to delete entry", error }, { status: 500 });
  }
}
