<template>
    <div class="scroll" ref="scroll">
        <div class="scroll-wrap" ref="scrollWrap">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    import BScroll from 'better-scroll';

    export default {
        props: {
            click: {
                type: Boolean,
                default: true
            },
            probeType: {
                type: Number,
                default: 1
            },
            data: {
                type: Array,
                default () {
                    return [];
                }
            }
        },
        methods: {
            _initScroll () {
                this.scroll = new BScroll(this.$refs.scroll, {
                    click: this.click,
                    probeType: this.probeType
                });
            },
            refresh () {
                this.scroll && this.scroll.refresh();
            },
            scrollToElement (el, time) {
                this.scroll && this.scroll.scrollToElement(el, time);
            }
        },
        watch: {
            data (to, from) {
                this.$nextTick(() => {
                    this.refresh();
                });
            }
        },
        mounted () {
            this._initScroll();
        }
    };
</script>

<style lang="stylus">
    .scroll
        height 100%
        overflow hidden
</style>
