<template>
  <b-container id="app" fluid class="bv-example-row p-0">
    <top-bar @changeTheme="changeTheme" />
    <router-view />
  </b-container>
</template>

<script>
import topBar from "./components/layout/top-bar";
export default {
  name: "App",
  data() {
    return {
      currentTheme: "",
    };
  },
  components: {
    topBar,
  },
  methods: {
    changeTheme() {
      this.currentTheme = this.currentTheme === "light" ? "dark" : "light";
      localStorage.setItem("localStorageThemeKey", this.currentTheme);
      document.querySelector("body").dataset.theme = this.currentTheme;
    },
  },
  created() {
    this.currentTheme = localStorage.getItem("localStorageThemeKey") || "light";
    document.querySelector("body").dataset.theme = this.currentTheme;
  },
};
</script>

<style>
@import "./assets/styles/main.scss";
#app {
  font-family: system-ui;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
