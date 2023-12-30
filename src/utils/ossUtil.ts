// @ts-ignore
import crypto from 'crypto-js';
import { Base64 } from 'js-base64';
import {request} from "@/utils/request";

// 计算签名。
function computeSignature(accessKeySecret: any, canonicalString: any) {
    return crypto.enc.Base64.stringify(crypto.HmacSHA1(canonicalString, accessKeySecret));
}

const date = new Date();
date.setHours(date.getHours() + 1);
const policyText = {
    expiration: date.toISOString(), // 设置policy过期时间。
    conditions: [
        // 限制上传大小。
        ["content-length-range", 0, 1024 * 1024 * 1024],
    ],
};

async function getFormDataParams() {
    const credentials : any = await request('/oss/getUploadPolicy', 'GET')
    // const credentials  = {
    //     AccessKeySecret: '5LVwS6sCsU1ma4wBb7sJL6MLQqQrkWCTye2AHSC6vQ5V',
    //     AccessKeyId: 'STS.NUfh9kgYvQrFqSRtPViLBHHcq',
    //     SecurityToken: 'CAISogJ1q6Ft5B2yfSjIr5bTI4PfioZX5rCtc3XjkFADZcNup43Ikzz2IHhMeXduCO4asf0ymWtX7vselrpiTIJff0vAYPB99Y9W9gWHao/M4wVCHgzU0c/LI3OaLjKm9tewCryLT7GwU/OpbE++2U0X6LDmdDKkckW4OJmS8/BOZcgWWQ/KClgjA8xNdDN/tOgQN3baKYz8UHjQj3HXEVBjtydllGp78t7f+MCH7QfEh1CIv41mro/qcJ+/dJsubtUtSNe02u1wee/NyiNZ7l8I1t8v1fwfoGqX44/EWgUNv0zYCYeOrI0zdj0eT7MhBqtJoML7kfBFoeHJn+z1sU0VZbwLDXWBGN/5nZafR7v0asxbb7/+PG/Wzt2UKol9J5TBsJj+XhqAARju/fb5+w6LFsIhIz+T8FCpAw+TckafqKAYZ3qlnUBzStDRwuSBeazU/xYBan5NR2t7ZJMb6wMwrXyJkMNDdY9XR3OLhLC1c+l6mqB3pQdr3+ZCOFCs3W5OP2X97ILfKmmqlY8KEc+QIRpS+ubnl5u4f1/eB5rArQlNK+GQk5BQIAA='
    // }
    const policy = Base64.encode(JSON.stringify(policyText)) // policy必须为base64的string。
    const signature = computeSignature(credentials.AccessKeySecret, policy)
    const formData = {
        OSSAccessKeyId: credentials.AccessKeyId,
        signature,
        policy,
        'x-oss-security-token': credentials.SecurityToken
    }
    return formData
}


const host = 'https://shining-dream.oss-cn-beijing.aliyuncs.com';
const ossAccessKeyId = '<accessKey>';

/**
 * 上传文件
 * @param filePath 本地文件路径
 * @param dir 上传到oss的文件夹
 * @param success  成功回调 返回文件路径
 * @param fail 失败回调 返回错误信息
 */

const uploadFile = function (filePath: string, dir: string = '', success: (res: any)=> void, fail: (err: any)=> void) {
    if (!filePath || filePath.length ==0) {
         uni.showModal({
            title: '文件错误',
            content: '请重试',
            showCancel: false,
        })
        return;
    }
    console.log('上传文件.....');
    // 获取上传的文件类型
    let fileTypeIndex = filePath.lastIndexOf('.');
    let fileType = filePath.substring(fileTypeIndex);
    // 图片名字 可以自行定义， 这里是采用当前的时间戳 + 150内的随机数来给图片命名的
    const aliyunFileKey = dir + new Date().getTime() + Math.floor(Math.random() * 150) + fileType;

    let status = 0

    getFormDataParams().then((formData) => {
        console.log('formData', formData)
        uni.uploadFile({
            url: host,//开发者服务器 url
            filePath: filePath,//要上传文件资源的路径
            name: 'file',//必须填file
            formData: {
                key: aliyunFileKey,
                policy :formData.policy,
                OSSAccessKeyId: formData.OSSAccessKeyId,
                signature: formData.signature,
                'x-oss-security-token': formData["x-oss-security-token"]
            },
            success: function (res) {
                success(res)
            },
            fail: function (err) {
                fail(err)
            },
        })
    }).catch((err) => {
        console.log('err', err);
        return null;
    })
}

export default uploadFile;
