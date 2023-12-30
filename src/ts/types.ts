
type AnswerSheet = {
    id: string;
    taskId: string;
    childId: string;
    contentsType: string;
    contentsPicture: string;
    contentsVideo: string;
    averageGrade: number;
    startTime?: string;
    updateTime?: string;
    remark?: string;

}


type Child = {
    id: string;
    account: string;
    password: string;
    avatar: string;
    name: string;
    age: number;
    gender: string;
    isOrphan: number;
    isLeftBehind: number;
    isDisability: number;
    description: string;
    province: string;
    city: string;
    district: string;
    detailedAddress: string;
    startTime?: string;
    updateTime?: string;
    remark?: string;
}


type ChildCredit = {
    id: string;
    childId: string;
    totalGainedCredit: number;
    currentCredit: number;
    startTime?: string;
    updateTime?: string;
    remark?: string;
}



type ExchangeHistory = {
    id: string;
    thumbnail: string;
    childId: string;
    loveProjectId: string;
    amount: number;
    description: string;
    startTime?: string;
    updateTime?: string;
    remark?: string;
}


type LoveProject = {
    id: string;
    type: string;
    itemName: string;
    fund: number;
    amount: number;
    thumbnail: string;
    requiredCredit: number;
    startTime?: string;
    updateTime?: string;
    remark?: string;
}


type MarkingResult = {
    id: string;
    answerId: string;
    volunteerId: string;
    grade: number;
    isChecked: number;
    contentsType: string;
    contentsText: string;
    contentsPicture: string;
    startTime?: string;
    updateTime?: string;
    remark?: string;
}



type Report = {
    id: string;
    fromId: string;
    toId: string;
    contentsType: string;
    contentsText: string;
    contentsPicture: string;
    startTime?: string;
    updateTime?: string;
}


type Task = {
    id: string;
    thumbnail: string;
    title: string;
    description: string;
    deadline: string;
    contentsType: string;
    isNecessary: number;
    correctionTimes: number;
    startTime?: string;
    updateTime?: string;
    remark?: string;
}


type TaskHistory = {
    id: string;
    thumbnail: string;
    childId: string;
    taskId: string;
    description: string;
    startTime?: string;
    updateTime?: string;
    remark?: string;
}



type Volunteer = {
    id: string;
    account: string;
    password: string;
    avatar: string;
    name: string;
    age: number;
    gender: string;
    hasAuthority: number;
    province: string;
    city: string;
    district: string;
    description: string;
    detailedAddress: string;
    startTime?: string;
    updateTime?: string;
    remark?: string;
}


type VolunteerCredit = {
    id: string;
    volunteerId: string;
    currentCredit: number;
    startTime?: string;
    updateTime?: string;
    remark?: string;
}



type AnswerSheetDto = {
    answerSheet: AnswerSheet,
    markingResultList: Array<any>,
    isRemarked: string,
}

type RankVolunteerDto = {
    place: number,
    volunteerCreditList: Array<VolunteerCredit>,
}

type RankChildDto = {
    place: number,
    childCreditList: Array<ChildCredit>,
}

type AnswerSheetScoreMaxDTO = {
    answerSheet: AnswerSheet,
    scoreMax: number,
}

type AliyunOssDto = {
    accessKeyId: string,
    accessKeySecret: string,
    securityToken: string,
    expiration: string,
}

type TaskDto = {
    task: Task,
    isFinished: number,
}

type Result = {
    code: number
    msg: string
    data: any
}

type User = {
    account: string,
    password: string,
}

type ChildTaskFinishDetailsDTO = {
    points: number,
    studyDays: number,
    completedTasks: number,
    completionRate: number,
}

type AnswerChartDTO = {
    answerSheet: AnswerSheet,
    isNecessary: number,
}

export type {AnswerSheet, Child, ChildCredit, ExchangeHistory,
    LoveProject, MarkingResult, Report, Task, TaskHistory,
    Volunteer, VolunteerCredit, AnswerSheetDto, RankVolunteerDto,
    AnswerSheetScoreMaxDTO, AliyunOssDto, Result, User,
    ChildTaskFinishDetailsDTO, RankChildDto, TaskDto, AnswerChartDTO}
