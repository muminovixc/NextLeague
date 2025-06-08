"use client";

import React, { useEffect, useState } from "react";
import { get_my_profile } from "../../lib/user";
import UserNavbar from "../../components/user_navbar/user_navbar";
export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    phone_number: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [updateError, setUpdateError] = useState(null);
  const [updateSuccess, setUpdateSuccess] = useState(null);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const data = await get_my_profile();
        setUser(data);
        setFormData({
          name: data.name || "",
          surname: data.surname || "",
          phone_number: data.phone_number || "",
          email: data.email || "",
          password: "",
          confirmPassword: ""
        });
      } catch (err) {
        setError(err.message || "Failed to fetch profile");
      } finally {
        setLoading(false);
      }
    }

    fetchProfile();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdateError(null);
    setUpdateSuccess(null);

    // Validacija šifre
    if (formData.password && formData.password !== formData.confirmPassword) {
      setUpdateError("Šifre se ne podudaraju");
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/user/my_profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          name: formData.name,
          surname: formData.surname,
          phone_number: formData.phone_number,
          email: formData.email,
          password: formData.password || undefined
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Greška pri ažuriranju profila');
      }

      const updatedUser = await response.json();
      setUser(updatedUser);
      setUpdateSuccess('Profil uspješno ažuriran');
      setIsEditing(false);
    } catch (err) {
      setUpdateError(err.message);
    }
  };

  if (loading) return <div>Loading profile...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!user) return <div>No profile data</div>;

  return (
    <div className="max-w-7xl mx-auto px-8 py-12">
      <div className="bg-[#032f30] rounded-lg p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <div className="bg-[#031716] p-6 rounded-lg border border-[#0c969c]/20">
              <div className="w-32 h-32 bg-[#0a7075] rounded-full mx-auto mb-6 flex items-center justify-center">
                <svg
                  className="w-16 h-16 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>

              {!isEditing ? (
                <>
                  <h3 className="text-2xl font-bold text-white text-center mb-2">
                    {user.name} {user.surname}
                  </h3>
                  <p className="text-[#6ba3be] text-center mb-4">{user.phone_number}</p>
                  <p className="text-[#6ba3be] text-center mb-4">{user.email}</p>
                  <button 
                    onClick={() => setIsEditing(true)}
                    className="w-full bg-[#0c969c] text-white px-6 py-2 rounded-md hover:bg-[#0a7075]"
                  >
                    Edit Profile
                  </button>
                </>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Ime"
                    className="w-full px-4 py-2 rounded bg-[#031716] text-white border border-[#0c969c]/30"
                    required
                  />
                  <input
                    type="text"
                    name="surname"
                    value={formData.surname}
                    onChange={handleInputChange}
                    placeholder="Prezime"
                    className="w-full px-4 py-2 rounded bg-[#031716] text-white border border-[#0c969c]/30"
                    required
                  />
                  <input
                    type="tel"
                    name="phone_number"
                    value={formData.phone_number}
                    onChange={handleInputChange}
                    placeholder="Broj telefona"
                    className="w-full px-4 py-2 rounded bg-[#031716] text-white border border-[#0c969c]/30"
                    required
                  />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Email"
                    className="w-full px-4 py-2 rounded bg-[#031716] text-white border border-[#0c969c]/30"
                    required
                  />
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Nova šifra (opciono)"
                    className="w-full px-4 py-2 rounded bg-[#031716] text-white border border-[#0c969c]/30"
                  />
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    placeholder="Potvrdi novu šifru"
                    className="w-full px-4 py-2 rounded bg-[#031716] text-white border border-[#0c969c]/30"
                  />
                  
                  {updateError && (
                    <p className="text-red-500 text-sm">{updateError}</p>
                  )}
                  {updateSuccess && (
                    <p className="text-green-500 text-sm">{updateSuccess}</p>
                  )}

                  <div className="flex space-x-3">
                    <button
                      type="submit"
                      className="flex-1 bg-[#0c969c] text-white px-6 py-2 rounded-md hover:bg-[#0a7075]"
                    >
                      Sačuvaj
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setIsEditing(false);
                        setFormData({
                          name: user.name,
                          surname: user.surname,
                          phone_number: user.phone_number,
                          email: user.email,
                          password: "",
                          confirmPassword: ""
                        });
                      }}
                      className="flex-1 bg-gray-600 text-white px-6 py-2 rounded-md hover:bg-gray-700"
                    >
                      Otkaži
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
          <div>
            <UserNavbar/>
          </div>
        </div>
      </div>
    </div>
  );
}


