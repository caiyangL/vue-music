<template>
    <div class="singer">
        <list-view @selectedItem="selectedSinger" v-if="singerList.length" :data="singerList"></list-view>
        <div class="loading-wrap">
            <loading v-show="!singerList.length"></loading>
        </div>
        <router-view></router-view>
    </div>
</template>

<script>
    import { getSingerList } from 'api/singer.js';
    import { ERR_OK } from 'api/config.js';
    import listView from 'base/listview/listview';
    import loading from 'base/loading/loading';
    import { mapMutations } from 'vuex';

    const HOT = '热门';
    const HOT_SINGER_LIST = 10;

    export default {
        data () {
            return {
                singerList: []
            };
        },
        methods: {
            _getSingerList () {
                getSingerList().then(res => {
                    if (res.code === ERR_OK) {
                        this.singerList = res.data.list;
                        this.singerList = this._normalize(this.singerList);
                    }
                });
            },
            _normalize (list) {
                let map = {
                    hot: {
                        title: HOT,
                        items: []
                    }
                };

                list.forEach((v, i) => {
                    if (i < HOT_SINGER_LIST) {
                        map.hot.items.push({
                            name: v.Fsinger_name,
                            id: v.Fsinger_id,
                            mid: v.Fsinger_mid,
                            avator: `http://y.gtimg.cn/music/photo_new/T001R300x300M000${v.Fsinger_mid}.jpg?max_age=2592000`
                        });
                    }

                    let key = v.Findex;

                    if (!map[key]) {
                        map[key] = {
                            title: key,
                            items: []
                        };
                    }

                    map[key].items.push({
                        name: v.Fsinger_name,
                        id: v.Fsinger_id,
                        mid: v.Fsinger_mid,
                        avator: `http://y.gtimg.cn/music/photo_new/T001R300x300M000${v.Fsinger_mid}.jpg?max_age=2592000`
                    });
                });

                let hot = [];
                let ret = [];

                for (let key in map) {
                    let val = map[key];
                    if (val.title.match(/[a-zA-Z]/)) {
                        ret.push(val);
                    } else if (val.title === HOT) {
                        hot.push(val);
                    }
                }
                ret.sort((a, b) => {
                    return a.title.charCodeAt(0) - b.title.charCodeAt(0);
                });

                return hot.concat(ret);
            },
            selectedSinger (item) {
                this.$router.push({
                    path: `/singer/${item.mid}`
                });
                this.setSinger(item);
            },
            ...mapMutations({
                setSinger: 'SET_SINGER'
            })
        },
        components: {
            listView,
            loading
        },
        created () {
            this._getSingerList();
        }
    };
</script>

<style scoped lang="stylus">
    .singer
        position fixed
        left 0
        top 88px
        bottom 0
        width 100%
        .loading-wrap
            position absolute
            left 50%
            top 50%
            transform translate(-50%,-50%)
</style>
