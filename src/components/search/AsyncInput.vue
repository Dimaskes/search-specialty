<template>
  <div class="search__wrapper" v-click-outside="unFocusHandler">
    <ul :class="{ 'search__label-active': isActiveLabel }" id="search">
      <v-icon
        class="clear-icon"
        v-if="selectedItems.length"
        @click="clearSelectedItems"
      >
        mdi-close
      </v-icon>
      <li v-for="(item, index) in selectedItems" :key="item.id || item">
        {{ item[itemOption] || item }}{{ getSelectedPostfix(index) }}
      </li>
      <input
        type="text"
        ref="searchInput"
        autocomplete="off"
        v-model.trim="searchInput"
        @input="changeValue"
        @focus="isFocused = true"
      />
    </ul>
    <label
      for="search"
      class="search__label"
      :class="{ 'search__label-active': searchInput }"
    >
      {{ label }}
    </label>
    <dropdown-menu
      @selectItem="selectItem"
      :empty-text="emptyText"
      :isOpen="isFocused"
      :items="filteredItems"
      :search="searchInput"
      :option="itemOption"
      :group-name="groupName"
    />
  </div>
</template>

<script>
import { debounce } from "lodash";

import DropdownMenu from "@/components/search/DropdownMenu";

export default {
  name: "async-input",
  components: { DropdownMenu },
  props: {
    value: {
      type: String,
      required: true,
    },
    items: {
      type: Array,
      default: () => [],
    },
    itemOption: {
      type: String,
      default: "",
    },
    label: {
      type: String,
      required: true,
    },
    emptyText: {
      type: String,
      required: true,
    },
    groupName: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      isFocused: false,
      searchInput: "",
      selectedItems: [],
    };
  },
  computed: {
    filteredItems() {
      return this.excludeSelectedItemsArr.filter((item) =>
        item.title.toLowerCase().includes(this.value.toLowerCase())
      );
    },
    excludeSelectedItemsArr() {
      return this.items.filter((item) => !this.selectedItems.includes(item));
    },
    isActiveLabel() {
      return this.selectedItems.length || this.value || this.isFocused;
    },
  },
  methods: {
    changeValue: debounce(function () {
      this.$emit("input", this.searchInput);
    }, 600),
    selectItem(item) {
      this.selectedItems.push(item);

      this.clearSearchInput();
      this.$refs.searchInput.focus();
    },
    getSelectedPostfix(index) {
      return index + 1 === this.selectedItems.length ? "" : ",";
    },
    clearSelectedItems() {
      this.selectedItems.splice(0, this.selectedItems.length);
    },
    clearSearchInput() {
      this.searchInput = "";
      this.$emit("input", "");
    },
    unFocusHandler() {
      this.isFocused = false;
      this.clearSearchInput();
    },
  },
};
</script>

<style scoped lang="scss">
@import "../../assets/scss/variables";

.search {
  &__wrapper {
    font-size: $main-fz;
    line-height: $main-lh;
    min-height: $input-height;
    width: 430px;
    position: relative;
    font-family: $main-font;
    font-size: $main-fz;
    line-height: $main-lh;

    ul {
      height: 100%;
      width: 100%;
      list-style: none;

      display: flex;
      gap: 8px;
      align-items: center;
      flex-wrap: wrap;
      border-radius: 10px;
      background-color: $color-hover;
      padding: 21px 35px 10px 20px;

      &.search__label-active {
        border: 1px solid $color-border;
        border-radius: 10px;
        padding-bottom: 9px;

        & + .search__label {
          top: 8px;
          letter-spacing: 0.3px;
          color: $color-grey-light;
          font-size: $small-fz;
          line-height: $small-lh;
        }
      }

      .clear-icon {
        position: absolute;
        font-size: $main-fz;
        top: 50%;
        transform: translateY(-50%);
        right: 10px;
        cursor: pointer;
      }
    }

    input {
      flex: 1 1 0;
      height: 100%;
      width: 100%;
      outline: none;
    }

    li {
      cursor: default;
    }
  }

  &__label {
    color: $color-placeholder;
    position: absolute;
    left: 20px;
    top: 15px;
    height: 100%;
    width: 100%;
    pointer-events: none;
    transition: all 0.3s ease-in-out;
  }
}
</style>
