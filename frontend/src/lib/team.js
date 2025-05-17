const API_URL = 'http://localhost:8000';

export async function getMyTeam() {
  try{
    const res = await fetch(`${API_URL}/team/getMyTeams`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include', // Include cookies in the request
  });
  if (!res.ok) {
    throw new Error('Failed to fetch teams');
  }
  return await res.json();
} catch (error) {
    throw error;
  }
}
