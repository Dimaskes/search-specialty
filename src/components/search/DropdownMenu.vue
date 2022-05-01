<template>
  <div
    class="dropdown-list"
    :class="{ active: isOpen }"
    @scroll="scrollHandler"
  >
    <ul v-if="visibleItems.length">
      <li
        v-if="groupName"
        class="dropdown-list__item dropdown-list__item-group"
      >
        {{ groupName }}
      </li>
      <li
        v-for="item in visibleItems"
        :key="item.id || item"
        class="dropdown-list__item"
        @click.prevent="selectItem(item)"
        v-html="getOptionText(item[option] || item)"
      ></li>
    </ul>
    <div class="dropdown-list__empty" v-else>{{ emptyText }}</div>
  </div>
</template>

<script>
/*
  TODO:
    костыль в виде visibleItems и сопутствующих функций из-за отсутсвия api.
    по-хорошему, должен быть emit для получения следующих записей.
*/
export default {
  name: "dropdown-menu",
  props: {
    isOpen: {
      type: Boolean,
      required: true,
    },
    items: {
      type: Array,
      required: true,
    },
    option: {
      type: String,
      default: "",
    },
    groupName: {
      type: String,
      default: "",
    },
    search: {
      type: String,
      default: "",
    },
    emptyText: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      visibleItems: [],
      pageSize: 10,
    };
  },
  watch: {
    items: function (value) {
      this.visibleItems = value.slice(0, this.pageSize);
    },
  },
  methods: {
    getOptionText(text) {
      if (!this.search || !this.hasMatchedSubstring(text, this.search))
        return text;

      const indexOfMatch = text
        .toLowerCase()
        .indexOf(this.search.toLowerCase());

      return this.getHighlightedText(text, indexOfMatch, this.search.length);
    },
    getHighlightedText(text, startIndex, endIndex) {
      return (
        text.slice(0, startIndex) +
        "<b>" +
        text.slice(startIndex, startIndex + endIndex) +
        "</b>" +
        text.slice(startIndex + endIndex, text.length)
      );
    },
    hasMatchedSubstring(text, match) {
      return text.toLowerCase().includes(match.toLowerCase());
    },
    selectItem(item) {
      this.$emit("selectItem", item);
    },
    scrollHandler(elem) {
      const visibleLength = this.visibleItems.length;
      if (this.isScrollEnd(elem) && visibleLength < this.items.length) {
        this.visibleItems = [
          ...this.visibleItems,
          ...this.items.slice(visibleLength, visibleLength + this.pageSize),
        ];
      }
    },
    isScrollEnd(elem) {
      return (
        elem.target.offsetHeight + elem.target.scrollTop >=
        elem.target.scrollHeight
      );
    },
  },
};
</script>

<style scoped lang="scss">
@import "../../assets/scss/variables";

.dropdown-list {
  position: absolute;
  left: 0;
  width: 100%;
  opacity: 0;
  z-index: -1;
  margin-top: 8px;
  box-shadow: 0px 14px 24px rgba(31, 49, 73, 0.25);
  max-height: 280px;
  border-radius: 5px;
  background-color: $color-white;
  transition: opacity 0.3s ease-in-out;
  overflow-y: auto;

  &.active {
    opacity: 1;
    z-index: 100;
  }

  &__empty {
    height: 50px;
    overflow-y: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  &__item {
    width: 100%;
    height: 30px;
    padding: 4px 0 4px 14px;
    letter-spacing: 0.1px;
    color: $color-text;
    font-size: $list-fz;
    line-height: $list-lh;

    &:hover:not(.dropdown-list__item-group) {
      background-color: $color-hover;
      cursor: pointer;

      &:last-child {
        border-radius: 5px;
      }
    }

    &-group {
      border-bottom: 1px solid $color-border-light;
      color: $color-grey;
    }
  }
}
</style>
