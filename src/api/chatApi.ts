import {request} from "@/utils/request";

const env = import.meta.env

//传CallRecord
const sendMessageApi = (data: any, token: string = '') => {
    return request('child/call', 'POST', data, JSON.stringify({SaToken: token}));
}

//id
const getMessageHistoryApi = (data: any, token: string = '') => {
   return request('child/call/history', 'GET', data, JSON.stringify({SaToken: token}));
}

//id
const getSingleMessage = (data: any, token: string = '') => {
    return request('child/call/single', 'GET', data, JSON.stringify({SaToken: token}));
}

export {sendMessageApi, getSingleMessage, getMessageHistoryApi}
