<template>
  <div class="tabctrl">
    <div
      v-for="(item, index) in titles"
      :key="index"
      tabindex="1"
      @click="itemClick(index)"
    >
      <span :class="{ ctrlpink: currentIndex == index }">{{ item }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "tabctrl",
  data() {
    return {
      currentIndex: 0,
    };
  },
  props: {
    titles: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  methods: {
    itemClick(index) {
      this.currentIndex = index;
      this.$emit("tabclick", index);
    },
  },
};
</script>

<style>
.tabctrl {
  background-color: #fff;
  /* background-color: aqua; */
  height: 44px;
  display: flex;
  text-align: center;
  font-size: 18px;
  /* line-height: 44px; */
}
.tabctrl div {
  flex: 1;
}

.tabctrl span {
  /* background-color: yellow; */
  display: inline-block;
  margin-top: 11px;
  padding: 2px 2px;
}

/* .tabctrl div:focus span {
  color: var(--color-tint);
  border-bottom: 3px solid var(--color-tint);
} */

.ctrlpink {
  color: var(--color-tint);
  border-bottom: 3px solid var(--color-tint);
}
</style>