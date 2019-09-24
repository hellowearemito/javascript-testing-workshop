import Vue from "vue";
import Vuex from "vuex";
import VuexPersistence from "vuex-persist";
import to from "await-to-js";
import { getStations, getFlights } from "./services";

Vue.use(Vuex);
const vuexLocal = new VuexPersistence({
  storage: window.localStorage
});

export const getDefaultState = () => {
  return {
    isModalVisible: false,
    search: {
      origin: "",
      destination: "",
      departureDate: "",
      returnDate: ""
    },
    stations: [],
    selectedStations: {
      outbound: null,
      return: null
    },
    flights: {
      outbound: null,
      return: null
    },
    selectedFare: {
      outbound: null,
      return: null
    },
    isLoading: false
  };
};

const state = getDefaultState();

export const mutations = {
  SET_MODAL_STATE(state, payload) {
    state.isModalVisible = payload;
  },
  SET_INPUT_VALUE(state, payload) {
    const { propName, value } = payload;
    state.search[propName] = value.toUpperCase();
  },
  SET_STATIONS(state, payload) {
    state.stations = payload;
  },
  SET_SELECTED_STATION(state, payload) {
    const { type, station } = payload;
    state.selectedStations[type] = station;
  },
  SET_FLIGHTS(state, payload) {
    const { type, flights } = payload;
    state.flights[type] = flights;
  },
  SET_SELECTED_FARE(state, payload) {
    const { direction, fare } = payload;
    state.selectedFare[direction] = fare;
  },
  RESET(state) {
    Object.assign(state, getDefaultState());
  },
  SET_IS_LOADING_TO_TRUE(state) {
    state.isLoading = true;
  },
  SET_IS_LOADING_TO_FALSE(state) {
    state.isLoading = false;
  }
};

export const actions = {
  setModalState({ commit }, payload) {
    commit("SET_MODAL_STATE", payload);
  },
  setInputValue({ commit }, payload) {
    if (!payload) return;
    const { propName } = payload;
    if (typeof propName !== "string") return;
    commit("SET_INPUT_VALUE", payload);
  },
  async loadStations({ commit }) {
    commit("SET_IS_LOADING_TO_TRUE");
    const [error, response] = await to(getStations());
    commit("SET_IS_LOADING_TO_FALSE");
    if (error) return;
    commit("SET_STATIONS", response.data);
  },
  selectStation({ commit }, payload) {
    commit("SET_SELECTED_STATION", payload);
  },
  async getResults({ commit, state }, type) {
    let options = {
      departureStation: state.selectedStations.outbound.iata,
      arrivalStation: state.selectedStations.return.iata,
      date: state.search.departureDate
    };
    if (type === "return") {
      options = {
        departureStation: state.selectedStations.return.iata,
        arrivalStation: state.selectedStations.outbound.iata,
        date: state.search.returnDate
      };
    }
    commit("SET_IS_LOADING_TO_TRUE");
    const [error, response] = await to(getFlights(options));
    commit("SET_IS_LOADING_TO_FALSE");
    if (error) return;
    commit("SET_FLIGHTS", { flights: response.data, type });
  },
  setSelectedFare({ commit }, fare) {
    commit("SET_SELECTED_FARE", fare);
  },
  reset({ commit }) {
    commit("RESET");
  }
};

export const getters = {
  isModalVisible: state => state.isModalVisible,
  stations: state => state.stations,
  search: state => state.search,
  selectedStations: state => state.selectedStations,
  returnStations: state => getReturnStations(state.stations, state.selectedStations.outbound),
  isRoundTrip: state => state.flights.return !== null,
  departureDate: state => state.search.departureDate,
  returnDate: state => state.search.returnDate,
  flights: state => state.flights,
  selectedFare: state => state.selectedFare,
  outboundDepartureDate: state => (state.flights.outbound ? state.flights.outbound[0] : null),
  returnDepartureDate: state => (state.flights.return ? state.flights.return[0] : null),
  isLoading: state => state.isLoading
};

export const findReturnStations = (originIata, stations) => {
  return stations.filter(station => {
    return station.connections.find(connection => connection.iata === originIata);
  });
};

const getReturnStations = (stations, origin) => {
  if (!origin) return stations;
  return findReturnStations(origin.iata, stations);
};

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  plugins: [vuexLocal.plugin]
});
