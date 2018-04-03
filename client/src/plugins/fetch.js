let baseUrl

export default {
    install(Vue, options) {
        baseUrl = options.baseUrl

        Vue.prototype.$fetch = $fetch
    }
}

export async function $fetch (url, options) {
    const finalOptions = Object.assign({}, {
        headers: {
          'Content-Type': 'application/json',
        },
        credientials: true,
    }, options)    
    const response = await fetch(`${baseUrl}${url}`, finalOptions)
    if (response.ok) {
        const data = await response.json()
        console.log(data)
        return data
    } else {
        const error = new Error('error')
        throw error
    }
}