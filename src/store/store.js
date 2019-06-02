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
        id:null,
        menu: false,//左侧menu
        cate:'文档',//当前栏目名
        categorys:localStorage.getItem('categorys') ? localStorage.getItem('categorys') : '',
        tabbarPath: ['/', '/home', '/current', '/me'],//用于Tabbar的active效果
      /*   tabbarPath: ['/', '/home', '/current', '/friend', '/me'],//用于Tabbar的active效果 */
        detailContent:null,
        menus:[]
    },

    getters: {
        getId(state){
            return state.id
        },
        getTabbarShow(state) {
            return state.tabbarShow
        },
        getCategorys(state) {
            return state.categorys
        },
        getTabbarPath(state) {
            return state.tabbarPath
        },
        getDetailContent(state){
            return state.detailContent
        },
        getMenu(state){
            return state.menu
        },
        getCate(state){
            return state.cate
        },
        getMenus(state){
            return state.menus
        }
    },

    mutations: {
        setId(state, payload) {
            state.id = payload
        },
        updateTabbarShow(state, payload) {
            state.tabbarShow = payload
        },
        setCategorys(state,payload) {
            state.categorys = payload
        },
        setMenu(state,payload){
            state.menu = payload
        },
        setMenus(state,payload){
            state.menus = payload
        },
        setDetailContent(state,payload){
            state.detailContent = payload
        },
        setCate(state,payload){
            state.cate = payload
        }
    }
})