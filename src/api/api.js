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

export const marsAPI = {
  async curiosityGetPhotos(camera, date) {
    const { data } = await api.get(
      `/mars-photos/api/v1/rovers/curiosity/photos?earth_date=${date}&camera=${camera}&page=1&api_key=${key}`,
    );
    return data;
  },
  async curiosityGetManifest() {
    const { data } = await api.get(`/mars-photos/api/v1/manifests/curiosity?api_key=${key}`);
    return data.photo_manifest;
  },

  async spirit() {
    const { data } = await api.get(
      `/mars-photos/api/v1/rovers/spirit/photos?sol=400&api_key=${key}`,
    );
    return data;
  },
  async spiritGetManifest() {
    const { data } = await api.get(`/mars-photos/api/v1/manifests/spirit?api_key=${key}`);
    return data.photo_manifest;
  },

  async opportunityGetManifest() {
    const { data } = await api.get(`/mars-photos/api/v1/manifests/opportunity?api_key=${key}`);
    return data.photo_manifest;
  },
  async opportunityGetPhoto() {
    const { data } = await api.get(
      `/mars-photos/api/v1/rovers/opportunity/photos?sol=51&api_key=${key}`,
    );
    return data;
  },
};
