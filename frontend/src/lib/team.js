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


export async function createTeam(teamData) {
  try{
    const res = await fetch(`${API_URL}/team/createTeam`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(teamData),
      credentials: 'include',
    });

    if (!res.ok) {
      // Pokušaj da pročitaš grešku iz response-a
      const errorData = await res.json().catch(() => null);
      
      if (errorData && errorData.detail) {
        // Ako je greška povezana sa maksimalnim brojem timova
        if (errorData.detail.includes("maksimalan broj timova")) {
          throw new Error("Dostigli ste maksimalan broj timova koji možete kreirati.");
        }
        throw new Error(errorData.detail);
      }
      
      throw new Error('Failed to create team');
    }
    return await res.json();
  } catch (error) {
    throw error;
  }
}

export async function getMyTeam() {
  try {
    const res = await fetch(`${API_URL}/team/getMyTeams`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    if (!res.ok) {
      throw new Error('Failed to fetch teams');
    }

    const data = await res.json();

    // Validacija
    if (!data.teams || !Array.isArray(data.teams)) {
      return { teams: [], user_id: null }; // fallback
    }

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

export async function deleteTeam(teamId) {
return fetch(`${API_URL}/team/deleteMyTeam/${teamId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include', // Include cookies in the request
  })
  .then(res => {
    if (!res.ok) {
      throw new Error('Failed to delete team');
    }
    return res.json();
  })
  .catch(error => {
    throw error;
  });
}

export async function getMyTeamsModerator(league_sport) {
  try {
    const res = await fetch(`${API_URL}/team/getMyTeamsModeratorFiltered?league_sport=${encodeURIComponent(league_sport)}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    if (!res.ok) {
      throw new Error('Failed to fetch moderator teams');
    }

    return await res.json();
  } catch (error) {
    console.error("Greška u getMyTeamsModerator:", error);
    throw error;
  }
}
