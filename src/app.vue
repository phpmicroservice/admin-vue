<template>
    <div id="main" class="app-main">
        <router-view></router-view>
    </div>
</template>

<script>
    import token from './vendors/token';
    import ws_token from './vendors/ws_token';
    export default {
        data () {
            return {
                theme: this.$store.state.app.themeColor
            };
        },
        mounted () {

        },
        beforeDestroy () {

        },
        methods: {

        },
        mounted() {
        //组件挂在到实例后调用
        ws_token.can(() => {
            
        });
    },
    };
</script>

<style>
html,body{
    width: 100%;
    height: 100%;
    background: #f0f0f0;
    overflow: hidden;
}
.app-main{
    width: 100%;
    height: 100%;
}
</style>
