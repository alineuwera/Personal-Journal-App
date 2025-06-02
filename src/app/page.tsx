'use client';

import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  const handleGetStarted = () => {
    router.push('/login');
  };

  const handleLearnMore = () => {
    router.push('/about');
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <main className="flex flex-1 flex-col items-center justify-center p-6">
        <h1 className="text-4xl font-bold mb-6">
          Welcome to My Personal Journal
        </h1>
        <p className="text-lg text-gray-600">
          A simple space to capture your thoughts, memories, and reflections.
        </p>
        <div className="flex gap-4 mt-8">
          <button
            onClick={handleGetStarted}
            className="bg-black text-white px-6 py-2 font-semibold text-sm"
          >
            Get Started
          </button>
          <button
            onClick={handleLearnMore}
            className="border border-gray-300 px-6 py-2 font-semibold text-sm hover:bg-gray-300"
          >
            Learn More
          </button>
        </div>
      </main>

      <footer className="text-center text-sm text-gray-400 py-4">
        © 2025 Personal Journal App
      </footer>
    </div>
  );
}
