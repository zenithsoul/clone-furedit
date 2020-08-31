<template>
 <div class="has-text-centered">
   <form @submit.prevent="loginUser" method="post">
    <h1>Login</h1>
    <hr />
    <label>Username</label>
    <input type="text" placeholder="Username" v-model="username" />
    <hr />
    <label>Password</label>
    <input type="password" placeholder="Password" v-model="password"/>
    <hr />
    <button type="submit" >Login</button>
    <div class="error" v-if="this.errLogin == 1">Username or Password is wrong</div>
    <!--
    <h1>Login</h1>
    <hr />
    <label>Username</label>
    <input type="text" placeholder="Username" v-model="username"/>
    <div class="error" v-if="!$v.username.required">Field is required</div>
    <div class="error" v-if="!$v.username.minLength">Name must have at least {{$v.username.$params.minLength.min}} letters.</div>
    <hr />
    <label>Password</label>
    <input type="password" placeholder="Password" v-model="password"/>
    <div class="error" v-if="!$v.password.required">Field is required</div>
    <div class="error" v-if="!$v.password.minLength">Name must have at least {{$v.password.$params.minLength.min}} letters.</div>
    <hr />
    <button type="submit" 
      :disabled="
      !$v.password.minLength || 
      !$v.username.minLength || 
      !$v.username.required || 
      !$v.password.required
      ">Login</button>
    <div class="error" v-if="this.errLogin">Username or Password is wrong</div>
    -->
   </form>
 </div>
</template>
<script>

import { required, minLength, between } from 'vuelidate/lib/validators'
import { mapGetters } from 'vuex'
import axios from 'axios';

export default {
  name : 'Loginpage',
  data () {
    return {
      username: '',
      password: '',
      errLogin : 0 ,
      redirect: false 
    }
  },
  computed: {
    ...mapGetters({GET_BASE_URL : 'config/GET_BASE_URL'}) ,
    ...mapGetters({GET_SESSION : 'session/GET_SESSION'}),
    _session_IsLogin() {
        return this.GET_SESSION;
    }
  },
  methods: {
    loginUser(){
      axios
        .post(this.GET_BASE_URL + '/login',{username: this.username , password: this.password})
        .then(res => {
         if(res.data.getsession == 1)
         {
           this.redirect = true
         }
         else
         {
           this.errLogin = 1
         }
          //console.log(res);
        })
        .catch(err => {
          
        });
    }
  },
  watch: {
    redirect: function(value){
      if(value == true){
        location.href =  "/";
      }
    },
    _session_IsLogin: function(value){
      if(value == true){
        location.href =  "/";
      }
    }
  },
  /*
  validations: {
    username:{
      required ,
      minLength: minLength(4)
    },
    password:{
      required ,
      minLength: minLength(4)
    },
  },*/
}




</script>
<style lang="scss" scoped>

</style>