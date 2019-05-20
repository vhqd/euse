import Vue from 'vue'
import Vuex from 'vuex'
import menusModule from '../../static/menusModule.js'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        menusModule
    },
    state: {
        tabbarShow: true,//控制是否显示Tabbar
        menu: false,//左侧menu
        tabbarPath: ['/', '/home', '/search', '/friend', '/me'],//用于Tabbar的active效果
        detailContent:null
    },

    getters: {
        getTabbarShow(state) {
            return state.tabbarShow
        },
        getTabbarPath(state) {
            return state.tabbarPath
        },
        getDetailContent(state){
            return state.detailContent
        },
        getMenu(state){
            return state.menu
        }
    },

    mutations: {
        updateTabbarShow(state, payload) {
            state.tabbarShow = payload
        },
        setMenu(state,payload){
            state.menu = payload
        },
        setDetailContent(state,payload){
            state.detailContent = payload
        }
    }
})