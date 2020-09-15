import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default{
    namespaced: true ,
    state: {

    },

    getters: {
        getUserLogin : (state, getters, rootState) => {
            return rootState._IsLogin
        }
    },

    mutations: {

    },

    actions: {
        fetchLoginDetails({commit}) {
        
        }
    },
};