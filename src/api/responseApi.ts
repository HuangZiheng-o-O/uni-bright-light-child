import {request} from "@/utils/request";

//传taskId，childId
const getCorrespondingVolunteerApi = (data: any, token: string = '') => {
    return request('child/response/correspondingVolunteer', 'GET', data, JSON.stringify({SaToken: token}));
}

//传childId，volunteerId
const getStageReportApi = (data: any, token: string = '') => {
    return request('child/response/stageReport', 'GET', data, JSON.stringify({SaToken: token}));
}


export {getCorrespondingVolunteerApi, getStageReportApi}
