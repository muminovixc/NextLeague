const API_URL = 'http://localhost:8000';
export async function get_my_profile() {
  try {
    const response = await fetch(`${API_URL}/user/my_profile`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || 'Failed to fetch profile');
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
}

export async function get_user_profile(userId) {
  try {
    const response = await fetch(`${API_URL}/user/${userId}/profile`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || 'Failed to fetch user profile');
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
}

export const update_user_profile = async (formData) => {
  try {
    // Kreiraj novi FormData za backend
    const backendFormData = new FormData();
    for (let [key, value] of formData.entries()) {
      backendFormData.append(key, value);
    }
    
    const response = await fetch(`${API_URL}/user/my_profile`, {
      method: 'PUT',
      body: backendFormData,
      credentials: 'include',
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || 'Failed to update profile');
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const initialUserFormData = {
  name: "",
  surname: "",
  phone_number: "",
  email: "",
  image: null,
};

export async function get_user_teams(userId) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/user/${userId}/teams`, {
    credentials: 'include',
  });
  if (!res.ok) throw new Error('Failed to fetch user teams');
  return await res.json();
}

export async function get_user_leagues(userId) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/user/${userId}/leagues`, {
    credentials: 'include',
  });
  if (!res.ok) throw new Error('Failed to fetch user leagues');
  return await res.json();
}