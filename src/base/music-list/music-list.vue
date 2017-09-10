<template>
    <div class="music-list">
        <div class="icon-back-wrap" @click="back">
            <i class="icon-back"></i>
        </div>
        <div class="bg-img" :style="bgStyle" ref="bgImg">
            <div class="random-play"  v-show="songs.length && bgImgIsBig">
                <i class="icon-play"></i><span class="text">随机播放全部</span>
            </div>
        </div>
        <div class="song-list-box" ref="songListBox">
            <div class="song-layer" ref="layer"></div>
            <scroll :data="songs" :probe-type="probeType" ref="scroll" class="scroll-overflow">
                <song-list :songs="songs"></song-list>
            </scroll>
        </div>
        <div class="loading-wrap" v-show="!songs.length">
            <loading></loading>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';
    import songList from 'base/songs-list/songs-list';
    import scroll from 'base/scroll/scroll';
    import loading from 'base/loading/loading';

    const SCROLL_PADDING = 100;

    export default {
        props: {
            songs: {
                type: Array,
                default: []
            }
        },
        data () {
            return {
                probeType: 3,
                scrollY: 0,
                bgImgZIndex: 0,
                bgImgIsBig: true
            };
        },
        methods: {
            back () {
                this.$router.go(-1);
            },
            setBox () {
                let bgHeight = this.$refs.bgImg.clientHeight;
                this.$refs.songListBox.style.top = bgHeight + 'px';
            },
            scroll (pos) {
                this.scrollY = pos.y;
            },
            _getMaxScrollY () {
                let bgImg = this.$refs.bgImg;
                this.maxScrollY = -bgImg.clientHeight + SCROLL_PADDING;
            }
        },
        watch: {
            scrollY (newY) {
                let bgImg = this.$refs.bgImg;
                let bgImgHeight = bgImg.clientHeight;
                let maxScrollY = this.maxScrollY;
                let scrollY = Math.max(maxScrollY, newY);

                if (newY < 0) {
                    if (scrollY === maxScrollY && this.bgImgIsBig) {
                        bgImg.style.paddingTop = SCROLL_PADDING + 'px';
                        bgImg.style.zIndex = 99;
                        this.bgImgIsBig = false;
                    } else if (scrollY !== maxScrollY && !this.bgImgIsBig) {
                        bgImg.style.paddingTop = '70%';
                        bgImg.style.zIndex = 0;
                        this.bgImgIsBig = true;
                    }

                    this.$refs.layer.style.transform = `translate3d(0, ${scrollY}px, 0)`;
                } else if (newY > 0) {
                    let scale = 1;
                    let percent = scale + newY / bgImgHeight;

                    bgImg.style.transform = `scale(${percent})`;
                }
            }
        },
        computed: {
            ...mapGetters(['singer']),
            bgStyle () {
                return `background-image: url(${this.singer.avator})`;
            }
        },
        mounted () {
            this.setBox();
            this.$refs.scroll.scroll.on('scroll', this.scroll);
            this._getMaxScrollY();
        },
        components: {
            songList,
            scroll,
            loading
        }
    };
</script>

<style lang="stylus" scoped>
    @import '~common/stylus/variable.styl'

    .music-list
        position relative
        left 0
        top 0
        width 100%
        height 100%
        .icon-back-wrap
            position absolute
            left 0
            top 0
            z-index 999
            color $color-theme
            .icon-back
                display inline-block
                padding 10px
                font-size $font-size-large-x
        .bg-img
            position relative
            left 0
            top 0
            width 100%
            height 0
            padding-top 70%
            transform-origin top
            background-repeat no-repeat
            background-size cover
            .random-play
                position absolute
                bottom 30px
                left 50%
                padding 6px 15px
                border-radius 20px
                transform translateX(-50%)
                color $color-theme
                border 2px solid $color-theme
                .text
                    display inline-block
                    font-size $font-size-large
                    line-height 22px
                .icon-play
                    display inline-block
                    vertical-align top
                    margin-right 10px
                    font-size $font-size-large-x
        .song-list-box
            position absolute
            left 0
            bottom 0
            width 100%
            .song-layer
                position absolute
                left 0
                top 0
                width 100%
                height 1000px
                background-color $color-background
            .scroll-overflow
                overflow visible
        .loading-wrap
            position absolute
            left 50%
            top 50%
            transform translate(-50%, -50%)
</style>
