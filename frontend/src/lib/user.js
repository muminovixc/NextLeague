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

export const update_user_profile = async (formData) => {
  const res = await fetch('/api/user/update_profile', {
    method: 'PUT',
    body: formData,  // ako šalješ formData sa fajlom
    credentials: 'include',
  });
  if (!res.ok) throw new Error('Failed to update profile');
  return await res.json();
};

export const initialUserFormData = {
  name: "",
  surname: "",
  phone_number: "",
  email: "",
  image: null,
};