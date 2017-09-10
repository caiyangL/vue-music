<template>
    <div class="songs-list-wrap">
        <ul class="songs-list">
            <li class="song-item" v-for="song in songs" :key="song.id">
                <p class="song-name">{{song.name}}</p>
                <p class="song-info">{{song.singer + ' · ' + song.album}}</p>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        props: {
            songs: {
                type: Array,
                default: []
            }
        }
    };
</script>

<style lang="stylus" scoped>
    @import '~common/stylus/variable.styl'

    .songs-list-wrap
        .songs-list
            padding 30px
            .song-item
                margin-bottom 30px
                &:last-child 
                    margin-bottom 0
                .song-name
                    margin-bottom 10px
                    color $color-text
                    font-size $font-size-medium-x
                .song-info
                    color $color-text-d
                    font-size $font-size-medium-x
</style>
