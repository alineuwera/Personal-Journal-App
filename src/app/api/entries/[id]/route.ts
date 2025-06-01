// pages/api/entries/[id].ts
import type { NextApiRequest, NextApiResponse } from "next";
import admin from "firebase-admin";

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.applicationDefault(),
  });
}

const db = admin.firestore();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { id },
    method,
  } = req;

  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: "Unauthorized" });
  const token = authHeader.split(" ")[1];

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    const uid = decodedToken.uid;

    if (method === "DELETE") {
      const docRef = db.collection("entries").doc(id as string);
      const docSnap = await docRef.get();

      if (!docSnap.exists) return res.status(404).json({ error: "Entry not found" });

      if (docSnap.data()?.uid !== uid) return res.status(403).json({ error: "Forbidden" });

      await docRef.delete();

      return res.status(204).end();
    }

    res.setHeader("Allow", ["DELETE"]);
    res.status(405).end(`Method ${method} Not Allowed`);
  } catch (error) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
}
