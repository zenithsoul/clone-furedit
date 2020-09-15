<template>
    <form @submit.prevent="newtopic" method="post">
        Topic : <input type="text" v-model="topicname" :disabled="GETTER_IS_LOGIN == 0"> <br />
        Content : <br />
        <textarea v-model="content" :disabled="GETTER_IS_LOGIN == 0" style="width:500px; height: 150px;" ></textarea> 
        <br />
        <button :disabled="GETTER_IS_LOGIN == 0" type="submit"> Submit </button>
    </form>
</template>
<script>
import { mapGetters,mapActions } from 'vuex'
import axios from 'axios';

export default {
    data () {
        return {
            topicname: '' ,
            content: '' 
        }
    },
    computed: {
        ...mapGetters({GETTER_IS_LOGIN: 'session/GET_SESSION'}) ,
        ...mapGetters({GETTER_BASE_URL: 'config/GET_BASE_URL'}) 
    },
    methods: {
        ...mapActions({CALL_ERROR_INIT: 'session/SET_ERROR_INIT'}),
        newtopic(){
            axios
            .post(this.GETTER_BASE_URL + '/newtopic',{topic_name: this.topicname , topic_content: this.content})
            .then(res => 
            {
                if(res.data.status == 1)
                {
                    this.redirect = true;
                    window.location.href = "/";
                }
                else
                {
                    this.CALL_ERROR_INIT(res.data.error);
                }
            })
            .catch(err => {
            });
        }
    }
}
</script>
<style>
</style>
