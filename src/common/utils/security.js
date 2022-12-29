import md5 from 'js-md5'

export function encodePassWord(text){
    return md5(text)
}