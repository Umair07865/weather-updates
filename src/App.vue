<template>
  <DashboardWeather msg="Welcome to Your Vue.js App" />
</template>

<script>
import DashboardWeather from "./components/DashboardWeather.vue";

export default {
  name: "App",
  components: {
    DashboardWeather,
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Encode+Sans+Semi+Expanded:wght@800&family=Kantumruy+Pro:wght@500&family=Manrope:wght@200..800&family=Montserrat+Alternates:wght@900&family=Noto+Sans+Limbu&family=Poppins:ital,wght@0,300;0,400;0,600;1,900&family=Raleway:wght@500;600;700&display=swap");

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-family: "Manrope", serif;
}
body {
  margin: 0;
  padding: 0;
  overflow: hidden;
}
* {
  box-sizing: border-box;
}
@media (max-width: 768px) {
  body {
    overflow-y: scroll;
  }
}
</style>
