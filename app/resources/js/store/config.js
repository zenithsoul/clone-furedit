import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default{
    namespaced: true ,
    state: {
        BaseURL : "http://127.0.0.1:8000"
    },

    getters: {
        GET_BASE_URL: (state) => {
            return state.BaseURL
        }
    },

    mutations: {

    },

    actions: {
        
    },
};