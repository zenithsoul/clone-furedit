<template>
    <div v-if="loading == 1">
        Loading {{ topicid }}
    </div>
    <div v-else>
        <h1 class="title">{{ dataTopic.topic_name }} || <onlineuser :rootcontentid="dataTopic.topic_id" /> </h1>
        <hr />
        <div class="boxtopic">
            <p>{{ dataTopic.topic_article }}</p>
            <br />
            <votees 
                :endorsement="dataTopic.topic_endorsement"
                :endorsement_total="dataTopic.topic_endorsement_total"
                :contentid="dataTopic.topic_id"
                :userid="dataTopic.topic_by_userid"
                :useresvote="dataTopic.topic_es_userkey"
            />
            <voteupdown 
                :voteuptotal="dataTopic.topic_vote_up_total"
                :voteup="dataTopic.topic_vote_up" 
                :votedowntotal="dataTopic.topic_vote_down_total"
                :votedown="dataTopic.topic_vote_down" 
                :contentid="dataTopic.topic_id"
                :chkuser="dataTopic.topic_vote_userkey"
            />
            
            <p>TOPIC = By {{ dataTopic.topic_by_usertitle }} </p>
        </div>
        <hr />
        <div v-for="reply in dataTopic.reply" :key="reply.reply_id"  class="boxtopic-reply">
            <p> {{ reply.reply_article }} </p>
            <br />
            <votees 
                :endorsement="reply.reply_endorsement"
                :endorsement_total="reply.reply_endorsement_total"
                :contentid="reply.reply_id"
                :userid="reply.reply_by_userid"
                :useresvote="reply.reply_es_userkey"
            />
            <voteupdown 
                :voteuptotal="reply.reply_vote_up_total"
                :voteup="reply.reply_vote_up"
                :votedowntotal="reply.reply_vote_down_total"
                :votedown="reply.reply_vote_down"
                :contentid="reply.reply_id"
                :chkuser="reply.reply_vote_userkey"
            />
            <p>REPLY = By {{ reply.reply_by_usertitle }} </p>
            <hr />
            <div v-for="subreply in reply.subreply" :key="subreply.subreply_id" class="boxtopic-subreply">
                <p> {{ subreply.subreply_article }} </p>
                <br />
                <votees 
                    :endorsement="subreply.subreply_endorsement"
                    :endorsement_total="subreply.subreply_endorsement_total"
                    :contentid="subreply.subreply_id"
                    :userid="subreply.subreply_by_userid"
                    :useresvote="subreply.subreply_es_userkey"
                />
                <voteupdown
                    :voteuptotal="subreply.subreply_vote_up_total"
                    :voteup="subreply.subreply_vote_up" 
                    :votedowntotal="subreply.subreply_vote_down_total"
                    :votedown="subreply.subreply_vote_down"
                    :contentid="subreply.subreply_id"
                    :chkuser="subreply.subreply_vote_userkey"
                />
                <p>SUBREPLY = By {{ subreply.subreply_by_usertitle }} </p>
            </div>
            <div class="has-text-centered">
                <fromsubreply :replyid="reply.reply_id"></fromsubreply>
            </div>
        </div>
        <hr />
        <div class="has-text-centered">
            <form method="post" @submit.prevent="newreply">
                <h4 class="title is-4">REPLY</h4>
                <textarea v-model="creply" :disabled="GETTER_IS_LOGIN == 0 || submitCheck == 0" 
                          style="width:500px; height: 150px;" cols="30" rows="10">
                </textarea><br/>
                <button type="submit" :disabled="GETTER_IS_LOGIN == 0 || submitCheck == 0">SUBMIT REPLY</button>
            </form>
        </div>
    </div>
</template>
<script>
import { mapGetters,mapActions } from 'vuex'
import axios from 'axios'
import Fromsubreply from './Fromsubreply.vue'
import Voteupdown from './Voteupdown.vue'
import Voteendorsement from './Voteendorsement.vue'
import Onlineuser from './Onlineuser.vue'

export default {
    props: ['topicid'] ,
    data () {
        return {
            loading : 1 ,
            dataTopic : "" ,
            creply : "" ,
            submitCheck : 1
        }
    },
    computed: {
        ...mapGetters({GETTER_IS_LOGIN: 'session/GET_SESSION'}) ,
        ...mapGetters({GETTER_BASE_URL: 'config/GET_BASE_URL'}),
    },
    methods: {
        ...mapActions({CALL_ERROR_INIT: 'session/SET_ERROR_INIT'}),
        newreply(){
            this.submitCheck = 0;
            axios
            .post(this.GETTER_BASE_URL + '/newreply',{creply: this.creply,cid: this.topicid })
            .then(res => 
            {
                if(res.data.status == 1)
                {
                    console.log(res.data)
                    window.location.reload();
                }
                else
                {
                    this.CALL_ERROR_INIT(res.data.error);
                }
                
            })
            .catch(err => {

            });
            
        }
    },
    created: function() {
        this.loading = 1
        axios
        .post(this.GETTER_BASE_URL + '/gettopic',{topicid : this.topicid})
        .then(res => 
        {
            this.loading = 0;
            this.dataTopic = res.data[0];
        })
        .catch(err => {
            console.log("Cannot Get Data")
        });
    },
    components: {
        'fromsubreply': Fromsubreply ,
        'voteupdown': Voteupdown ,
        'votees': Voteendorsement ,
        'onlineuser': Onlineuser
    }
}
</script>
<style scoped>
.boxtopic
{
    border: 1px solid black;
    padding: 10px;
}
.boxtopic-reply
{
    border: 1px solid rgb(107, 107, 107);
    padding: 10px;
    margin-bottom: 10px;
}
.boxtopic-reply:last-child
{
    margin-bottom: 0px;
}
.boxtopic-subreply
{
    border: 1px solid rgb(189, 189, 189);
    padding: 10px;
    margin-bottom: 10px;
}
.boxtopic-subreply:last-child
{
    margin-bottom: 0px;
}
</style>