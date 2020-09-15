<template>
    <div>
        VOTE TOTAL = {{ get_total }} || <span class="setblue">{{ get_youvote }} </span> ||
        <span class="setgreen" v-if="get_total > 0">UP</span>
        <span v-else-if="get_total == 0"></span>
        <span v-else class="setred">DOWN</span>
        <br />------------------------------------------<br /> ( {{ get_voteuptotal }} )
        <button v-on:click.prevent="setvotecontent('up_like')" type="button" :disabled="setupdata == 0 || get_chkuser == 'up_like' "> Like [{{ get_voteup.up_like }}] </button>
        <button v-on:click.prevent="setvotecontent('up_love')" type="button" :disabled="setupdata == 0 || get_chkuser == 'up_love' "> Love [{{ get_voteup.up_love }}]  </button>
        <button v-on:click.prevent="setvotecontent('up_good')" type="button" :disabled="setupdata == 0 || get_chkuser == 'up_good' "> Good [{{ get_voteup.up_good }}] </button>
        <button v-on:click.prevent="setvotecontent('up_lol')" type="button" :disabled="setupdata == 0 || get_chkuser == 'up_lol' "> Lol [{{ get_voteup.up_lol }}]  </button>
        <br /> ( {{ get_votedowntotal }} )
        <button v-on:click.prevent="setvotecontent('down_dislike')" type="button" :disabled="setupdata == 0 || get_chkuser == 'down_dislike' "> Dislike [{{ get_votedown.down_dislike }}]  </button>
        <button v-on:click.prevent="setvotecontent('down_hate')" type="button" :disabled="setupdata == 0 || get_chkuser == 'down_hate' "> Hate [{{ get_votedown.down_hate }}] </button>
        <button v-on:click.prevent="setvotecontent('down_bad')" type="button" :disabled="setupdata == 0 || get_chkuser == 'down_bad' "> Bad [{{ get_votedown.down_bad }}]</button>
        <button v-on:click.prevent="setvotecontent('down_sad')" type="button" :disabled="setupdata == 0 || get_chkuser == 'down_sad'"> Sad [{{ get_votedown.down_sad }}]</button>
        <br />------------------------------------------<br />
    </div>
</template>
<script>
import { mapGetters,mapActions } from 'vuex'
import axios from 'axios'

export default {
    props: {
        voteup : Object ,
        votedown : Object ,
        contentid : String ,
        voteuptotal : Number ,
        votedowntotal : Number ,
        chkuser : String
    } ,
    data () {
        return {
            get_voteup : this.voteup , 
            get_votedown : this.votedown ,
            get_voteuptotal : this.voteuptotal ,
            get_votedowntotal : this.votedowntotal ,
            get_total : this.voteuptotal - this.votedowntotal,
            setupdata : 1 ,
            get_youvote : "" ,
            get_chkuser : ""

        }
    },
    computed: {
        ...mapGetters({ GETTER_IS_LOGIN: 'session/GET_SESSION' }) ,
        ...mapGetters({ GETTER_BASE_URL: 'config/GET_BASE_URL' }),
    },
    methods: {
        ...mapActions({ CALL_ERROR_INIT: 'session/SET_ERROR_INIT' }),

        setvotecontent : async function (value){
            
            this.setupdata = 0;

            if(this.GETTER_IS_LOGIN == true)
            {
                
                await axios
                    .post(this.GETTER_BASE_URL + '/setvote',{ contentid: this.contentid , setvote : value })
                    .then(res => 
                    {
                        if(res.data.status == 1)
                        {
                            this.get_voteup = res.data.voteup;
                            this.get_votedown = res.data.votedown;
                            this.get_voteuptotal = res.data.voteuptotal;
                            this.get_votedowntotal = res.data.votedowntotal;
                            this.get_total = this.get_voteuptotal - this.get_votedowntotal;
                            this.get_chkuser = res.data.voteuserkey;

                            this.get_youvote = this.votecontent(res.data.voteuserkey);
                        }
                        else if(res.data.status == 2)
                        { 
                            console.log('not update')
                        }
                        else
                        {
                            this.CALL_ERROR_INIT(res.data.error);
                        }
                    })
                    .catch(err => {

                    });
                
            }
            else
            {
                this.CALL_ERROR_INIT(1);
            }
            this.setupdata = 1;
            
        },
        votecontent(value)
        {
            if(value == "up_like")
                return "You <LIKE> this.";
            else if(value == "up_love")
                return "You <LOVE> this.";
            else if(value == "up_good")
                return "You <GOOD> this.";
            else if(value == "up_lol")
                return "You <LOL> this.";
            else if(value == "down_dislike")
                return "You <DISLIKE> this.";
            else if(value == "down_hate")
                return "You <HATE> this.";
            else if(value == "down_bad")
                return "You <BAD> this.";
            else if(value == "down_sad")
                return "You <SAD> this.";
            else
                return "";
        }
    },
    created: function() {
        this.get_youvote = this.votecontent(this.chkuser);
        this.get_chkuser = this.chkuser;
    },
}
</script>
<style scoped>
.setred
{
    color: red;
    font-weight: bold;
}

.setgreen
{
    color: green;
    font-weight: bold;
}

.setblue
{
    color: blue;
    font-weight: bold;
}
</style>