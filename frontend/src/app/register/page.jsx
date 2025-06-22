'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { registerUser } from '../../lib/auth'; 

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
  <div className="w-full max-w-md bg-[#032f30]/90 backdrop-blur-md p-10 rounded-2xl shadow-2xl border border-[#0c969c]/10">
    <h1 className="text-4xl font-bold text-white text-center mb-8">Create Account</h1>

    <form className="space-y-6" onSubmit={handleSubmit}>
      {[
        { label: 'Name', name: 'name', type: 'text', autoComplete: 'given-name' },
        { label: 'Surname', name: 'surname', type: 'text', autoComplete: 'family-name' },
        { label: 'Birth Date', name: 'birth_date', type: 'date', autoComplete: 'bday' },
        { label: 'Email', name: 'email', type: 'email', autoComplete: 'email' },
        { label: 'Password', name: 'password', type: 'password', autoComplete: 'new-password' },
        { label: 'Phone Number', name: 'phone_number', type: 'tel', autoComplete: 'tel' },
      ].map((field) => (
        <div key={field.name}>
          <label htmlFor={field.name} className="block text-sm text-[#6ba3be] mb-2">
            {field.label}
          </label>
          <input
            id={field.name}
            name={field.name}
            type={field.type}
            autoComplete={field.autoComplete}
            value={form[field.name]}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-[#031716] border border-[#0c969c]/30 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0c969c] transition"
          />
        </div>
      ))}

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <button
        type="submit"
        className="w-full py-3 bg-[#0c969c] text-white rounded-lg font-semibold hover:bg-[#0a7075] transition-all duration-200 shadow-md hover:scale-[1.02]"
      >
        Register
      </button>
    </form>

    <p className="text-[#6ba3be] text-center text-sm mt-6">
      Already have an account?{' '}
      <Link href="/login" className="text-[#0c969c] hover:underline font-medium">
        Login
      </Link>
    </p>
  </div>
</div>

  );
}
