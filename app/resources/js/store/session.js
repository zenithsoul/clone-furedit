import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default{
    namespaced: true ,
    state: {
        IsLogin: false ,
        ErrState : 0 ,
    },

    getters: {
        GET_SESSION: (state) => {
            return state.IsLogin
        },
        GET_ERROR_SESSION: (state) => {
            return state.ErrState
        }
    },

    mutations: {
        ERROR_INIT (state,payload) {
            state.ErrState = payload
        },
    },

    actions: {
        async SET_ERROR_INIT({ commit } , payload){
            return new Promise((resolve, reject) => {
                commit('ERROR_INIT' , payload)
                resolve()
            })
        },
        async SET_ERROR_ZERO({ commit }){
            return new Promise((resolve, reject) => {
                commit('ERROR_INIT' , 0)
                resolve()
            })
        }
    },
};