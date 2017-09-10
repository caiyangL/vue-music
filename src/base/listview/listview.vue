<template>
    <div class="list-view">
        <scroll :data="data" :probe-type="probeType" ref="scroll">
            <ul class="lists-group-wrap">
                <li class="lists-group" ref="listsGroup" v-for="(list,index) in data" :key="index">
                    <h2 class="title">{{list.title}}</h2>
                    <ul class="lists">
                        <li 
                            class="lists-item"
                            v-for="item in list.items"
                            :key="item.id"
                            @click="selectedItem(item)"
                        >
                            <div class="avator">
                                <img v-lazy="item.avator">
                            </div>
                            <div class="name">
                                <p>{{item.name}}</p>
                            </div>
                        </li>
                    </ul>
                </li>
            </ul>
        </scroll>
        <div class="handle-wrap" @touchstart="_onTouchStartHandle($event)" @touchmove="_onTouchMoveHandle">
            <ul class="handle-list">
                <li class="handle"
                    v-for="(item,index) in handleList" 
                    :class="{'current': currentIndex===index}"
                    :key="index" 
                    :data-index="index"
                >{{item}}</li>
            </ul>
        </div>
        <div class="fixedTitle" ref="fiexdTitle" v-show="fixedTitle">
            <h2 class="title">{{fixedTitle}}</h2>
        </div>
    </div>
</template>

<script>
    import scroll from 'base/scroll/scroll';
    import { getData } from 'common/js/dom.js';

    const FIX_TITLE_HEIGHT = 30;

    export default {
        data () {
            return {
                currentIndex: 0,
                scrollY: 0,
                diff: 0
            };
        },
        props: {
            data: {
                type: Array,
                default: []
            }
        },
        methods: {
            _onTouchStartHandle (e) {
                if (e.target.localName === 'ul') return;
                this.currentIndex = parseInt(getData(e.target, 'index'));
                this.touch = {y1: e.touches[0].pageY, current: this.currentIndex};
                this.$refs.scroll.scrollToElement(this.$refs.listsGroup[this.currentIndex], 300);
            },
            scroll (pos) {
                this.scrollY = pos.y;
            },
            _onTouchMoveHandle (e) {
                this.touch.y2 = e.touches[0].pageY;
                let disIndex = ((this.touch.y2 - this.touch.y1) / 18) | 0;
                this.currentIndex = this.touch.current + disIndex;
                // 边界处理
                if (this.currentIndex > 22) {
                    this.currentIndex = 22;
                } else if (this.currentIndex < 0) {
                    this.currentIndex = 0;
                }

                this.$refs.scroll.scrollToElement(this.$refs.listsGroup[this.currentIndex]);
            },
            _computedHeight () {
                let listsHeight = this.listsHeight;
                let lists = this.$refs.listsGroup;
                let height = 0;

                listsHeight.push(0);
                lists.forEach((list) => {
                    height += list.clientHeight;
                    listsHeight.push(height);
                });
            },
            selectedItem (item) {
                this.$emit('selectedItem', item);
            }
        },
        computed: {
            handleList () {
                return this.data.map(item => item.title.substr(0, 1));
            },
            fixedTitle () {
                return this.scrollY > 0 ? '' : this.data[this.currentIndex].title;
            }
        },
        watch: {
            scrollY (newY) {
                if (newY > 0) {
                    this.currentIndex = 0;
                    return;
                }
                let listsHeight = this.listsHeight;

                for (let i = 0, len = listsHeight.length; i < len; i++) {
                    let h1 = listsHeight[i];
                    let h2 = listsHeight[i + 1];

                    if (!h2 || (-newY >= h1 && -newY < h2)) {
                        this.currentIndex = i;
                        this.diff = h2 + newY;
                        return;
                    }
                }
            },
            diff (val) {
                let fixedTop = (val > 0 && val < FIX_TITLE_HEIGHT) ? val - FIX_TITLE_HEIGHT : 0;

                if (this.fixedTop === fixedTop) {
                    return;
                }
                this.fixedTop = fixedTop;

                this.$refs.fiexdTitle.style.transform = `translate3d(0,${fixedTop}px,0)`;
            }
        },
        created () {
            this.probeType = 3;
            this.listsHeight = [];
        },
        mounted () {
            this.$refs.scroll.scroll.on('scroll', (pos) => {
                this.scroll(pos);
            });
            this._computedHeight();
        },
        components: {
            scroll
        }
    };
</script>

<style scoped lang="stylus">
    @import '~common/stylus/variable.styl'
    .list-view
        position relative
        width 100%
        height 100%
        overflow hidden

        .lists-group-wrap
            .title
                height: 30px
                line-height: 30px
                padding-left: 20px
                font-size: $font-size-small
                color: $color-text-l
                background: $color-highlight-background
            .lists
                padding 20px 10px
                .lists-item
                    display flex
                    padding-left 20px
                    margin-bottom 20px
                    &:last-child
                        margin-bottom 0
                    .avator
                        width 50px
                        height 50px
                        border-radius 50%
                        overflow hidden
                        margin-right 20px
                        img
                            width 100%
                            height 100%
                            display inline-block
                    .name
                        line-height 50px
                        color $color-text-l
                        font-size: $font-size-medium
        .handle-wrap
            position fixed
            right 10px
            top 50%
            transform translateY(-50%)
            z-index 100
            .handle-list
                width: 20px
                padding: 20px 0
                border-radius: 10px
                text-align: center
                background: $color-background-d
                .handle
                    padding: 3px
                    line-height: 1
                    color: $color-text-l
                    font-size: $font-size-small
                    &.current
                        color: $color-theme
        .fixedTitle
            position absolute
            left 0
            top -1px
            width 100%
            .title
                height: 30px
                line-height: 30px
                padding-left: 20px
                font-size: $font-size-small
                color: $color-text-l
                background: $color-highlight-background
</style>
