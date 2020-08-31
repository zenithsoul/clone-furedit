<template>
    <div>
        <div v-if="loading == 1"> 
            Loading ..... 
        </div>
        <div v-else>
            <div v-for="datatopic in datatopics" :key="datatopic.c_key">
                <hr />
                <a v-bind:href="'/topic/' + datatopic.c_key"> {{ datatopic.c_topicname }} </a>
            </div>
        </div>
    </div>
</template>
<script>
import { mapGetters,mapActions } from 'vuex'

import axios from 'axios';

export default {
    data () {
        return {
            datatopics : null ,
            loading : 1
        }
    },
    computed: {
        ...mapGetters({GETTER_IS_LOGIN: 'session/GET_SESSION'}) ,
        ...mapGetters({GETTER_BASE_URL: 'config/GET_BASE_URL'}),
    },
    methods: {
        
    },
    created: function() {

        this.loading = 1;
        axios
        .get(this.GETTER_BASE_URL + '/alltopic')
        .then(res => 
        {
            this.datatopics = res.data;
            this.loading = 0;
        })
        .catch(err => {
            console.log("Cannot Get Data");
        });
        
    }
}
</script>
<style scoped>
</style>
