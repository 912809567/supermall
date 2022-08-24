<template>
  <div>
    <navbar>
      <div slot="left" @click="backClick">
        <img src="~assets/img/common/back.svg" alt="" />
      </div>
      <div slot="center" class="title">
        <div
          :key="item"
          v-for="(item, index) in titles"
          class="title-item"
          :class="{ active: index === currentIndex }"
          @click="navClick(index)"
        >
          {{ item }}
        </div>
      </div>
    </navbar>
  </div>
</template>

<script>
import navbar from "components/common/navbar/navbar";

export default {
  name: "detailNavbar",
  components: {
    navbar,
  },
  data() {
    return {
      titles: ["商品", "参数", "评论", "推荐"],
      currentIndex: 0,
    };
  },
  methods: {
    navClick(index) {
      this.currentIndex = index;
      this.$emit("titleClick", index);
    },
    backClick() {
      this.$router.back();
    },
  },
};
</script>

<style scoped>
.title {
  display: flex;
  font-size: 13px;
}
.title-item {
  flex: 1;
}
.active {
  color: var(--color-high-text);
}
img {
  vertical-align: middle;
}
</style>