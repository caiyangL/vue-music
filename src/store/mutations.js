import * as types from './mutations-types.js';

const mutations = {
    [types.SET_SINGER] (state, singer) {
        state.singer = singer;
    },
    [types.SET_SONGS] (state, songs) {
        state.songs = songs;
    }
};

export default mutations;