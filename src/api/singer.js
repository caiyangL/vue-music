import jsonp from 'common/js/jsonp.js';
import { options, commonParams } from 'api/config.js';

export function getSingerList () {
    let url = 'http://c.y.qq.com//v8/fcg-bin/v8.fcg';
    let data = Object.assign({}, commonParams, {
        channel: 'singer',
        page: 'list',
        key: 'all_all_all',
        pagesize: 100,
        pagenum: 1,
        loginUin: 0,
        hostUin: 0,
        platform: 'yqq',
        needNewCode: 0
    });

    return jsonp(url, data, options);
}

export function getDetail (mid) {
    let url = 'http://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg';

    let data = Object.assign({}, commonParams, {
        loginUin: 0,
        hostUin: 0,
        platform: 'yqq',
        needNewCode: 0,
        notice: 0,
        order: 'listen',
        begin: 0,
        num: 100,
        singermid: mid
    });

    return jsonp(url, data, options);
}