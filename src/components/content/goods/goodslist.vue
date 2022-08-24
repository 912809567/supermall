<template>
  <div class="goods">
    <goodslistitem
      v-for="(item, index) in goodslist"
      :key="index"
      :goodsitem="item"
    ></goodslistitem>
  </div>
</template>

<script>
import goodslistitem from "./goodslistitem";
export default {
  name: "goodslist",
  props: {
    goodslist: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  components: {
    goodslistitem,
  },
};
</script>

<style>
.goods {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  margin-bottom: 47px;
}
</style>