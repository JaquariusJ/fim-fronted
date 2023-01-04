import axios from "axios"
import routes from '@/router/index'

const whilteUrl = ['/login','/registry']

export function devServer(config){
    const dev = axios.create({
        baseURL: "http://localhost:8090",
        timeout: 5000
    })
    dev.interceptors.request.use(config => {
        const url = config.url.replace(config.baseURL, '')
        //过滤白名单
        if(whilteUrl.some(wl => url.startsWith(wl))){
            console.log("白名单："+url);
            return config
        }
        const token = window.localStorage.getItem("token")
        if(token !== 'undefined'){
            //存在token
            config.headers['token']=token
        }
        return config
    },error => {
        console.log("发送失败")
    })

    dev.interceptors.response.use(res => {
        return res.data
    },error => {
       if(error.response.status === 403){
           routes.push("/login")
       }
    })
    return dev(config)
}