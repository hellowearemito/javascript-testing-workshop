import axios from "axios";

const API_DOMAIN = "https://jsconf-ws-api.mito.hu/";
const STATIONS_URL = "asset/stations";
const SEARCH_URL = "search";

export function getStations() {
  return axios.get(`${API_DOMAIN}${STATIONS_URL}`);
}

export function getFlights(payload) {
  const { departureStation, arrivalStation, date } = payload;
  const query = `?departureStation=${departureStation}&arrivalStation=${arrivalStation}&date=${date}`;
  return axios.get(`${API_DOMAIN}${SEARCH_URL}${query}`);
}
