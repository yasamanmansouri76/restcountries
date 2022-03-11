<template>
  <div class="home-page float-left w-100 py-2 px-0 p-lg-4">
    <b-col cols="12" class="my-2 float-left">
      <b-col lg="6" cols="12" class="float-left">
        <div class="form-group">
          <b-icon class="form-icon" icon="search" />
          <input
            type="text"
            class="border-0 custom-input py-2 shadow-sm small"
            placeholder="Search for a country ..."
            v-model="searchVal"
          />
        </div>
      </b-col>
      <b-col lg="6" cols="12" class="float-left">
        <b-form-select v-model="selected" class="mb-3">
          <b-form-select-option :value="null"
            >Please select an option</b-form-select-option
          >
          <b-form-select-option value="a">Option A</b-form-select-option>
          <b-form-select-option value="b" disabled
            >Option B (disabled)</b-form-select-option
          >
        </b-form-select>
      </b-col>
    </b-col>
    <b-col cols="12" class="float-left">
      <loading v-if="isCountriesLoading && allCountries.length <= 0" />
      <b-card-group v-else deck>
        <b-col
          lg="3"
          cols="12"
          class="float-left py-4"
          v-for="country in shownCountries"
          :key="country.area"
        >
          <router-link
            :to="'/country/' + country.alpha3Code"
            class="text-dark text-decoration-none"
          >
            <country-card :country="country" />
          </router-link>
        </b-col>
      </b-card-group>
      <loading v-if="isCountriesLoading && allCountries.length > 0" />
      <b-col
        v-if="shownCountries.length < allCountries.length"
        class="text-center float-right my-3 w-100"
      >
        <b-button
          @click="getShownCountries"
          variant="outline-secondary"
          class="border-0 shadow-sm px-4"
        >
          Load More
        </b-button>
      </b-col>
    </b-col>
  </div>
</template>

<script>
import countryCard from "../components/home/country-card";
import loading from "../components/loading";
import { mapActions } from "vuex";
import lodash from "lodash";

export default {
  name: "homePage",
  data() {
    return {
      selected: null,
      allCountries: [],
      shownCountries: [],
      page: 2,
      pageSize: 8,
      isCountriesLoading: true,
      searchVal: "",
    };
  },
  components: {
    countryCard,
    loading,
  },
  methods: {
    ...mapActions({
      getAllCountries: "country/getAllCountries",
      getCountryByName: "country/getCountryByName",
    }),
    loadAllData() {
      this.getAllCountries().then((response) => {
        this.allCountries = response;
        this.shownCountries = [];
        this.getShownCountries();
      });
    },
    getShownCountries() {
      this.isCountriesLoading = true;
      const start = (this.page - 1) * this.pageSize;
      const end = this.pageSize * this.page;
      this.shownCountries.push(...this.allCountries.slice(start, end));
      this.page++;
      this.isCountriesLoading = false;
    },
    search() {
      this.getCountryByName(this.searchVal).then((response) => {
        this.allCountries = response;
        this.shownCountries = response;
      });
    },
  },
  created() {
    this.loadAllData();
  },
  watch: {
    searchVal: lodash.debounce(function () {
      if (this.searchVal !== "") {
        this.search();
      } else {
        this.loadAllData();
      }
    }, 2000),
  },
};
</script>

<style lang="scss">
.home-page {
  background: var(--secondary-background-color-main);
  .form-group {
    position: relative;
  }
  .form-icon {
    position: absolute;
    right: initial;
    left: 14px;
    color: var(--gray);
    top: 13px;
    font-size: 15px;
  }
  .custom-input {
    padding-right: 12px;
    padding-left: 40px;
    border-radius: 2px;
    width: 55%;
    height: 42px;
    &:focus {
      outline: none;
    }
    @media (max-width: 992px) {
      width: 100%;
    }
  }
  .custom-select {
    border: none;
    border-radius: 2px;
    box-shadow: 0 0.125rem 0.25rem rgb(0 0 0 / 8%) !important;
    float: right;
    width: 30%;
    font-size: 80%;
    font-weight: 400;
    height: 42px;
    &:focus {
      outline: none;
    }
    @media (max-width: 992px) {
      width: 60%;
      float: left;
    }
  }
}
</style>
