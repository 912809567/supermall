<template>
  <div id="home">
    <navbar class="homenavbgc"><div slot="center">购物街</div></navbar>
    <tabctrl
      :titles="['流行', '新款', '精选']"
      @tabclick="tabclick"
      ref="tabctrl1"
      class="tabctrl"
      v-show="tabctrlIsFixed"
    ></tabctrl>
    <scroll
      class="content"
      ref="scroll"
      :probeType="3"
      :pullUpLoad="true"
      @scroll="contentscroll"
      @pullingUp="loadMore"
    >
      <homeSwiper :banner="banner" @swiperimgload="swiperimgload"></homeSwiper>
      <recommendView :recommends="recommend"></recommendView>
      <weekHot></weekHot>
      <tabctrl
        :titles="['流行', '新款', '精选']"
        @tabclick="tabclick"
        ref="tabctrl2"
      ></tabctrl>
      <goodslist :goodslist="showGoods"> </goodslist>
    </scroll>
    <backtop @click.native="backtopclick" v-show="backtopShow"></backtop>
  </div>
</template>

<script>
import navbar from "components/common/navbar/navbar";
import homeSwiper from "./childComponents/homeSwiper";
import recommendView from "./childComponents/recommendView";
import weekHot from "./childComponents/weekHot";
import tabctrl from "components/content/tabctrl/tabctrl";
import goodslist from "components/content/goods/goodslist";
import goodslistitem from "components/content/goods/goodslistitem";
import scroll from "components/common/scroll/scroll";
import backtop from "components/content/backtop/backtop";

import { getHomeMultidata, getHomeGoods } from "network/home.js";
import { debounce } from "common/utils.js";

export default {
  name: "home",
  components: {
    navbar,
    homeSwiper,
    recommendView,
    weekHot,
    tabctrl,
    goodslist,
    goodslistitem,
    scroll,
    backtop,
  },
  data() {
    return {
      banner: [],
      recommend: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      currentType: "pop",
      backtopShow: false,
      tabctrloffsettop: 0,
      tabctrlIsFixed: false,
      saveY: 0,
    };
  },
  created() {
    //请求多个数据
    this.getHomeMultidata();
    //请求商品数据
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  mounted() {
    //监听 item 中图片加载完成，通过 $bus 事件总线发射事件
    this.$bus.$on(
      "itemimgload",
      debounce(() => {
        // console.log("refresh");
        this.$refs.scroll && this.$refs.scroll.refresh();
      }, 500)
    );
  },
  activated() {
    this.$refs.scroll && this.$refs.scroll.refresh();
    this.$refs.scroll.scrollTo(0, this.saveY, 0);
  },
  deactivated() {
    this.saveY = this.$refs.scroll.scroll.y;
  },
  methods: {
    /**
     * 事件监听
     */
    tabclick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }

      this.$refs.tabctrl1.currentIndex = index;
      this.$refs.tabctrl2.currentIndex = index;
    },
    backtopclick() {
      this.$refs.scroll.scrollTo(0, 0, 500);
    },
    contentscroll(position) {
      //回到顶部按钮显示和隐藏
      const scrollY = -position.y;
      this.backtopShow = scrollY > 1000 ? true : false;

      //tabctrl吸顶效果
      if (-position.y > this.tabctrloffsettop) {
        this.tabctrlIsFixed = true;
      } else {
        this.tabctrlIsFixed = false;
      }
    },
    loadMore() {
      this.getHomeGoods(this.currentType);
    },
    swiperimgload() {
      this.tabctrloffsettop = this.$refs.tabctrl2.$el.offsetTop;
    },
    /**
     * 网络请求相关
     */
    getHomeMultidata() {
      getHomeMultidata().then((res) => {
        this.banner = res.data.banner.list;
        this.recommend = res.data.recommend.list;
        this.titles = res.data.recommend.list;
      });
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then((res) => {
        this.goods[type].page += 1;
        this.goods[type].list.push(...res.data.list);

        this.$refs.scroll.finishPullUp();
        // for (const item of res.data.list) {
        //   this.goods[type].list.push(item);
        // }
      });
    },
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    },
  },
};
</script>

<style scoped>
#home {
  /* padding-top: 44px; */
  height: 100vh;
}

.homenavbgc {
  background-color: var(--color-tint);
  color: #fff;
}
.content {
  position: absolute;
  top: 44px;
  height: calc(100% - 93px);
  overflow: hidden;
}
.hidden {
  display: none;
}
.tabctrl {
  position: relative;
  z-index: 999;
  margin-top: -1px;
}
</style>