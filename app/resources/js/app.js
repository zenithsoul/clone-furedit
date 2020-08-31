import Vue from 'vue';
import Vuex from 'vuex'
import VueResource from 'vue-resource';
import Vuelidate from 'vuelidate'
import VueMeta from 'vue-meta';

import axios from 'axios';
//import Fingerprint2 from 'fingerprintjs2';

import config from './store/config.js';
import user from './store/user.js';
import session from './store/session.js';

import socketio from 'socket.io-client';
import VueSocketIO from 'vue-socket.io-extended';

export const SocketInstance = socketio('127.0.0.1:3000' , {path: '/channel' });

Vue.use(Vuex)
Vue.use(VueResource)
Vue.use(Vuelidate)
Vue.use(VueMeta)

const tag_navimain  = ()=> import(/* webpackChunkName: "js/tag_navimain" */'./components/navi/Menumain.vue')
const tag_welcome = ()=> import(/* webpackChunkName: "js/tag_welcome" */'./components/Welcome.vue')
const tag_footermain  = ()=> import(/* webpackChunkName: "js/tag_footermain" */'./components/footer/Footermain.vue')
const tag_loginpage  = ()=> import(/* webpackChunkName: "js/tag_loginpage" */'./components/login/LoginPage.vue')
const tag_checklogin  = ()=> import(/* webpackChunkName: "js/tag_checklogin" */'./components/status/Checklogin.vue')
const tag_createtopic  = ()=> import(/* webpackChunkName: "js/tag_createtopic" */'./components/content/Createtopic.vue')
const tag_alltopic  = ()=> import(/* webpackChunkName: "js/tag_alltopic" */'./components/content/Topic.vue')
const tag_topic  = ()=> import(/* webpackChunkName: "js/tag_alltopic" */'./components/content/Topicdetail.vue')


const storeAll = new Vuex.Store({
    actions: {
        loadData({commit}){
            axios
            .get(config.state.BaseURL + '/init')
            .then(response => {
               if (response.data.IsSession == true)
               {
                    commit('updateUserSession',true)
                    commit('updateUserID',response.data.UserId)
                    commit('updateUserName',response.data.UserName)
                    commit('updateUserDisply',response.data.UserDisply)
               }
               else
               {
                    commit('updateUserSession',false)
                    commit('updateUserID',"")
                    commit('updateUserName',"")
                    commit('updateUserDisply',"")
               }
            })
            .catch(error => {
                //console.log( error )
            });
        },
    },
    mutations:{
        updateUserSession: (state,payload) => {
            session.state.IsLogin = payload
        },
        updateUserID: (state,payload) => {
            user.state.UserId = payload
        },
        updateUserName: (state,payload) => {
            user.state.UserName = payload
        },
        updateUserDisply: (state,payload) => {
            user.state.UserDisply = payload
        },
    },
    modules: {
        config,
        user ,
        session
    },
});

Vue.use(VueSocketIO, SocketInstance , storeAll) 

new Vue
({ 
    el: '#app',
    store: storeAll,
    components: {
        'tag_navimain' : tag_navimain,
        'tag_welcome' : tag_welcome,
        'tag_footermain' : tag_footermain,
        'tag_loginpage' : tag_loginpage,
        'tag_checklogin' : tag_checklogin,
        'tag_createtopic' : tag_createtopic,
        'tag_alltopic' : tag_alltopic ,
        'tag_topic': tag_topic

    },
    beforeCreate() {
    },
    created(){
        this.$store.dispatch('loadData')
    }
}); 

