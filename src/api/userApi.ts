import {request} from "@/utils/request";
import type {User} from "@/ts/types";


const loginApi = (data: User) => {
    return request('child/login', 'POST', data);
}

export {loginApi}
