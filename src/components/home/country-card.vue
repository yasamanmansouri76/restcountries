<template>
  <b-card class="border-0 shadow-sm" img-top>
    <b-img-lazy
      :src="country.flag"
      alt="Image 1"
      class="card-img-top"
      :blank="true"
      blank-color="#bbb"
      height="200px"
      width="100%"
    ></b-img-lazy>
    <h4 class="card-title p-3 mb-0">{{ country.name }}</h4>
    <b-card-text class="px-3 pb-3">
      <div>
        <span class="font-weight-bold small"> Population: </span>
        <span class="small"> {{ country.population }} </span>
      </div>
      <div>
        <span class="font-weight-bold small"> Region: </span>
        <span class="small"> {{ country.region }} </span>
      </div>
      <div>
        <span class="font-weight-bold small"> Capital: </span>
        <span class="small"> {{ country.capital }} </span>
      </div>
    </b-card-text>
  </b-card>
</template>

<script>
export default {
  name: "country-card",
  props: {
    country: {
      type: Object,
      required: true,
      default: () => {},
    },
  },
};
</script>

<style lang="scss">
.card {
  transition: 0.3s ease;
  background: var(--primary-background-color-main) !important;
  &:hover {
    transform: translateY(-10px);
  }
  .card-img-top {
    object-fit: cover;
  }
  .card-body {
    padding: 0px;
  }
}
</style>
