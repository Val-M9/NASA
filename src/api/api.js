import * as axios from "axios";

const key = "iEipFDdtgYJAMcIUbIV9NGg27OwVNaXRdtdVhKhc";

const api = axios.create({
  baseURL: "https://api.nasa.gov/",
});

export async function apodAPI(date) {
  const response = await api.get(`planetary/apod?&date=${date}&api_key=${key}`);
  return response.data;
}

export async function asteroidsAPI(startDate, endDate) {
  const response = await api.get(
    `neo/rest/v1/feed?start_date=${startDate}&end_date=${endDate}&api_key=${key}`,
  );
  return response.data;
}
