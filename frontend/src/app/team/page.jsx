
'use client';
import { useEffect, useState } from 'react';

export default function ClubsPage() {
  const [clubs, setClubs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const [editingClubId, setEditingClubId] = useState(null);

  // Funkcija za učitavanje klubova
  const fetchClubs = async () => {
    setLoading(true);
    const res = await fetch('http://localhost:8000/team');
    const data = await res.json();
    setClubs(data); // Postavi učitane klubove u stanje
    setLoading(false);
  };

  useEffect(() => {
    fetchClubs();
  }, []);

  // Funkcija za kreiranje ili ažuriranje kluba
  const handleCreateOrUpdate = async () => {
    const method = editingClubId ? 'PUT' : 'POST';
    const url = editingClubId
      ? `http://localhost:8000/clubs/${editingClubId}`
      : 'http://localhost:8000/clubs/';

    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name }),
    });

    setName('');
    setEditingClubId(null);
    fetchClubs(); // Ažuriraj listu klubova nakon dodavanja ili uređivanja
  };

  // Funkcija za uređivanje kluba
  const handleEdit = (club) => {
    setName(club.name);
    setEditingClubId(club.id);
  };

  // Funkcija za brisanje kluba
  const handleDelete = async (id) => {
    await fetch(`http://localhost:8000/clubs/${id}`, { method: 'DELETE' });
    fetchClubs(); // Ažuriraj listu klubova nakon brisanja
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Klubovi</h1>

      <div className="mb-6">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Unesi ime kluba"
          className="border p-2 rounded mr-2"
        />
        <button
          onClick={handleCreateOrUpdate}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          {editingClubId ? 'Ažuriraj klub' : 'Dodaj klub'}
        </button>
      </div>

      {loading ? (
        <p>Učitavanje klubova...</p>
      ) : (
        <ul className="space-y-4">
          {clubs.map((club) => (
            <li key={club.id} className="border p-4 rounded">
              <div className="flex justify-between items-center">
                <span className="font-semibold">{club.name}</span>
                <div className="space-x-2">
                  <button
                    onClick={() => handleEdit(club)}
                    className="text-blue-500"
                  >
                    Uredi
                  </button>
                  <button
                    onClick={() => handleDelete(club.id)}
                    className="text-red-500"
                  >
                    Obriši
                  </button>
                </div>
              </div>

              {/* Prikaz igrača */}
              {club.players && club.players.length > 0 && (
                <ul className="ml-4 mt-2 list-disc">
                  {club.players.map((player) => (
                    <li key={player.id}>
                      {player.name} – {player.position}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
