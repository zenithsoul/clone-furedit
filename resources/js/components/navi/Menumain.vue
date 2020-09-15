<template>
  <div class="navbar-menu">
    <div class="navbar-end">
      <a class="navbar-item" href="/">Home</a>
      <a class="navbar-item" href="/logout" v-if="GETTER_IS_LOGIN == true"> Logout [ {{ GETTER_USERDISPLY }} ]</a>
      <a class="navbar-item" href="/loginpage" v-else> Login </a>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  name : 'Menumain',
  computed: {
    ...mapGetters({
      GETTER_IS_LOGIN : 'session/GET_SESSION' ,
      GETTER_USERDISPLY: 'user/GET_USER_DISPLY'
    }),
  },
  methods: {
  }
}

</script>