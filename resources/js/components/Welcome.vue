    <template>
        <div>
            <div>
                <div>
                    <button v-on:click="MyButton()" :disabled="button_active == 1">Greet</button>
                </div>
                <div class="has-text-centered">
                    <a href="/newtopic">Create Topic</a>
                </div>
            </div>
        </div>
    </template> 
    <script>
        import { mapActions , mapGetters  } from 'vuex'
        
        export default {
            name : 'Welcome' ,
            data() {
                return {
                    button_active : 0
                }
            },
            computed: { 
                ...mapGetters({GETTER_IS_LOGIN: 'session/GET_SESSION'}) 
            },
            methods: {
                ...mapActions({CALL_ERROR_INIT: 'session/SET_ERROR_INIT'}),
                ...mapActions({CALL_ERROR_ZERO: 'session/SET_ERROR_ZERO'}),
                MyButton(){
                    this.button_active = 1;
                    if(this.GETTER_IS_LOGIN == false)
                    {
                        this.CALL_ERROR_INIT(1);
                    }
                    else
                    {
                        alert("TY");
                    }
                    this.button_active = 0;
                }
            }
        }
    </script>
    <style>
    
    </style>