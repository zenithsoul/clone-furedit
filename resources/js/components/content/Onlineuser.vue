<template>
    <span>
        User Online : {{ onlineuser }}
    </span>
</template>
<script>

export default {
    props: ['rootcontentid'] ,
    data() {
        return {
            isConnected: false,
            onlineuser : 0 ,
            timeruser: ''
        }
    },
    methods: {
        loaduserall: function(){
            this.$socket.emit('setuserroom','topic-' + this.rootcontentid);
        }
    },
    created: function() {
        console.log(this.$socket);
        this.$socket.emit('subscribe','topic-' + this.rootcontentid);
        this.loaduserall();
        this.timeruser = setInterval(this.loaduserall, 1000)
    },
    sockets: {
        connect() {

        },
        reconnect(){
            
        },
        disconnect() {

        },
        getuserroom(val){
            this.onlineuser = val
        }
    },
    beforeDestroy() {
        clearInterval(this.timeruser)
    }
}
</script>
<style>
</style>
