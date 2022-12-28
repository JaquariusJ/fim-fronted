import axios from "axios"

export function devServer(config){
    const dev = axios.create({
        baseURL: "http://localhost:8090",
        timeout: 5000
    })

    return dev(config)
}