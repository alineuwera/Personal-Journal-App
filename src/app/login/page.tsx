"use client";

import { GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { auth } from "../lib/firebase";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Google Sign-In
  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      router.push("/dashboard");
    } catch (err) {
      console.error(err);
      setError("Google sign-in failed.");
    }
  };

  // Email/Password Sign-In
  const handleEmailLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/dashboard");
    } catch (err) {
      console.error(err);
      setError("Invalid email or password.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center space-y-6 p-6 bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md space-y-6">
        <div>
          <h2 className="font-bold text-2xl mb-3 text-center">Sign in</h2>
          <p className="text-gray-500">
            Enter your email and password to access your Journal.
          </p>
        </div>

        <form onSubmit={handleEmailLogin} className="flex flex-col space-y-4">
          <input
            type="email"
            placeholder="your.email@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="border border-gray-300 p-3 rounded"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="border border-gray-300 p-3 rounded"
          />

          {error && <p className="text-red-500">{error}</p>}

          <button
            type="submit"
            className="bg-black text-white py-2 px-6 rounded-md"
          >
            Sign in
          </button>
        </form>

        <button
          onClick={handleGoogleLogin}
          className="bg-green-400 text-white py-3 px-6 rounded-md text-lg w-full"
        >
          Sign in with Google
        </button>
      </div>
    </div>
  );
}
