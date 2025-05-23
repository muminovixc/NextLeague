const API_URL = 'http://localhost:8000';

export async function getAllTeams() {
  try{
    const res = await fetch(`${API_URL}/team/getAllTeams`, {
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


export async function getTeamById(teamId) {
  try{
    const res = await fetch(`${API_URL}/team/view/${teamId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // Include cookies in the request
    });
    if (!res.ok) {
      throw new Error('Failed to fetch team');
    }
    return await res.json();
  } catch (error) {
    throw error;
  }
}

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

