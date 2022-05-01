<template>
  <div class="search__container">
    <async-input
      v-model="search"
      :items="specialtyList"
      item-option="title"
      groupName="Специальность"
      empty-text="Не найдено специальностей"
      label="Врач, заболевания, услуги"
    />
    <div class="search__actions">
      <button type="button" class="search__button" @click="loadSpecialty">
        Найти
      </button>
    </div>
  </div>
</template>

<script>
import { getSpecialty } from "@/api/specialty";

import AsyncInput from "@/components/search/AsyncInput";

export default {
  name: "search-specialty",
  components: { AsyncInput },
  data() {
    return {
      specialtyList: [],
      search: "",
    };
  },
  methods: {
    loadSpecialty() {
      getSpecialty()
        .then(({ data }) => {
          this.specialtyList = data;
        })
        .catch((err) => {
          console.log(`Error in method GET json/specialty.json - ${err}`);
        });
    },
  },
  mounted() {
    this.loadSpecialty();
  },
};
</script>

<style scoped lang="scss">
@import "../../assets/scss/variables";
.search__container {
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: center;
  margin-top: 40px;
  max-width: 1200px;
}
.search__button {
  font-weight: 600;
  font-size: 17px;
  line-height: $list-lh;
  color: $color-white;
  background-color: $color-main;
  padding: 17px 25px;
  border-radius: 10px;
}
</style>
