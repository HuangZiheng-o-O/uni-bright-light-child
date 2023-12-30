import {request} from "@/utils/request";

//传childId
//获取Child
const getInformationApi = (data: any, token: string = '') => {
    return request('child/personal/getInformation', 'GET', data, JSON.stringify({SaToken: token}));
}

//传childId
//获取积分数 ChildCredit
const getCreditApi = (data: any, token: string = '') => {
    return request('child/personal/credit', 'GET', data, JSON.stringify({SaToken: token}));
}

//传childId
//返回RankChildDto
const rankListApi = (data: any, token: string = '') => {
    return request('child/personal/rankList', 'GET', data, JSON.stringify({SaToken: token}));
}

//传childId
//TaskFinishDto
const taskFinishDetailsApi = (data: any, token: string = '') => {
    return request('child/personal/taskFinishDetails', 'GET', data, JSON.stringify({SaToken: token}));
}

export {getInformationApi, getCreditApi, rankListApi, taskFinishDetailsApi}
