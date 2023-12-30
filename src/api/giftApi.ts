import {request} from "@/utils/request";
import type {ExchangeHistory} from "@/ts/types";
//传searchContent
//返回LoveProject list
const listApi = (data: any, token: string = '') => {
    return request('child/gift/list', 'GET', '', JSON.stringify({SaToken: token}));
}
//传childId
//返回LoveProject list
const getItemListApi = (data: any, token: string = '') => {
    return request('/gift/getLoveProject', 'GET', data, JSON.stringify({SaToken: token}));
}

//传loveProjectId
//返回LoveProject
const detailApi = (data: any, token: string = '') => {
    return request('child/gift/detail', 'GET', data, JSON.stringify({SaToken: token}));
}

//传ExchangeHistory类对象 兑换接口
const setOrderApi = (data: ExchangeHistory, token: string = '') => {
    return request('child/gift/setOrder', 'POST', data, JSON.stringify({SaToken: token}));
}

//传childId
//返回ExchangeHistory list
const getOrderApi = (data: any, token: string = '') => {
    return request('child/gift/getOrder', 'GET', data, JSON.stringify({SaToken: token}));
}


//传itemPictureID
//返回一个list 里面六张图片
// let list1: [
//     'https://cdn.uviewui.com/uview/swiper/swiper1.png',
//     'https://cdn.uviewui.com/uview/swiper/swiper2.png',
//     'https://cdn.uviewui.com/uview/swiper/swiper3.png',
    //.......
// ]
export const itemPictureApi = (data: any, token: string = '') => {
    return request('child/gift/itemPicture', 'GET', data, JSON.stringify({SaToken: token}));
}
export {listApi, detailApi, setOrderApi, getOrderApi, getItemListApi}
