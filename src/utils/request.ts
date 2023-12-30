import type {Result} from "@/ts/types";
//获取当前环境
const env = import.meta.env.MODE;

//根据请求方式封装uni.request
export const request = (url: string, method: Method, data : any = {}, header : string = '') => {
    return new Promise<Result>((resolve, reject) => {
        let baseUrl = import.meta.env.VITE_SERVER_NAME;
        console.log('baseUrl', baseUrl)
        url = baseUrl + url
            uni.request({
                url,
                method,
                data,
                header,
                success: (res) => {
                    resolve(res.data as Result);
                },
                fail: (err) => {
                    reject(err);
                },
            });
        });

}

type Method = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'CONNECT' | 'HEAD' | 'OPTIONS' | 'TRACE'
