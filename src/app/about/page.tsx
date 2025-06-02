'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';


export default function About() {
    const router = useRouter();
     const handleGetStarted = () => {
    router.push('/login');
  };
    
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      
     <div className="flex justify-around items-center mb-20 bg-white p-6 rounded shadow fixed top-0 left-0 right-0 z-10">
        <h1 className="text-3xl font-bold text-gray-800">Personal Journal</h1>
        <button
        onClick={handleGetStarted}
          className="border border-gray-00 px-4 py-2 rounded text-white bg-black hover:bg-gray-800 transition duration-200"
        >
          Sign in
        </button>
      </div>

      
      <main className="flex-grow flex flex-col items-center text-center px-4 py-12 mt-20">
        <h2 className="text-4xl font-semibold mb-4">About Personal Journal</h2>
        <p className="mb-8  text-lg text-gray-400">
          A private space for your thoughts, memories, and reflections.
        </p>

        
        <div className="flex flex-col md:flex-row justify-center gap-6 mb-8">
          {[
            {
              emoji: '✍️',
              title: 'Write',
              desc: 'Capture your thoughts, ideas, and memories in a clean interface.',
            },
            {
              emoji: '📖',
              title: 'Reflect',
              desc: 'Review past entries to see how you’ve grown and changed over time.',
            },
            {
              emoji: '🔒',
              title: 'Private',
              desc: 'Your entries are private and secure, accessible only to you.',
            },
          ].map(({ emoji, title, desc }, i) => (
            <div
              key={i}
              className="bg-white p-6 border border-gray-100 rounded-lg shadow-sm w-72"
            >
              <p className="text-3xl mb-2">{emoji}</p>
              <h3 className="text-xl font-semibold mb-1">{title}</h3>
              <p className="text-sm  text-gray-500">{desc}</p>
            </div>
          ))}
        </div>

        
        <Link href="/login">
          <button className="px-7 py-2 bg-black text-white rounded ">
            Start Journaling
          </button>
        </Link>
      </main>

      
      <footer className="text-center text-sm  text-gray-400 py-4  mt-auto ">
        © 2025 Personal Journal App
      </footer>
    </div>
  );
}