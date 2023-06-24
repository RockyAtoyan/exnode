const host = 'http://exnodeyii2.api';

export async function api(url, method, body = false, queryObject = null) {
    let query = '';
    if(queryObject) {
        query += '?'
        query += new URLSearchParams(queryObject).toString();
    }

    try {
        let response = await fetch(host + url + query, {
            method: method,
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: body ? JSON.stringify(body) : null,
        });
        const result = await response.json();
        return result;
    }catch(ex) {
        console.error(ex);
    }
}