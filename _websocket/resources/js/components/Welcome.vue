    <template>
        <div>
            <div>
                <div>
                    
                </div>
                <div class="links">
                    <a href="https://laravel.com/docs">View Laravel Docs</a>
                    <a href="https://vuejs.org/v2/guide/">View Vue Docs</a>
                    <a href="https://laracasts.com">Watch Videos</a>
                </div>
            </div>
        </div>
    </template> 
    <script>
        import { mapState } from 'vuex'

        export default {
            name : 'Welcome' ,
            computed: { 
                //...mapState({titlemap_one: state => state.user.title}) ,
                //...mapState({titlemap_two: state => state.session.title}) 
            }
        }
    </script>
    <style lang="scss">
    
    </style>