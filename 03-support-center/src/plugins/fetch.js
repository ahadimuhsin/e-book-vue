import state from '../state'
import router from '../router'
let baseUrl;

export default {
    install(Vue, options) {
        console.log('Installed', options);

        baseUrl = options.baseUrl;
        Vue.prototype.$fetch = $fetch;
    }
}

export async function $fetch(url, options) {
    const finalOptions = Object.assign({}, {
        headers: {

            'Content-Type': 'application/json'
        },
        credentials: 'include',
    }, options)
    const response = await fetch(`${baseUrl}${url}`, finalOptions);
    if (response.ok) {
        const data = await response.json();
        return data;
    } else if (response.status === 403) {
        //if the route is private
        //we go to the login screen
        if (router.currentRoute.matched.some(r => r.meta.private)) {
            router.rep({
                name: 'login',
                params: {
                    wantedRoute: router.currentRoute.fullPath
                }
            })
        }
    } else {
        const message = await response.text();
        const error = new Error(message);
        error.response = response
        throw error;
    }
}