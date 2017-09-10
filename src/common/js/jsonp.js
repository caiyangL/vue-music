import originJSONP from 'jsonp';

export default function (url, data, opts) {
    let query = parseQuery(data);

    url += (url.indexOf('?') > 0 ? '&' : '?') + query;

    return new Promise((resolve, reject) => {
        originJSONP(url, opts, (err, data) => {
            if (!err) {
                resolve(data);
            } else {
                reject(err);
            }
        });
    });
}

function parseQuery (data) {
    let query = '';
    for (let k in data) {
        query += ('&' + k + '=' + encodeURIComponent(data[k]));
    }
    return query ? query.slice(1) : '';
}
