<template>
  <div id="detail">
    <detailNavbar
      class="detail-nav"
      @titleClick="titleClick"
      ref="nav"
    ></detailNavbar>

    <scroll
      class="content"
      ref="scroll"
      :pull-up-load="true"
      :probe-type="3"
      @scroll="contentscroll"
    >
      <detail-swiper :topimg="topimg" />
      <detail-base-info :goods="goods" />
      <detail-shop-info :shop="shop" />
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad" />
      <detail-param-info :param-info="paramInfo" ref="params" />
    </scroll>
    <detail-bottom-bar @addToCart="addToCart"></detail-bottom-bar>
    <backtop @click.native="backClick" v-show="isShowBackTop"></backtop>
  </div>
</template>

<script>
import detailNavbar from "./childCpns/detailNavbar";
import detailSwiper from "./childCpns/detailSwiper";
import DetailBaseInfo from "./childCpns/DetailBaseInfo";
import DetailShopInfo from "./childCpns/DetailShopInfo";
import DetailGoodsInfo from "./childCpns/DetailGoodsInfo";
import DetailParamInfo from "./childCpns/DetailParamInfo";
import DetailBottomBar from "./childCpns/DetailBottomBar.vue";

import Scroll from "components/common/scroll/scroll";
import backtop from "components/content/backtop/backtop";

import { getDetail, Goods, Shop, GoodsParam } from "network/detail";

import { debounce } from "common/utils";

export default {
  name: "detail",
  components: {
    detailNavbar,
    detailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailGoodsInfo,
    Scroll,
    DetailBottomBar,
    backtop,
  },
  data() {
    return {
      iid: null,
      topimg: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      themeTopYs: [],
      getThemeTopYs: null,
      currentIndex: 0,
      isShowBackTop: false,
    };
  },
  created() {
    //保存传入的iid
    this.iid = this.$route.params.iid;
    //根据iid请求详情数据
    getDetail(this.iid).then((res) => {
      // 1.获取顶部图片
      const data = res.result;
      this.topimg = res.result.itemInfo.topImages;
      // 2.获取商品信息
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );
      // 3.创建店铺信息的对象
      this.shop = new Shop(data.shopInfo);
      // 4.保存商品的详情数据
      this.detailInfo = data.detailInfo;
      // 5.获取参数的信息
      this.paramInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );

      // this.$nextTick(() => {
      //   this.themeTopYs = [];
      //   this.themeTopYs.push(0);
      //   this.themeTopYs.push(this.$refs.params.$el.offsetTop);
      // });
    });

    this.getThemeTopYs = debounce(() => {
      this.themeTopYs = [];
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.params.$el.offsetTop);
    }, 100);
  },
  mounted() {},
  methods: {
    imageLoad() {
      this.$refs.scroll.refresh();
      this.getThemeTopYs();
    },
    titleClick(index) {
      // console.log(index);
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 500);
    },
    contentscroll(position) {
      const positionY = -position.y;

      for (let i = 0; i < this.themeTopYs.length; i++) {
        if (
          this.currentIndex !== i &&
          ((i < this.themeTopYs.length - 1 &&
            positionY > this.themeTopYs[i] &&
            positionY < this.themeTopYs[i + 1]) ||
            (i === this.themeTopYs.length - 1 &&
              positionY > this.themeTopYs[i]))
        ) {
          this.currentIndex = i;
          // console.log(this.currentIndex);
          this.$refs.nav.currentIndex = this.currentIndex;
        }
      }

      //是否显示回到顶部
      this.isShowBackTop = positionY > 1000;
    },
    backClick() {
      this.$refs.scroll.scrollTo(0, 0, 500);
    },
    addToCart() {
      //1.获取购车需要展示的信息
      const product = {};
      product.image = this.topimg[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.realPrice;
      product.iid = this.iid;

      //2.将商品添加到购物车里
      // this.$store.commit("addCart", product);
      this.$store.dispatch("addCart", product);
    },
  },
};
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}

.detail-nav {
  position: relative;
  z-index: 9;
  background-color: #fff;
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