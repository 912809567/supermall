<template>
  <div class="recommend">
    <div v-for="(item, index) in recommends" :key="index" class="recommenditem">
      <a :href="item.link">
        <img :src="item.image" alt="" />
        <div>{{ item.title }}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "recommendView",
  props: {
    recommends: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>

<style>
.recommend {
  display: flex;
  text-align: center;
  border-bottom: 10px solid #eee;
  padding: 20px 0;
}
.recommenditem {
  flex: 1;
}
.recommend img {
  width: 90%;
  margin-bottom: 10px;
}
</style>