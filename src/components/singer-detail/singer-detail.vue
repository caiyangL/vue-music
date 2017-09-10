<template>
    <transition name="slide">
        <div class="singerDetail">
            <music-list :songs="songs"></music-list>
        </div>
    </transition>
</template>

<script>
    import { getDetail } from 'api/singer.js';
    import { ERR_OK } from 'api/config.js';
    import { createSong } from 'common/js/song.js';
    import { mapGetters } from 'vuex';
    import musicList from 'base/music-list/music-list';

    export default {
        data () {
            return {
                songs: []
            };
        },
        methods: {
            _getDetail (mid) {
                if (!this.singer.mid) {
                    this.$router.push('/singer');
                    return;
                }
                getDetail(mid).then(res => {
                    if (res.code === ERR_OK) {
                        this.songs = res.data.list.map(item => createSong(item.musicData));
                    }
                });
            }
        },
        computed: {
            ...mapGetters(['singer'])
        },
        components: {
            musicList
        },
        created () {
            this._getDetail(this.singer.mid);
        }
    };
</script>

<style lang="stylus" scoped>
    @import '~common/stylus/variable.styl'

    .singerDetail
        position fixed
        left 0
        top 0
        width 100%
        height 100%
        z-index 200
        background-color $color-background

    .slide-enter-active,.slide-leave-active
        transition transform 0.3s
    .slide-enter,.slide-leave-to
        transform translate3d(100%, 0, 0)
</style>
