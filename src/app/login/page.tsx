"use client";

import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,

} from "firebase/auth";
import { useRouter } from "next/navigation";
import { auth } from "../lib/firebase";
import { useState } from "react";

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
  const handleEmailLogin = async (e:any) => {
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
    <div className="min-h-screen flex flex-col items-center justify-center space-y-6 p-6">
    

      <div>
        <h2 className="font-bold text-2xl mb-3 ">Sign in</h2>
        <p>Enter your email and password to access your Journal.</p>
      </div>

      {/* Email/Password Form */}
      <form className="flex flex-col space-y-4 w-full max-w-sm">
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

        {/* Error Message */}
        {error && <p className="text-red-500">{error}</p>}

        {/* Login Button */}
        <button
          onClick={handleEmailLogin}
          className="bg-black text-white py-2 px-6 rounded-md "
        >
          Sign in
        </button>

          {/* Google Sign-In */}
      <button
        onClick={handleGoogleLogin}
        className="bg-black text-white py-3 px-6 rounded-md text-lg"
      >
        Sign in with Google
      </button>

      </form>
    </div>
  );
}
