import api from "./api";

export const getProfile = async (id: number) => {
  return api.get(`/api/farmer/profile/${id}`);
};

export const updateProfile = async (
  id: number,
  data: any
) => {
  return api.put(`/api/farmer/profile/${id}`, data);
};