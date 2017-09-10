import jsonp from 'common/js/jsonp.js';
import { options, commonParams } from './config.js';
import axios from 'axios';

export function getRecommend () {
    let data = Object.assign({}, {
        uin: 0,
        platform: 'h5',
        needNewCode: 1
    }, commonParams);

    let url = 'http://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg';

    return jsonp(url, data, options);
}

/* export function getDiscList () {
    let data = Object.assign({}, {
        tpl: 'v12',
        page: 'other',
        loginUin: 0,
        hostUin: 0,
        platform: 'yqq'
    }, commonParams);

    let url = 'http://c.y.qq.com/v8/fcg-bin/fcg_first_yqq.fcg';

    return jsonp(url, data, options);
} */

export function getDiscList () {
    let data = Object.assign({}, {
        tpl: 'v12',
        page: 'other',
        loginUin: 0,
        hostUin: 0,
        platform: 'yqq'
    }, commonParams);

    let url = '/api/getDiscList';

    return new Promise((resolve) => {
        axios.get(url, {
            params: data
        }).then(res => {
            resolve(res);
        });
    });
}
