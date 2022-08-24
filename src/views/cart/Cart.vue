<template>
  <div class="cart">
    <!-- 顶部导航栏 -->
    <navbar class="nav-bar">
      <div slot="center">购物车({{ length }})</div>
    </navbar>

    <!-- 商品列表 -->
    <scroll class="content" ref="scroll" :probe-type="3" :pull-up-load="true">
      <cart-list></cart-list>
    </scroll>
    <CartBottomBar></CartBottomBar>
  </div>
</template>

<script>
import navbar from "components/common/navbar/navbar";
import CartList from "./childComps/CartList.vue";
import CartBottomBar from "./childComps/CartBottomBar.vue";

import scroll from "components/common/scroll/scroll";

import { mapGetters } from "vuex";

export default {
  name: "cart",
  components: {
    navbar,
    CartList,
    scroll,
    CartBottomBar
  },
  computed: {
    ...mapGetters({
      length: "cartLength",
      list: "cartList",
    }),
  },
};
</script>

<style scoped>
#cart {
  height: 100vh;
  position: relative;
}
.nav-bar {
  background-color: var(--color-tint);
  color: #fff;
}

.content {
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
</style>