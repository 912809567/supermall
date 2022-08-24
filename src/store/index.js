import Vue from 'vue'
import Vuex from 'vuex'

import mutations from './mutations'
import actions from './actions'
import getters from './getters'

//1.安装插件
Vue.use(Vuex)


const state = {
    cartList: []
}
//2.创建store对象
const store = new Vuex.Store({
    state,
    mutations
    // : 
    // {
    //     addCounter(state, payload) {
    //         payload.count++
    //     },
    //     addToCart(state, payload) {
    //         state.cartList.push(payload)
    //     }
    // }
    ,
    actions
    // : {
    //     addCart(context, payload) {
    //         //查找是否有该商品
    //         let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)

    //         //判断oldProduct
    //         if (oldProduct) {
    //             context.commit('addCounter', oldProduct)
    //         } else {
    //             payload.count = 1
    //             // state.cartList.push(payload)
    //             context.commit('addToCart', payload)
    //         }
    //     }
    // }
    ,
    getters
})

//3.挂载Vue实例
export default store