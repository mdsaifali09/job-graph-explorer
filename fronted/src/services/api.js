import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

export const getDevelopers = async () => {
  const response = await API.get("/developers");
  return response.data;
};

export const searchBySkill = async (skill) => {
  const response = await API.get(
    `/developers/skill/${encodeURIComponent(skill)}`
  );

  return response.data;
};

export const searchByTechnology = async (technology) => {
  const response = await API.get(
    `/developers/technology/${encodeURIComponent(technology)}`
  );

  return response.data;
};

export const getDeveloper = async (id) => {
  const response = await API.get(`/developers/${id}`);
  return response.data;
};

export const getRecommendations = async (id) => {
  const response = await API.get(
    `/developers/${id}/recommendations`
  );

  return response.data;
};