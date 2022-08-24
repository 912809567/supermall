<template>
  <Swiper>
    <SwiperItem v-for="(item, index) in banner" :key="index">
      <a :href="item.link">
        <img :src="item.image" alt="" @load="swiperimgload" />
      </a>
    </SwiperItem>
  </Swiper>
</template>

<script>
import { Swiper, SwiperItem } from "components/common/swiper";

export default {
  name: "homeSwiper",
  components: {
    Swiper,
    SwiperItem,
  },
  data() {
    return {
      isLoad: false,
    };
  },
  props: {
    banner: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  methods: {
    swiperimgload() {
      if (!this.isLoad) {
        this.$emit("swiperimgload");
        this.isLoad = !this.isLoad;
      }
    },
  },
};
</script>

<style>
/* .swiper { */
/* margin-top: 22px; */
/* } */
</style>