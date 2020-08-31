
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */
//window.Vue = require('vue');

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

import Vue from 'vue';
import Vuex from 'vuex'
import VueSession from 'vue-session'
import VueCookie from 'vue-cookie';
import VueResource from 'vue-resource';
import VueLocalStorage from 'vue-localstorage';

import axios from 'axios';

import user from './store/user';
import session from './store/session';

Vue.use(Vuex)
Vue.use(VueSession)
Vue.use(VueCookie);
Vue.use(VueResource)
Vue.use(VueLocalStorage)

Vue.http.interceptors.push(function (request, next) {
    request.headers['X-CSRF-TOKEN'] = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
    next();
});

const baseurl = "http://cenith.local";


const storeAll = new Vuex.Store({
    state:{
        _IsLogin: false ,
        _UserId : ""
    },
    mutations:{
        
    },
    modules: {
        user ,
        session
    },
});

const welcome = ()=> import(/* webpackChunkName: "js/welcome" */'./components/Welcome.vue')
const menumain  = ()=> import(/* webpackChunkName: "js/navimain" */'./components/navi/Menumain.vue')
const loginpage  = ()=> import(/* webpackChunkName: "js/loginpage" */'./components/login/LoginPage.vue')

new Vue
({ 
    el: '#app', 
    components: { 
        welcome , 
        menumain , 
        loginpage 
    },
    beforeCreate : function() {
        
        axios
            //.post(baseurl + '/xlr',{_tokenset : se_token})
            .get(baseurl + '/xlr')
            .then(response => { 
                if (response.data.IsSession == 1)
                    this.$store.state._IsLogin = true
                else
                    this.$store.state._IsLogin = false
            }) 
            .catch(error => {
                console.log( error )
            });


    },
    store: storeAll
}); 


Object.assign(state, newState) 

