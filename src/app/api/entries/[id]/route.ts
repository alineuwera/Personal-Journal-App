import { NextResponse } from "next/server";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "@/app/lib/firebase";

export async function DELETE(request: Request) {
  try {
    // Extract the entry id from the request URL
    const url = new URL(request.url);
    const id = url.pathname.split("/").pop();

    if (!id) {
      return NextResponse.json({ message: "Missing entry ID" }, { status: 400 });
    }

    // Delete the document from Firestore
    await deleteDoc(doc(db, "entries", id));

    return NextResponse.json({ message: "Entry deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting entry:", error);
    return NextResponse.json(
      { message: "Failed to delete entry", error },
      { status: 500 }
    );
  }
}
