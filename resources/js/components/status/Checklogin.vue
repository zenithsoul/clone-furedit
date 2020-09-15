<template>
</template>
<script>
import { mapGetters,mapActions } from 'vuex'
export default {
  name : 'Checklogin',
  data() {
    return {
      isActive: false
    }
  },
  computed: {
    ...mapGetters({GETTER_ERROR_SESSION : 'session/GET_ERROR_SESSION'}),
    _session_error_state() {
        return this.GETTER_ERROR_SESSION;
    }
  },
  methods: {
    ...mapActions({CALL_ERROR_INIT: 'session/SET_ERROR_INIT'}),
    ...mapActions({CALL_ERROR_ZERO: 'session/SET_ERROR_ZERO'}),
  },
  watch:{
    _session_error_state(value){
      if(value == 1)
      {
        alert("Plz login");
        this.CALL_ERROR_ZERO();
      }
      else if(value != 0)
      {

      }
      else
      {

      }
    } 
  }
}
</script>
<style>

</style>
