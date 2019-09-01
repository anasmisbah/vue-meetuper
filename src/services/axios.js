import axios from 'axios'

const axiosInstance = axios.create({
    timeout:3000
})

axiosInstance.interceptors.request.use(function(config){
    const token = localStorage.getItem('vue-meetuper-jwt') || ''
    if(token){
        config.headers.Authorization = `${token}`
    }

    return config
}, function(err){
    return Promise.reject(err)
}

)

export default axiosInstance