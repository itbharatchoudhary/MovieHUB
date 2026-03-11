import api from "./TMDB";

export const loginUser = async (data) => {
  try {
    const res = await api.post("/auth/login", data);
    return res.data; // backend ka actual data return karega
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const registerUser = async (data) => {
  try {
    const res = await api.post("/auth/register", data);
    return res.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};