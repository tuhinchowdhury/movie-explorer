import axios from "axios";

const API_BASE = "http://localhost:8000";

export const getMovies = (filters?: { genre?: string; actor?: string; director?: string }) =>
  axios.get(`${API_BASE}/movies`, { params: filters }).then(res => res.data);

export const getMovie = (id: string) =>
  axios.get(`${API_BASE}/movies/${id}`).then(res => res.data);

export const getGenres = () =>
  axios.get(`${API_BASE}/genres`).then(res => res.data);

export const getActors = () =>
  axios.get(`${API_BASE}/actors`).then(res => res.data);

export const getDirectors = () =>
  axios.get(`${API_BASE}/directors`).then(res => res.data);

export const getActor = (id: string) =>
  axios.get(`${API_BASE}/actors/${id}`).then(res => res.data);

export const getDirector = (id: string) =>
  axios.get(`${API_BASE}/directors/${id}`).then(res => res.data);
