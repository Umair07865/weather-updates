<template id="dashboard">
  <div class="main-dashboard-wrapper">
    <div class="loader" v-if="loading"></div>
    <div class="error" v-if="errors">
      {{ errors }}
    </div>
    <div class="dashboard-wrapper">
      <div class="side-bar">
        <div class="header">
          <svg-icon
            type="mdi"
            :path="mdiSnowflakeThermometer"
            class="dashboard-icons"
          />
          <input
            type="search"
            name="search"
            id="searchCity"
            placeholder="Search City"
            v-model="cityName"
            @keydown.enter="getForecaste"
          />
          <svg-icon
            type="mdi"
            @click="getForecaste"
            :path="mdiMagnify"
            class="dashboard-icons"
          />
        </div>
        <hr />
        <div class="info-outer-wrapper">
          <div class="info-wrapper">
            <h1 class="tempereture-degree">
              {{ convertedTemperature ? convertedTemperature : "0" }}°C
            </h1>
            <div class="wind-updates">
              <h1>{{ weatherUpdates ? weatherUpdates.wind.deg : "0" }}°C</h1>
              <p>
                Wind WSW
                {{ weatherUpdates ? weatherUpdates.wind.speed : "0" }}MPS
              </p>
            </div>
          </div>
          <div class="info-wrapper all-updates">
            <h1>weather Updates</h1>
            <ul class="temperature-details">
              <li>
                <h4>Min Temp</h4>
                <p>{{ weatherUpdates ? weatherUpdates.main.temp_min : "0" }}</p>
              </li>
              <li>
                <h4>Max Temp</h4>
                <p>{{ weatherUpdates ? weatherUpdates.main.temp_max : "0" }}</p>
              </li>
              <li>
                <h4>Pressure</h4>
                <p>{{ weatherUpdates ? weatherUpdates.main.pressure : "0" }}</p>
              </li>
              <li>
                <h4>Humidity</h4>
                <p>{{ weatherUpdates ? weatherUpdates.main.humidity : "0" }}</p>
              </li>
              <li>
                <h4>Sea Level</h4>
                <p>{{ weatherUpdates ? weatherUpdates.main.humidity : "0" }}</p>
              </li>
              <li>
                <h4>Ground Level</h4>
                <p>
                  {{ weatherUpdates ? weatherUpdates.main.grnd_level : "0" }}
                </p>
              </li>
              <li>
                <h4>Feels Like</h4>
                <p>
                  {{ weatherUpdates ? weatherUpdates.main.feels_like : "0" }}
                </p>
              </li>
            </ul>
          </div>
          <div class="info-wrapper">
            <h1 class="city-name">Sun</h1>
            <div class="description-title">
              <p>
                Sunrise {{ weatherUpdates ? weatherUpdates.sys.sunrise : "0" }}
              </p>
              <p>
                Sunset {{ weatherUpdates ? weatherUpdates.sys.sunset : "0" }}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="main-wrapper">
        <div class="main-content-inner-wrapper">
          <h1>Weather Dashboard</h1>
          <h4 class="main-heading">Weather Forcast</h4>
          <h1>
            {{ weatherUpdates ? weatherUpdates.name : "" }},{{
              weatherUpdates ? weatherUpdates.sys.country : ""
            }}
          </h1>
          <h1>{{ weatherUpdates ? weatherUpdates.weather[0].main : "" }}</h1>
          <div class="update-report">
            <div class="report-header">
              <img
                class="dashboard-icons"
                :src="`https://openweathermap.org/img/wn/${
                  weatherUpdates && weatherUpdates.weather[0].icon
                    ? weatherUpdates.weather[0].icon
                    : '01d'
                }@2x.png`"
                alt="loading"
              />
              <p>
                {{
                  weatherUpdates ? weatherUpdates.weather[0].description : ""
                }}
              </p>
            </div>
            <div class="weather-content">
              <p class="title">Your Daily Weather Advisor</p>
            </div>
            <button class="btn-details">See Details</button>
          </div>
          <div class="forcasts-wrapper">
            <div
              class="forecast-info"
              v-for="(item, index) in forecast.list"
              :key="index"
            >
            
             <img
                class="dashboard-icons-forcaste"
                :src="`https://openweathermap.org/img/wn/${item.weather[0].icon || '01d'}@2x.png`"
                alt="Weather icon"
              />
              <p>
                Min:
                {{ item ? (item.main.temp_min - 273.15).toFixed(1) : "0" }}°C
              </p>
              <p>
                Max:
                {{ item ? (item.main.temp_max - 273.15).toFixed(1) : "0" }}°C
              </p>
            </div>
          </div>
          <div class="wave" v-if="forecast.list"></div>
            <div class="all-forecaste">
              <div
                class="forcaste-description"
                v-for="(item, index) in forecast.list"
                :key="index"
              >
                <h1>{{ ( item.main.temp - 273.15).toFixed(1) }}°C</h1>
                <p>Humidity Percentage</p>
                <progress
                  id="file"
                  :value="item.main.humidity"
                  max="100"
                  class="temperature-bar"
                ></progress>
              </div>
            </div>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
import SvgIcon from "@jamescoyle/vue-icon";
import {
  mdiSnowflakeThermometer,
  mdiMagnify,
  mdiWeatherPouring,
} from "@mdi/js";
import store from "@/store/store";
import { ref } from "vue";

export default {
  components: {
    SvgIcon,
  },
  setup() {
    const cityName = ref("");
    const getForecaste = () => {
      store.dispatch("fetchWeather", cityName.value);
    };

    const forecast = computed(() => store.getters.getForecast);
    const loading = computed(() => store.getters.getLoadingState);
    const errors = computed(() => store.getters.getError);
    const weatherUpdates = computed(() => store.getters.getStoredata);
    const convertedTemperature = computed(() => {
      if (weatherUpdates.value && weatherUpdates.value.main) {
        const kelvin = weatherUpdates.value.main.temp;
        const celsius = kelvin - 273.15;
        return celsius.toFixed(2);
      }
      return null;
    });
    return {
      mdiSnowflakeThermometer,
      mdiMagnify,
      mdiWeatherPouring,
      getForecaste,
      cityName,
      weatherUpdates,
      convertedTemperature,
      forecast,
      loading,
      errors,
    };
  },
  mounted() {
    const defaultCity = "lahore";
    store.dispatch("fetchWeather", defaultCity);
  },
};
</script>

<style scoped>
.main-dashboard-wrapper {
  padding: 3rem;
}

.zero-margin {
  margin: 0;
}
#dashboard {
  position: relative;
}
.dashboard-wrapper {
  background-position: bottom;
  height: calc(100vh - 4rem);
  border-radius: 20px;
  background-size: cover;
  background-repeat: no-repeat;
  display: flex;
  background-blend-mode: lighten;
  background-image: url("https://images.unsplash.com/photo-1579806591795-82fa34772482?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D");
}

.side-bar {
  background-color: #22222294;
  border-radius: 20px;
  width: 30%;
  box-shadow: 1px 1px 15px 0px white;
  padding: 1rem;
}
.header {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}
.main-wrapper {
  overflow-y: scroll;
  width: 70%;
}
#searchCity {
  border: 1px solid white;
  border-radius: 5px;
  width: 80%;
  border: none;
  padding: 0.5rem;
  color: gray;
}
#searchCity:focus-visible {
  outline: none;
}
input[type="search"]::-webkit-search-cancel-button {
  display: none;
}
.dashboard-icons {
  color: white;
  filter: brightness(0) invert(1);
}
.info-wrapper {
  color: white;
}
.tempereture-degree {
  font-size: 4rem;
  margin: 0;
  font-weight: 100;
}
.wind-updates {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.temperature-details {
  list-style: none;
  padding: 0;
  overflow-y: scroll;
  height: 300px;
}
.temperature-details li {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

h4 {
  margin: 0;
}
.description-title {
  overflow-y: scroll;
  text-align: justify;
  height: 100px;
}

/*main section */
.main-content-inner-wrapper {
  padding: 2rem;
  color: white;
}
.main-heading {
  margin-top: 4rem;
}
.report-header {
  display: flex;
  gap: 2rem;
  align-items: center;
}
.inner-weather-content {
  display: flex;
  gap: 2px;
}

.weather-content .title {
  margin: 0;
}
.btn-details {
  border: none;
  margin-top: 2rem;
  padding: 0.5rem 2.5rem;
  border: 1px solid white;
  background-color: transparent;
  color: white;
  transition: all 0.3s;
  border-radius: 10px;
}
.btn-details:hover {
  background-color: black;
  border: none;
  color: white;
}
.forcasts-wrapper {
  overflow-y: scroll;
  display: flex;
}
.forcasts-wrapper > div {
  width: 25%;
  font-weight: bold;
}
.all-forecaste {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  overflow-y: scroll;
}
.forcaste-description {
  width: fit-content;
}
.wave {
  height: 80px;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  background-image: url("../assets/wave3.svg");
  animation: wave 2s ease-in-out;
}
@keyframes wave {
  from {
    width: 0;
  }
  to {
    width: 100%;
  }
}
/* Loader */
.loader {
  position: absolute;
  height: 100vh;
  width: 100%;
  background-color: white;
  background-image: url("../assets/loader.gif");
  background-position: center;
  background-size: 10rem;
  background-repeat: no-repeat;
}
/* error */
.error {
  background-color: white;
  color: red;
  top: 1rem;
  right: 3rem;
  position: fixed;
  width: 100%;
  padding: 1rem;
  border-radius: 10px;
  box-shadow: 0px 0px 6px 0px #ff0000;
  width: fit-content;
}
/* Responsiveness */
@media (max-width: 1024px) {
  .temperature-details {
    height: 200px;
  }
  h1 {
    font-size: 2rem !important;
  }
}
@media (max-width: 768px) {
  .side-bar {
    width: 100%;
    border-radius: 0;
    border: none;
  }
  .dashboard-wrapper {
    flex-direction: column;
    border-radius: 0;
    background-color: black;
    background-size: auto;
    height: 100vh;
  }
  .btn-details {
    background-color: white;
    color: black;
  }
  .main-wrapper {
    width: 100%;
    background-color: black;
    overflow-y: unset;
  }
  .temperature-details {
    height: 300px;
  }
  .main-dashboard-wrapper {
    padding: 0;
  }
}
@media (max-width: 425px) {
  .forcasts-wrapper {
    flex-wrap: wrap;
    gap: 1rem;
  }
  body {
    overflow-y: scroll;
  }
  .error {
    right: 0;
  }
  .main-content-inner-wrapper {
    padding: 1rem;
  }
}
</style>
