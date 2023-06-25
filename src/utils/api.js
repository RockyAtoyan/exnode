const host = 'https://89.108.81.250';

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
                'Content-Type': 'application/json;charset=utf-8',
                'Access-Control-Allow-Origin': '*',
                "Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS",
                "Access-Control-Allow-Headers":"Content-Type, Authorization, X-Requested-With",
                'Access-Control-Allow-Credentials': true,
                'Credentials':true,
            },
            body: body ? JSON.stringify(body) : null,
        });
        const result = await response.json();
        return result;
    }catch(ex) {
        console.error(ex);
    }
}