'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { loginUser } from '@/lib/api';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const data = await loginUser(email, password);
      console.log('Login successful:', data);

      // npr. redirectuj na dashboard ili home
      router.push('/homepage');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#031716] px-4">
      <div className="bg-[#032f30] p-8 rounded-lg w-full max-w-md shadow-lg">
        <h1 className="text-3xl font-bold text-white mb-6 text-center">Login</h1>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-[#6ba3be] mb-1">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 rounded-md bg-[#031716] text-white border border-[#0c969c]/30 focus:outline-none focus:border-[#0c969c]"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-[#6ba3be] mb-1">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 rounded-md bg-[#031716] text-white border border-[#0c969c]/30 focus:outline-none focus:border-[#0c969c]"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && (
            <p className="text-red-500 text-sm">{error}</p>
          )}
          <button
            type="submit"
            className="w-full bg-[#0c969c] hover:bg-[#0a7075] text-white py-2 rounded-md font-medium"
          >
            Log In
          </button>
        </form>

        <p className="text-[#6ba3be] mt-4 text-center">
          Don't have an account?{' '}
          <Link href="/register" className="text-[#0c969c] hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
