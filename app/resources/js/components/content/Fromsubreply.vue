<template>
    <form method="post" @submit.prevent="newsubreply">
        <h4 class="title is-4">SUB RE-REPLY</h4>
        <textarea v-model="csreply" :disabled="GETTER_IS_LOGIN == 0 || submitCheck == 0" 
                  style="width:500px; height: 100px;" cols="30" rows="10">
        </textarea><br/>
        <button type="submit" :disabled="GETTER_IS_LOGIN == 0 || submitCheck == 0">SUBMIT SUB-REPLY</button>
    </form>
</template>
<script>
import { mapGetters,mapActions } from 'vuex'
import axios from 'axios';

export default {
    
    props: ['replyid'] ,
    data () {
        return {
            statusSubReply : 0 ,
            csreply : "" ,
            submitCheck : 1 
        }
    },
    computed: {
        ...mapGetters({GETTER_IS_LOGIN: 'session/GET_SESSION'}) ,
        ...mapGetters({GETTER_BASE_URL: 'config/GET_BASE_URL'}),
    },
    methods: {
        ...mapActions({CALL_ERROR_INIT: 'session/SET_ERROR_INIT'}),
        newsubreply()
        {
            this.submitCheck = 0;
            axios.post(this.GETTER_BASE_URL + '/newsubreply',
                { reply_id : this.replyid , csreply : this.csreply } )
                .then(res => 
                {
                    if(res.data.status == 1)
                    {
                        //console.log(res.data)
                        window.location.reload();
                    }
                    else
                    {
                        this.CALL_ERROR_INIT(res.data.error);
                    }
                })
                .catch(err => {

                });
            
            /*
            axios.post(this.GETTER_BASE_URL + '/newsubreply',
            { reply_id : e.target.reply_id._value , reply_idtest : e.target.reply_idtest._value } )
                .then(res => 
                {
                    
                    
                    if(res.data.status == 1)
                    {
                        console.log(res.data)
                    }
                    else
                    {
                        this.CALL_ERROR_INIT(res.data.error);
                    }
                    
                })
                .catch(err => {

                });
            */
        }
    },
    created: function() {
 
    }
}
</script>
<style scoped>

</style>