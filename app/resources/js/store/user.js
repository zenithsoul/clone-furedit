import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default{
    namespaced: true ,
    state: {
        UserId : "" ,
        UserName : "",
        UserDisply : ""
    },

    getters: {
        GET_USER_ID: (state) => {
            return state.UserId;
        },
        GET_USERNAME : (state) => {
            return state.UserName;
        },
        GET_USER_DISPLY: (state) => {
            return state.UserDisply;
        },
    },

    mutations: {

    },

    actions: {
        
    },
};