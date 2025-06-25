const API_URL = 'http://localhost:8000'; // promijeni ako je drugačije

// POST /request/createRequestForLeague
export async function createRequestForLeague(body) {
  try {
    const response = await fetch(`${API_URL}/request/createRequestForLeague`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // šalje cookie s tokenom
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || 'Failed to create request for league');
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
}

// GET /request/getRequestsForLeague
export async function getRequestsForLeague() {
  try {
    const response = await fetch(`${API_URL}/request/getRequestsForLeague`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || 'Failed to fetch requests for league');
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
}
