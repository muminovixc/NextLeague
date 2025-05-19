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
  const data = await res.json();
  console.log('Fetched teams:', data);
  return data;
} catch (error) {
    throw error;
  }
}

export async function getTeamMembers(teamId) {
  try{
    const res = await fetch(`${API_URL}/team/${teamId}/getTeamMembers`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // Include cookies in the request
    });
    if (!res.ok) {
      throw new Error('Failed to fetch team members');
    }
    return await res.json();
  } catch (error) {
    throw error;
  }
}

