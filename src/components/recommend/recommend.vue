<template>
    <div class="recommend">
        <scroll :data="discData" ref="scroll">
            <slide @imgloaded="imgLoad" v-if="recommendData.slider" :list="recommendData.slider"></slide>
            <div class="discList">
                <div class="title">
                    <h2>热门歌单推荐</h2>
                </div>
                <div class="list-wrap">
                    <ul class="lists">
                        <li class="list-item" v-for="(item,index) in discData" :key="index">
                            <div class="left">
                                <img v-lazy="item.imgurl" width="60" height="60">
                            </div>
                            <div class="right">
                                <div class="name">{{item.author}}</div>
                                <div class="dissname">{{item.dissname}}</div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </scroll>
        <div class="loading-wrap" v-show="!discData.length">
            <loading :title="'加载中 ...'"></loading>
        </div>
    </div>
</template>

<script>
    import { ERR_OK } from 'api/config.js';
    import { getRecommend, getDiscList } from 'api/recommend.js';
    import slide from 'base/slide/slide';
    import scroll from 'base/scroll/scroll';
    import loading from 'base/loading/loading';

    export default {
        data () {
            return {
                recommendData: {},
                discData: []
            };
        },
        methods: {
            _getRecommend () {
                getRecommend().then((res) => {
                    if (res.code === ERR_OK) {
                        this.recommendData = res.data;
                    }
                });
            },
            _getDiscList () {
                getDiscList().then((res) => {
                    res = res.data;
                    if (res.code === ERR_OK) {
                        this.discData = res.data.hotdiss.list;
                    }
                });
            },
            imgLoad () {
                if (!this.checkImg) {
                    this.$refs.scroll.refresh();
                    this.checkImg = true;
                }
            }
        },
        mounted () {
            this._getRecommend();
            this._getDiscList();
        },
        components: {
            slide,
            scroll,
            loading
        }
    };
</script>

<style scoped lang="stylus">
    @import '~common/stylus/variable.styl'

    .recommend
        position fixed
        top 88px
        bottom 0
        left 0
        width 100%
        .discList
            .title
                padding 20px 0
                font-size 16px
                line-height 16px
                text-align center
                color $color-theme
            .list-wrap
                .list-item
                    display flex
                    width 100%
                    height 80px
                    .left, .right
                        display flex
                        justify-content center
                    .left
                        width 100px
                        height 80px
                        align-items center
                        img
                            display inline-block
                    .right
                        flex 1
                        flex-direction: column
                        align-items flex-start
                        .name
                            margin-bottom 15px
                            color $color-text
                        .dissname
                            color $color-text-d
        .loading-wrap
            position absolute
            top 50%
            left 50% 
            transform translate(-50%, -50%)
</style>
