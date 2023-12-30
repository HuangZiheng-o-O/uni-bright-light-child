import {request} from "@/utils/request";
import type {AnswerSheet} from "@/ts/types";

//传childId,isNecessary query(0，1，2)
//必做选做
const getTaskListApi = (data: any, token: string = '') => {
    return request('child/task/list', 'GET', data, JSON.stringify({SaToken: token}));
}

//传taskId
const getTaskByIdApi = (data: any, token: string = '') => {
    return request('child/task/getTaskById', 'GET', data, JSON.stringify({SaToken: token}));
}

//传childId
const getTaskDetailApi = (data: any, token: string = '') => {
    return request('child/task/detail', 'GET', data, JSON.stringify({SaToken: token}));
}

//传AnswerSheet类对象
const finishTaskApi = (data: AnswerSheet, token: string = '') => {
    return request('child/task/finish', 'POST', data, JSON.stringify({SaToken: token}));
}

//传taskId，childId
const getAnswerSheetListApi = (data: any, token: string = '') => {
    return request('child/task/answerSheetList', 'GET', data, JSON.stringify({SaToken: token}));
}

//传childId
const answerPieChartApi = (data: any, token: string = '') => {
    return request('child/task/answerPieChart', 'GET', data, JSON.stringify({SaToken: token}));
}

//传answerSheetId
const getMarkingResultApi = (data: any, token: string = '') => {
    return request('child/task/markingResult', 'GET', data, JSON.stringify({SaToken: token}));
}

//传taskId
const getAnswerSheetMaxApi = (data: any, token: string = '') => {
    return request('child/task/answerSheetScoreMax', 'GET', data, JSON.stringify({SaToken: token}));
}


export {getTaskListApi, getTaskDetailApi, finishTaskApi, getAnswerSheetListApi, getMarkingResultApi, getAnswerSheetMaxApi, getTaskByIdApi, answerPieChartApi}
