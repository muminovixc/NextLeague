'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { registerUser } from '@/lib/api'; // Pretpostavljam da imaš ovu funkciju

export default function RegisterPage() {
  const [form, setForm] = useState({
    name: '',
    surname: '',
    birth_date: '',
    email: '',
    password: '',
    phone_number: ''
  });
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const data = await registerUser(form);
      console.log('Registration successful:', data);
      router.push('/login');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#031716] px-4">
      <div className="bg-[#032f30] p-8 rounded-lg w-full max-w-md shadow-lg">
        <h1 className="text-3xl font-bold text-white mb-6 text-center">Register</h1>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-[#6ba3be] mb-1">Name</label>
            <input
              type="text"
              name="name"
              className="w-full px-4 py-2 rounded-md bg-[#031716] text-white border border-[#0c969c]/30 focus:outline-none focus:border-[#0c969c]"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="block text-[#6ba3be] mb-1">Surname</label>
            <input
              type="text"
              name="surname"
              className="w-full px-4 py-2 rounded-md bg-[#031716] text-white border border-[#0c969c]/30 focus:outline-none focus:border-[#0c969c]"
              value={form.surname}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="block text-[#6ba3be] mb-1">Birth Date</label>
            <input
              type="date"
              name="birth_date"
              className="w-full px-4 py-2 rounded-md bg-[#031716] text-white border border-[#0c969c]/30 focus:outline-none focus:border-[#0c969c]"
              value={form.birth_date}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="block text-[#6ba3be] mb-1">Email</label>
            <input
              type="email"
              name="email"
              className="w-full px-4 py-2 rounded-md bg-[#031716] text-white border border-[#0c969c]/30 focus:outline-none focus:border-[#0c969c]"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="block text-[#6ba3be] mb-1">Password</label>
            <input
              type="password"
              name="password"
              className="w-full px-4 py-2 rounded-md bg-[#031716] text-white border border-[#0c969c]/30 focus:outline-none focus:border-[#0c969c]"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="block text-[#6ba3be] mb-1">Phone Number</label>
            <input
              type="tel"
              name="phone_number"
              className="w-full px-4 py-2 rounded-md bg-[#031716] text-white border border-[#0c969c]/30 focus:outline-none focus:border-[#0c969c]"
              value={form.phone_number}
              onChange={handleChange}
              required
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full bg-[#0c969c] hover:bg-[#0a7075] text-white py-2 rounded-md font-medium"
          >
            Register
          </button>
        </form>

        <p className="text-[#6ba3be] mt-4 text-center">
          Already have an account?{' '}
          <Link href="/login" className="text-[#0c969c] hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
