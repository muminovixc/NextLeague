"use client";

import React, { useEffect, useState } from "react";
import { get_my_profile } from "../../lib/user";
import { update_user_profile } from "../../lib/user";
import UserNavbar from "../../components/user_navbar/user_navbar";
import SpiderChart from "../../components/user_charts/SpiderChart";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedSport, setSelectedSport] = useState("fudbal");
  const [chartData, setChartData] = useState({
    napad: 16,
    odbrana: 16,
    brzina: 16,
    snaga: 16,
    izdrzljivost: 16,
    dodavanja: 16
  });
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    phone_number: "",
    email: "",
    password: "",
    confirmPassword: "",
    sport: "",
    napad: "",
    odbrana: "",
    dodavanja: "",
    izdrzljivost: "",
    snaga: "",
    brzina: ""
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
          confirmPassword: "",
          sport: data.sport || "",
          napad: data.napad || "",
          odbrana: data.odbrana || "",
          dodavanja: data.dodavanja || "",
          izdrzljivost: data.izdrzljivost || "",
          snaga: data.snaga || "",
          brzina: data.brzina || ""
        });
        updateChartData(data, selectedSport);
      } catch (err) {
        setError(err.message || "Failed to fetch profile");
      } finally {
        setLoading(false);
      }
    }

    fetchProfile();
  }, []);

  const updateChartData = (userData, sport) => {
    const chart = userData.charts?.find(chart => chart.sport === sport);
    if (chart) {
      setChartData({
        napad: chart.napad,
        odbrana: chart.odbrana,
        brzina: chart.brzina,
        snaga: chart.snaga,
        izdrzljivost: chart.izdrzljivost,
        dodavanja: chart.dodavanja
      });
    } else {
      setChartData({
        napad: 16,
        odbrana: 16,
        brzina: 16,
        snaga: 16,
        izdrzljivost: 16,
        dodavanja: 16
      });
    }
  };

  useEffect(() => {
    if (user) {
      updateChartData(user, selectedSport);
    }
  }, [selectedSport, user]);

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

    const formDataObj = new FormData();
    formDataObj.append('name', formData.name);
    formDataObj.append('surname', formData.surname);
    formDataObj.append('phone_number', formData.phone_number);
    formDataObj.append('email', formData.email);
    if (formData.password) {
      formDataObj.append('password', formData.password);
    }
    if (formData.profile_picture) {
      formDataObj.append('profile_picture', formData.profile_picture);
    }
    formDataObj.append('sport', selectedSport);
    formDataObj.append('napad', formData.napad);
    formDataObj.append('odbrana', formData.odbrana);
    formDataObj.append('dodavanja', formData.dodavanja);
    formDataObj.append('izdrzljivost', formData.izdrzljivost);
    formDataObj.append('snaga', formData.snaga);
    formDataObj.append('brzina', formData.brzina);

    try {
      const updatedUser = await update_user_profile(formDataObj);
      setUser(updatedUser);
      updateChartData(updatedUser, selectedSport);
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
    <div className="min-h-screen flex items-center justify-center bg-[#031716]">
      <div className="bg-[#032f30] rounded-lg p-8 max-w-6xl w-full min-h-[750px] h-full flex flex-col">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-full">
          <div className="flex-1 flex flex-col">
            <div className="bg-[#031716] p-6 rounded-lg border border-[#0c969c]/20 h-full flex flex-col">
              {user.profile_picture ? (
                <img
                  src={`http://localhost:8000/${user.profile_picture}`}
                  alt="Profile"
                  className="w-32 h-32 rounded-full object-cover mx-auto mb-6"
                />
              ) : (
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
              )}

              {!isEditing ? (
                <>
                  <h3 className="text-2xl font-bold text-white text-center mb-2">
                    {user.name} {user.surname}
                  </h3>
                  <p className="text-[#6ba3be] text-center mb-4">{user.phone_number}</p>
                  <p className="text-[#6ba3be] text-center mb-4">{user.email}</p>
                  
                  {/* Sport Selector */}
                  <div className="flex justify-center mb-6">
                    <select
                      value={selectedSport}
                      onChange={(e) => setSelectedSport(e.target.value)}
                      className="px-4 py-2 rounded bg-[#032f30] text-white border border-[#0c969c]/30"
                    >
                      <option value="fudbal">Fudbal</option>
                      <option value="kosarka">Košarka</option>
                      <option value="rukomet">Rukomet</option>
                      <option value="odbojka">Odbojka</option>
                    </select>
                  </div>
                  
                  {/* SpiderChart */}
                  <div className="mb-6">
                    <SpiderChart 
                      chartData={chartData} 
                    />
                  </div>
                  
                  <button 
                    onClick={() => setIsEditing(true)}
                    className="w-full bg-[#0c969c] text-white px-6 py-2 rounded-md hover:bg-[#0a7075]"
                  >
                    Edit Profile
                  </button>
                </>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
                  <div className="grid grid-cols-2 gap-4">
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
                  </div>
                  <div className="grid grid-cols-2 gap-4">
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
                  </div>
                  <div className="grid grid-cols-2 gap-4">
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
                  </div>
                  <input
                    type="file"
                    name="profile_picture"
                    accept="image/*"
                    onChange={e => setFormData(prev => ({ ...prev, profile_picture: e.target.files[0] }))}
                    className="w-full px-4 py-2 rounded bg-[#031716] text-white border border-[#0c969c]/30"
                  />
                  <div className="flex justify-center">
                    <select
                      name="sport"
                      value={formData.sport || ""}
                      onChange={handleInputChange}
                      className="px-4 py-2 rounded bg-[#031716] text-white border border-[#0c969c]/30"
                    >
                      <option value="">Odaberi sport</option>
                      <option value="kosarka">Košarka</option>
                      <option value="fudbal">Fudbal</option>
                      <option value="odbojka">Odbojka</option>
                      <option value="rukomet">Rukomet</option>
                    </select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-[#6ba3be] mb-1">ATK</label>
                      <input
                        type="number"
                        name="napad"
                        value={formData.napad || ""}
                        onChange={handleInputChange}
                        placeholder="ATK"
                        className="w-full px-4 py-2 rounded bg-[#031716] text-white border border-[#0c969c]/30"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#6ba3be] mb-1">DEF</label>
                      <input
                        type="number"
                        name="odbrana"
                        value={formData.odbrana || ""}
                        onChange={handleInputChange}
                        placeholder="DEF"
                        className="w-full px-4 py-2 rounded bg-[#031716] text-white border border-[#0c969c]/30"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-[#6ba3be] mb-1">AST</label>
                      <input
                        type="number"
                        name="dodavanja"
                        value={formData.dodavanja || ""}
                        onChange={handleInputChange}
                        placeholder="AST"
                        className="w-full px-4 py-2 rounded bg-[#031716] text-white border border-[#0c969c]/30"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#6ba3be] mb-1">STA</label>
                      <input
                        type="number"
                        name="izdrzljivost"
                        value={formData.izdrzljivost || ""}
                        onChange={handleInputChange}
                        placeholder="STA"
                        className="w-full px-4 py-2 rounded bg-[#031716] text-white border border-[#0c969c]/30"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-[#6ba3be] mb-1">POW</label>
                      <input
                        type="number"
                        name="snaga"
                        value={formData.snaga || ""}
                        onChange={handleInputChange}
                        placeholder="POW"
                        className="w-full px-4 py-2 rounded bg-[#031716] text-white border border-[#0c969c]/30"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#6ba3be] mb-1">SPE</label>
                      <input
                        type="number"
                        name="brzina"
                        value={formData.brzina || ""}
                        onChange={handleInputChange}
                        placeholder="SPE"
                        className="w-full px-4 py-2 rounded bg-[#031716] text-white border border-[#0c969c]/30"
                      />
                    </div>
                  </div>
                  
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
                          confirmPassword: "",
                          sport: user.sport || "",
                          atk: user.napad || "",
                          def: user.odbrana || "",
                          ast: user.dodavanja || "",
                          sta: user.izdrzljivost || "",
                          pow: user.snaga || "",
                          spe: user.brzina || ""
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
          <div className="flex-1 flex flex-col">
            <UserNavbar/>
          </div>
        </div>
      </div>
    </div>
  );
}


