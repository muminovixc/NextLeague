"use client";

import React, { useState } from "react";

export default function UserEditForm({ user, onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    name: user.name,
    surname: user.surname,
    email: user.email,
    phone_number: user.phone_number,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await fetch("http://localhost:8000/user/my_profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // zbog cookie tokena
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.detail || "Update failed");
      }

      const updatedUser = await res.json();
      setSuccess("Profile updated!");
      onSuccess(updatedUser); // javi roditelju da je uspjeh
      onClose();              // zatvori formu
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-4">
      <input
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Name"
        className="w-full p-2 rounded bg-gray-800 text-white"
      />
      <input
        name="surname"
        value={formData.surname}
        onChange={handleChange}
        placeholder="Surname"
        className="w-full p-2 rounded bg-gray-800 text-white"
      />
      <input
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
        className="w-full p-2 rounded bg-gray-800 text-white"
      />
      <input
        name="phone_number"
        value={formData.phone_number}
        onChange={handleChange}
        placeholder="Phone"
        className="w-full p-2 rounded bg-gray-800 text-white"
      />
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}
      <div className="flex gap-2">
        <button
          type="submit"
          disabled={loading}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          {loading ? "Saving..." : "Save"}
        </button>
        <button
          type="button"
          onClick={onClose}
          className="bg-gray-600 text-white px-4 py-2 rounded"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
