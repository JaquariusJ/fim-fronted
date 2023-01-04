import {ElMessage} from "element-plus";

export function success(msg) {
    ElMessage({
        message: msg,
        type: 'success'
    })
}


export function error(msg) {
    ElMessage({
        message: msg,
        type: 'error'
    })
}