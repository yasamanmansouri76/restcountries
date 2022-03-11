import Api from "./server";
export default {
  namespaced: true,
  actions: {
    getAllCountries() {
      return Api()
        .get("/v2/all")
        .then((response) => response.data);
    },
    getCountryByCode(context, payload) {
      return Api()
        .get("/v2/alpha/" + payload)
        .then((response) => response.data);
    },
    getCountryByName(context, payload) {
      return Api()
        .get("/v2/name/" + payload)
        .then((response) => response.data);
    },
    getCountryByRegion(context, payload) {
      return Api()
        .get("/v2/regionalbloc/" + payload)
        .then((response) => response.data);
    },
  },
};
