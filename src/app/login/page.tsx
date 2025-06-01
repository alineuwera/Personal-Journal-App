"use client";

import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useRouter } from "next/navigation";
import { auth } from "../lib/firebase";

export default function LoginPage() {
  const router = useRouter();

  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <button
        onClick={handleLogin}
        className="bg-green-600 text-white py-3 px-6 rounded-md text-lg"
      >
        Sign in with Google
      </button>
    </div>
  );
}
