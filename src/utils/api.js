const host = 'https://89.108.81.250';

export function setToken(token) {
    localStorage.setItem('token', token)
}

export function getToken() {
    return localStorage.getItem('token')
}

export async function api(url, method, body = false, queryObject = null) {
    let query = '';
    if(queryObject) {
        query += '?'
        query += new URLSearchParams(queryObject).toString();
    }
    
    try {
        let response = await fetch(host + url + query, {
            method: method,
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                ...(getToken() ? {'Authorization': getToken()} : {})
            },
            body: body ? JSON.stringify(body) : null,
        });
        const result = await response.json();
        return result;
    }catch(ex) {
        console.error(ex);
    }
}