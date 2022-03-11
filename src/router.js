import Vue from "vue";
import VueRouter from "vue-router";
import homePage from "./pages/index";
import countryDetail from "./pages/country/_code";

Vue.use(VueRouter);

export default new VueRouter({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "homePage",
      component: homePage,
    },
    {
      path: "/country/:code",
      name: "countryDetail",
      component: countryDetail,
    },
  ],
});
