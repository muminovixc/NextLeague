const API_URL = 'http://localhost:8000'; // promijeni ako je drugačiji tvoj FastAPI backend

export async function getMyLeagues() {
  try {
    const response = await fetch(`${API_URL}/league/getMyLeagues`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', 
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || 'Failed to fetch leagues');
    }

    return await response.json(); 
  } catch (error) {
    throw error;
  }
}

export async function getAllLeagues(){

 try {
    const response = await fetch(`${API_URL}/league/getAllLeagues`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', 
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || 'Failed to fetch leagues');
    }

    return await response.json(); 
  } catch (error) {
    throw error;
  }
}

export async function getLeaguesStatistic(league_id){

  try {
    const response = await fetch(`${API_URL}/league/getLeaguesStatistic/${league_id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', 
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || 'Failed to fetch leagues');
    }

    const data = await response.json();
    console.log('Leagues statistic data:', data); // <-- OVDE proveriš šta je vraćeno
    return data;
  } catch (error) {
    throw error;
  }

}
export async function viewTeaminLeague(team_id) {
  
}