<template>
  <v-app>
    <v-app-bar app color="primary" dark></v-app-bar>
    <v-main>
      <v-container>
        <search-specialty />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import SearchSpecialty from "@/components/search/SearchSpecialty";

export default {
  name: "App",
  components: { SearchSpecialty },
};
</script>

<style lang="scss" scoped>
@import "src/assets/scss/style";
</style>
