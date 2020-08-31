<template>
    <div>
        <div v-for="reply in replys" :key="reply.reply_id" class="content">
            <div class="boxtopic">
                {{ reply.reply_article }}
                <hr />
                <div class="has-text-centered">
                    <form method="post" @submit.prevent="newsubreply">
                        <h4 class="title is-4">SUB RE-REPLY</h4>
                        <textarea v-model="csreply" :disabled="GETTER_IS_LOGIN == 0 || submitCheck == 0" 
                                style="width:500px; height: 100px;" cols="30" rows="10">
                        </textarea><br/>
                        <input type="hidden" :value="reply.reply_id" name="replyid" />
                        <button type="submit" :disabled="GETTER_IS_LOGIN == 0 || submitCheck == 0">SUBMIT SUB-REPLY</button>
                    </form>
                </div>
            </div>
        </div>
        <hr />
    </div>
</template>
<script>
import { mapGetters,mapActions } from 'vuex'
import axios from 'axios';

export default {
    
    props: ['replys'] ,
    data () {
        return {
            statusSubReply : 0 ,
            csreply : "" ,
            submitCheck : 1 ,
        }
    },
    computed: {
        ...mapGetters({GETTER_IS_LOGIN: 'session/GET_SESSION'}) ,
        ...mapGetters({GETTER_BASE_URL: 'config/GET_BASE_URL'}),
    },
    methods: {
        ...mapActions({CALL_ERROR_INIT: 'session/SET_ERROR_INIT'}),
        newsubreply(e){
            this.submitCheck = 0;
            axios
            .post(this.GETTER_BASE_URL + '/newsubreply',{ reply_id : e.target.replyid._value , reply_idtest : e.target.replyidtest._value})
            .then(res => 
            {
                console.log(res.data)
                /*
                if(res.data.status == 1)
                {
                    console.log(res.data)
                }
                else
                {
                    this.CALL_ERROR_INIT(res.data.error);
                }
                */
            })
            .catch(err => {

            });
        }
    },
    created: function() {
 
    }
}
</script>
<style scoped>
.boxtopic
{
    border: 1px solid rgb(200, 200, 200);
    padding: 10px;
}

.boxtopic:last-child
{
    margin-bottom: 0px;
}
</style>