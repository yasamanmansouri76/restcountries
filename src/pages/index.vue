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
      <b-col lg="3" cols="12" class="float-left mb-3 mb-lg-0">
        <b-button-group class="float-lg-right float-left">
          <b-button
            :class="activeSort === 'population' ? 'active' : ''"
            @click="handleSortCountries('population')"
          >
            <b-icon icon="sort-alpha-down"></b-icon>
            Population
          </b-button>
          <b-button
            :class="activeSort === 'name' ? 'active' : ''"
            @click="handleSortCountries('name')"
          >
            <b-icon icon="sort-numeric-down"></b-icon>
            Country Name
          </b-button>
        </b-button-group>
      </b-col>
      <b-col lg="3" cols="12" class="float-left">
        <b-form-select
          v-model="selectedRegion"
          class="mb-3"
          @input="handleFilterByRegion"
        >
          <b-form-select-option :value="null"
            >Please select an option</b-form-select-option
          >
          <b-form-select-option
            v-for="region in regions"
            :key="region.code"
            :value="region.code"
            >{{ region.name }}</b-form-select-option
          >
        </b-form-select>
      </b-col>
    </b-col>
    <b-col cols="12" class="float-left">
      <loading v-if="isCountriesLoading" />
      <span
        v-else-if="!isCountriesLoading && shownCountries.length <= 0"
        class="d-block text-center"
        >No record was founded!</span
      >
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
      <b-col
        v-if="
          !isCountriesLoading && shownCountries.length < allCountries.length
        "
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
import { mapActions, mapGetters } from "vuex";
import lodash from "lodash";

export default {
  name: "homePage",
  data() {
    return {
      selectedRegion: null,
      allCountries: [],
      shownCountries: [],
      page: 1,
      pageSize: 8,
      isCountriesLoading: true,
      searchVal: "",
      activeSort: "",
    };
  },
  components: {
    countryCard,
    loading,
  },
  computed: {
    ...mapGetters({
      getRegions: "enums/getRegions",
    }),
    regions() {
      return this.getRegions;
    },
  },
  methods: {
    ...mapActions({
      getAllCountries: "country/getAllCountries",
      getCountryByName: "country/getCountryByName",
      getCountryByRegion: "country/getCountryByRegion",
    }),
    loadAllData() {
      this.getAllCountries()
        .then((response) => {
          this.setData(response);
        })
        .catch(() => {
          this.resetData();
        });
    },
    handleFiltersChange(keyword, sort, region) {
      if (sort) {
        this.sortCountries(sort);
      } else if (keyword) {
        this.search(keyword);
      } else if (region) {
        this.filterByRegion(region);
      } else {
        this.resetAllFilters();
      }
    },
    handleSearch() {
      if (this.searchVal !== null) {
        this.resetSelectedRegion();
        this.resetSort();
        this.isCountriesLoading = true;
        this.getCountryByName(this.searchVal)
          .then((response) => {
            this.setData(response);
          })
          .catch(() => {
            this.resetData();
          });
      }
    },
    search(keyword) {
      this.searchVal = keyword;
      this.resetPageIndex();
      if (this.searchVal !== "") {
        this.handleSearch();
      } else {
        this.resetSort();
        this.loadAllData();
      }
    },
    handleFilterByRegion() {
      if (this.selectedRegion !== null) {
        this.$router.replace({
          query: { region: this.selectedRegion },
        });
      }
    },
    filterByRegion(region) {
      this.selectedRegion = region;
      if (this.selectedRegion !== null) {
        this.resetPageIndex();
        this.resetSort();
        this.resetSearchValue();
        this.isCountriesLoading = true;
        this.getCountryByRegion(this.selectedRegion)
          .then((response) => {
            this.setData(response);
          })
          .catch(() => {
            this.resetData();
          });
      }
    },
    handleSortCountries(sortField) {
      this.$router.replace({
        query: { ...this.$route.query, sort: sortField },
      });
    },
    sortCountries(sort) {
      this.activeSort = sort;
      this.allCountries.sort((a, b) => {
        if (typeof a[sort] === "string") {
          return a[sort].localeCompare(b[sort]);
        } else {
          return a[sort] - b[sort];
        }
      });
      this.resetPageIndex();
      this.shownCountries = [];
      this.getShownCountries();
    },
    getShownCountries() {
      const startIndex = (this.page - 1) * this.pageSize;
      const endIndex = this.pageSize * this.page;
      const countries =
        this.allCountries.length >= 8
          ? this.allCountries.slice(startIndex, endIndex)
          : this.allCountries;
      this.shownCountries.push(...countries);
      this.page++;
      this.isCountriesLoading = false;
    },
    resetAllFilters() {
      this.resetPageIndex();
      this.resetSort();
      this.resetSearchValue();
      this.resetSelectedRegion();
      this.loadAllData();
    },
    resetPageIndex() {
      this.page = 1;
    },
    setData(data) {
      this.allCountries = data;
      this.shownCountries = [];
      this.getShownCountries();
    },
    resetData() {
      this.allCountries = [];
      this.shownCountries = [];
      this.isCountriesLoading = false;
    },
    resetSelectedRegion() {
      this.selectedRegion = null;
    },
    resetSearchValue() {
      this.searchVal = null;
    },
    resetSort() {
      this.activeSort = "";
    },
  },
  created() {
    const { keyword, sort, region } = this.$route.query;
    this.handleFiltersChange(keyword, sort, region);
  },
  watch: {
    searchVal: lodash.debounce(function () {
      if (this.searchVal !== null) {
        this.$router.replace({
          query: { keyword: this.searchVal },
        });
      }
    }, 1000),
    $route() {
      const { keyword, sort, region } = this.$route.query;
      this.handleFiltersChange(keyword, sort, region);
    },
  },
};
</script>

<style lang="scss" scoped>
.home-page {
  background: var(--secondary-background-color-main);
  .active {
    border: 2px solid #38c138 !important;
    outline: none;
  }
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
    width: 100%;
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
