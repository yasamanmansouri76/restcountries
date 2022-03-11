<template>
  <b-col class="custom-nav px-5 py-3 shadow-sm">
    <h5 class="font-weight-bolder d-inline">Where in the world?</h5>
    <span
      class="float-right font-weight-bold small pointer"
      @click="$emit('changeTheme')"
    >
      <b-icon icon="moon" />
      Dark Mode
    </span>
  </b-col>
</template>
<script>
export default {
  name: "top-bar",
};
</script>
<style lang="scss">
.custom-nav {
  background: var(--primary-background-color-main) !important;
}
</style>
