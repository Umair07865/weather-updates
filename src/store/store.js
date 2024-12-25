import { createStore } from "vuex";

const store = createStore({
  state: {
    geoPosition: null,
    forecast: [],
    loading: false,
    error: null,
    weather: null,
  },
  mutations: {
    setgeoPosition(state, payload) {
      state.geoPosition = payload;
    },
    setWeather(state, payload) {
      state.weather = payload;
    },
    forecast(state, payload) {
      state.forecast = payload;
    },
    setLoading(state, payload) {
      state.loading = payload;
    },
    setError(state, payload) {
      state.error = payload;
    },
  },
  actions: {
    async fetchWeather({ commit }, city) {
      commit("setLoading", true);
      commit("setError", null);
      try {
        const API_KEY = "a6263541248a7b7f620a62e5954a8f88";
        const currentRes = await fetch(
          `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${API_KEY}`
        );
        console.log("city name : ", city);

        const geoPosition = await currentRes.json();
        console.log("geo : ", geoPosition);
        await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${geoPosition[0].lat}&lon=${geoPosition[0].lon}&appid=${API_KEY}`
        )
          .then((resp) => {
            return resp.json();
          })
          .then((data) => {
            commit("setWeather", data);
          })
          .catch((err) => {
            commit("setError", err);
          });
        const forecastRes = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${geoPosition[0].lat}&lon=${geoPosition[0].lon}&cnt=5&appid=${API_KEY}`
        );
        if (!forecastRes.ok || !currentRes) {
          let error = "Invalid Request Try Again";
          commit("setError", error);
        }
        const forecastData = await forecastRes.json();
        commit("forecast", forecastData);
        commit("setLoading", false);
        commit("setgeoPosition", geoPosition);
      } catch (error) {
        commit("setError", error.message);
        setTimeout(() => {
          commit("setError", "");
        }, 3000);
      } 
        commit("setLoading", false);
    },
  },
  getters: {
    getgeoPosition(state) {
      return state.geoPosition;
    },
    getForecast(state) {
      return state.forecast;
    },
    getLoadingState(state) {
      return state.loading;
    },
    getStoredata(state) {
      return state.weather;
    },
    getError(state) {
      return state.error;
    },
  },
});

export default store;
