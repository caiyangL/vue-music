<template>
    <div class="loading">
        <div class="img">
            <img src="./loading.gif">
        </div>
        <p>{{text}}</p>
    </div>
</template>

<script>
    export default {
        props: {
            text: {
                type: String,
                default: '正在加载 ...'
            }
        }
    };
</script>

<style lang="stylus">
    .loading
        display flex
        flex-direction column
        align-items center
        .img
            width 30px
            height 30px
            margin-bottom 10px
            img
                width 100%
                height 100%
        .text
            font-size 16px
</style>
