<template>
  <div v-if="country.name" class="detail-page float-left w-100 p-2 p-lg-5">
    <b-col cols="12" class="my-4 float-left">
      <b-button
        to="/"
        variant="outline-secondary"
        class="border-0 shadow-sm px-4"
      >
        <b-icon icon="arrow-left" class="mr-1" />
        Back
      </b-button>
    </b-col>
    <b-col
      cols="12"
      class="my-4 float-left d-flex justify-content-center flex-lg-row flex-column"
    >
      <b-col lg="6" cols="12" class="float-left px-0 mb-4 mb-lg-0">
        <img :src="country.flag" />
      </b-col>
      <b-col
        lg="6"
        cols="12"
        class="align-self-center d-flex flex-column float-left"
      >
        <h3 class="font-weight-bold mb-3">{{ country.name }}</h3>
        <b-col cols="12" class="float-left p-0">
          <b-col lg="6" cols="12" class="float-left pl-0 mb-4 mb-lg-0">
            <div class="mb-1">
              <span class="font-weight-bold small"> Native Name: </span>
              <span class="small"> {{ country.nativeName }} </span>
            </div>
            <div class="mb-1">
              <span class="font-weight-bold small"> Population: </span>
              <span class="small"> {{ country.population }} </span>
            </div>
            <div class="mb-1">
              <span class="font-weight-bold small"> Region: </span>
              <span class="small"> {{ country.region }} </span>
            </div>
            <div class="mb-1">
              <span class="font-weight-bold small"> Sub Region: </span>
              <span class="small"> {{ country.subregion }} </span>
            </div>
            <div>
              <span class="font-weight-bold small"> Capital: </span>
              <span class="small"> {{ country.capital }} </span>
            </div>
          </b-col>
          <b-col lg="6" cols="12" class="float-left pl-0 mb-2 mb-lg-0">
            <div class="mb-1">
              <span class="font-weight-bold small"> Top Level Domain: </span>
              <span class="small"> {{ country.topLevelDomain[0] }} </span>
            </div>
            <div class="mb-1">
              <span class="font-weight-bold small"> Currencies: </span>
              <span
                v-for="(currency, index) in country.currencies"
                :key="index"
                class="small"
              >
                {{ currency.code }}
                <span
                  v-if="
                    country.currencies.length > 1 &&
                    index + 1 < country.currencies.length
                  "
                  class="small"
                >
                  ,
                </span>
              </span>
            </div>
            <div>
              <span class="font-weight-bold small"> Languages: </span>
              <span
                v-for="(language, index) in country.languages"
                :key="index"
                class="small"
              >
                {{ language.name }}
                <span
                  v-if="
                    country.languages.length > 1 &&
                    index + 1 < country.languages.length
                  "
                  class="small"
                >
                  ,
                </span>
              </span>
            </div>
          </b-col>
        </b-col>
        <b-col cols="12" class="float-left pl-0 mt-4">
          <span class="font-weight-bold small"> Border Countries: </span>
          <span
            v-for="(border, index) in country.borders"
            :key="index"
            class="shadow-sm d-inline-block rounded-sm small px-3 m-1 border"
          >
            <router-link
              :to="'/country/' + border"
              class="text-decoration-none"
            >
              {{ border }}
            </router-link>
          </span>
        </b-col>
      </b-col>
    </b-col>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "countryDetails",
  data() {
    return {
      country: {},
    };
  },
  methods: {
    ...mapActions({
      getCountryByCode: "country/getCountryByCode",
    }),
    loadData() {
      const code = this.$route.params.code;
      this.getCountryByCode(code).then((response) => {
        this.country = response;
      });
    },
  },
  created() {
    this.loadData();
  },
  watch: {
    $route() {
      this.loadData();
    },
  },
};
</script>

<style lang="scss" scoped>
.detail-page {
  background: var(--secondary-background-color-main);
  .border {
    cursor: pointer;
    background: var(--primary-background-color-main) !important;
    border: 0px !important;
  }
  img {
    width: 95%;
    object-fit: cover;
    aspect-ratio: 2 / 1;
    @media (max-width: 992px) {
      width: 100%;
      height: 200px;
    }
  }
  .shadow-sm {
    box-shadow: 0 0rem 0.25rem rgb(0 0 0 / 8%) !important;
  }
}
</style>
