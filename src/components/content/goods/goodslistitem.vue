<template>
  <div class="goodslistitem" @click="itemClick">
    <!-- <a :href="goodsitem.link"> -->
    <img :src="showImage" alt="" @load="imageload" />
    <!-- </a> -->
    <div class="goodsinfo">
      <p>{{ goodsitem.title }}</p>
      <span class="price">{{ goodsitem.price }}￥</span>
      <span class="cfav">{{ goodsitem.cfav }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "goodslistitem",
  props: {
    goodsitem: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  methods: {
    imageload() {
      //通过$bus事件总线发射事件
      this.$bus.$emit("itemimgload");
    },
    itemClick() {
      this.$router.push("/detail" + this.goodsitem.iid);
    },
  },
  computed: {
    showImage() {
      return this.goodsitem.image || this.goodsitem.show.img;
    },
  },
};
</script>

<style>
.goodslistitem {
  /* padding: 10px; */
  width: 47%;
  padding-bottom: 40px;
  position: relative;
}
.goodslistitem img {
  width: 100%;
  border-radius: 5px;
}
.goodsinfo {
  font-size: 14px;
  position: absolute;
  bottom: 5px;
  left: 0;
  right: 0;
  overflow: hidden;
  text-align: center;
}
.goodsinfo p {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 3px;
}
.goodsinfo .price {
  color: var(--color-tint);
  margin-right: 20px;
}
.goodsinfo .cfav {
  position: relative;
}
.goodsinfo .cfav::before {
  content: "";
  position: absolute;
  left: -15px;
  top: 0;
  width: 14px;
  height: 14px;
  background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
}
</style>