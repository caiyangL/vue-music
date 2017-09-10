<template>
    <div class="slide" ref="slide">
        <ul class="slide-group" ref="slideGroup">
            <li v-for="(item,index) in list" :key="index" class="slide-item">
                <a :href="item.linkUrl">
                    <img @load="emitLoaded" :src="item.picUrl">
                </a>
            </li>
        </ul>
        <div class="dots">
            <span class="dot" :class="{'active': currentIndex===index}" v-for="(item, index) in list" :key="index"></span>
        </div>
    </div>
</template>

<script>
    import BScroll from 'better-scroll';

    export default {
        props: {
            list: {
                type: Array,
                default () {
                    return [];
                }
            },
            loop: {
                type: Boolean,
                default: true
            },
            auto: {
                type: Boolean,
                default: true
            },
            time: {
                type: Number,
                default: 3000
            }
        },
        data () {
            return {
                currentIndex: 0
            };
        },
        methods: {
            _setSlideWidth (isInit) {
                let clientWidth = document.body.clientWidth;
                let width = this.list.length * clientWidth;

                if (this.loop && isInit) {
                    width += 2 * clientWidth;
                }

                this.$refs.slideGroup.style.width = width + 'px';
                this.children = this.$refs.slideGroup.children;

                for (let i = 0, len = this.children.length; i < len; i++) {
                    this.children[i].style.width = clientWidth + 'px';
                }
            },
            _autoPlay () {
                this.timer = setTimeout(() => {
                    let index = ++this.currentIndex;
                    if (this.loop) {
                        index++;
                    }
                    this.slide.goToPage(index, 0, 300);
                }, this.time);
            },
            _onScrollEnd () {
                let pageX = this.slide.getCurrentPage().pageX;
                if (this.loop) {
                    pageX -= 1;
                }
                this.currentIndex = pageX;

                if (this.auto) {
                    this._autoPlay();
                }
            },
            _initSlide () {
                this.slide = new BScroll(this.$refs.slide, {
                    scrollX: true,
                    scrollY: false,
                    momentum: false,
                    snap: {
                        loop: this.loop,
                        threshold: 0.3,
                        speed: 400
                    }
                });

                if (this.auto) {
                    this._autoPlay();
                }

                this.slide.on('scrollEnd', this._onScrollEnd);
                this.slide.on('beforeScrollStart', () => {
                    if (this.auto) {
                        clearTimeout(this.timer);
                    }
                });
            },
            emitLoaded () {
                this.$emit('imgloaded');
            }
        },
        mounted () {
            this._setSlideWidth(true);
            this._initSlide();

            window.addEventListener('resize', this._setSlideWidth);
        },
        activated () {
            this._autoPlay();
        },
        deactivated () {
            clearTimeout(this.timer);
        }
    };
</script>

<style scoped lang="stylus">
    @import "~common/stylus/variable"

    .slide
        position relative
        width 100%
        overflow hidden
        .slide-group
            .slide-item
                display inline-block
                img 
                    width 100%
                    display inline-block
        .dots
            position absolute
            right: 0
            left: 0
            bottom 12px
            text-align center
            font-size 0
            .dot
                display inline-block
                margin: 0 4px
                width 8px
                height 8px
                border-radius 50%
                background-color $color-text-l
                &.active
                    width: 20px
                    border-radius: 5px
                    background: $color-text-ll
</style>
