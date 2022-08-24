<template>
  <div class="tbitem" @click="itemClick">
    <div v-if="isActive"><slot name="item-icon"></slot></div>
    <div v-else><slot name="item-icon-active"></slot></div>
    <div :style="activeStyle"><slot name="item-text"></slot></div>
  </div>
</template> 

<script>
export default {
  name: "tabbaritem",
  props: {
    path: String,
    activeColor: {
      type: String,
      default: "red",
    },
  },
  data() {
    return {
      //   isActive: true,
    };
  },
  computed: {
    isActive() {
      return this.$route.path.indexOf(this.path);
    },
    activeStyle() {
      return this.isActive ? {} : { color: this.activeColor };
    },
  },
  methods: {
    itemClick() {
      this.$router.replace(this.path);
    },
  },
};
</script>   

<style>
.tbitem {
  flex: 1;
  text-align: center;
  height: 49px;
  font-size: 14px;
  /* line-height: 49px; */
}

.tbitem img {
  position: relative;
  width: 24px;
  width: 24px;
  top: 3px;
}
</style>