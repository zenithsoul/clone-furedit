<template>
    <div>
        ========================= <br />
        Endorsement [ {{ es_total }} ] <br />
        <div v-if="set_useresvote != 'none'">
            <span v-html="status_es"></span>
        </div>
        <div v-else-if="GETTER_USER_ID == userid">
            <span class="setblack">You can't endorsement your content</span>
        </div>
        <div v-else>
            Endorsement 
            <button type="button" v-on:click="set_es_content('es_helpful')" :disabled="this.GETTER_USER_ID == this.userid"> Helpful </button>
            <button type="button" v-on:click="set_es_content('es_truth')" :disabled="this.GETTER_USER_ID == this.userid"> Truth </button>
            <button type="button" v-on:click="set_es_content('es_happy')" :disabled="this.GETTER_USER_ID == this.userid"> Happy  </button>
            <button type="button" v-on:click="set_es_content('es_positive')" :disabled="this.GETTER_USER_ID == this.userid"> Positive </button>
        </div>
        
        ========================= <br />
    </div>
</template>
<script>
import { mapGetters,mapActions } from 'vuex'
import axios from 'axios'

export default {
    props: [ 'endorsement' , 'endorsement_total' , 'contentid' , 'userid' , 'useresvote'] ,
    data () {
        return {
            setupdata : 1 ,
            es_total : 0 ,
            set_useresvote : "",
            get_useresvote : "",
            status_es : ""
        }
    },
    computed: {
        ...mapGetters({ GETTER_IS_LOGIN: 'session/GET_SESSION' }) ,
        ...mapGetters({ GETTER_BASE_URL: 'config/GET_BASE_URL' }),
        ...mapGetters({ GETTER_USER_ID: 'user/GET_USER_ID' }),
    },
    methods: {
        ...mapActions({ CALL_ERROR_INIT: 'session/SET_ERROR_INIT' }),

        set_es_content(value){
            if(this.GETTER_IS_LOGIN != 0)
            {
                if (confirm('Are you sure ?')) {
                    
                    this.setupdata = 0;
                    axios
                    .post(this.GETTER_BASE_URL + '/setendorsement',{ contentid: this.contentid , setes : value })
                    .then(res => 
                    {
                        if(res.data.status == 1)
                        {
                            this.reload_es();
                        }
                        else if(res.data.status == 2)
                        {
                        
                        }
                        else
                        {
                            this.CALL_ERROR_INIT(res.data.error);
                            
                        }
                    })
                    .catch(err => {

                    });
                    this.setupdata = 1;
                }
            }
            else
            {
                this.CALL_ERROR_INIT(1);
            }
            
            
        },
        reload_es(){
            axios
                .post(this.GETTER_BASE_URL + '/getendorsement',{ contentid: this.contentid })
                .then(res => 
                {
                    if(res.data.status == 1)
                    {
                        this.set_useresvote = res.data.useresvote;
                        this.valueofes(res.data.useresvote);
                        this.es_total = res.data.es_total;
                    }
                    else if(res.data.status == 0)
                    {
                    
                    }
                    else
                    {
                        this.CALL_ERROR_INIT(res.data.error);
                    }
                })
                .catch(err => {

                });
        },
        valueofes(value){
            if(value == "es_happy")
                this.status_es =  "<span style=\"color:#964000;font-weight:bold;\">You are Endorsement [ HAPPY , FUNNY ]</span>";
            else if(value == "es_helpful")
                this.status_es =  "<span style=\"color:#3E424B;font-weight:bold;\">You are Endorsement [ HEAPFUL , USEFUL ]</span>";
            else if(value == "es_positive")
                this.status_es = "<span style=\"color:#0b6623;font-weight:bold;\">You are Endorsement [ POSITIVE , POWER ]</span>";
            else if(value == "es_truth")
                this.status_es =  "<span style=\"color:#4682b4;font-weight:bold;\">You are Endorsement [ TRUTH , FACT ]</span>";
            else
                this.status_es = "";
        }
    },
    created: function() {
        this.set_useresvote = this.useresvote;
        this.valueofes(this.useresvote);
        this.es_total = this.endorsement_total;
    },
}
</script>
<style scoped>
.setorg
{
    color: orange;
    font-weight: bold;
}
.setblack
{
    color: black;
    font-weight: bold;
}

.sethelpful
{
    color: #3E424B;font-weight: bold;
}

.sethappy
{
    color: #964000;font-weight: bold;
}

.settrust
{
    color: #4682b4;font-weight: bold;
}

.setposi
{
    color : #0b6623;font-weight: bold;
}
</style>