import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import goods from './modules/goods'
import user from './modules/user'
import menu from './modules/menu'
import image from './modules/image'
import category from './modules/shop/category'
import spec from './modules/shop/spec'
import type from './modules/shop/type'
import comment from './modules/shop/comment'

Vue.use(Vuex)

export default new Vuex.Store({
  getters,
  modules: {
    user,
    menu,
    goods,
    image,
    category,
    spec,
    type,
    comment,
  },
})
