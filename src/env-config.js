/*
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-12-17 14:29:26
 * @LastEditors: wwq
 * @LastEditTime: 2021-02-22 17:21:29
 */

import storageTool from './common/storageTool'

/**各环境变量参数
 * @param {*}
 * @return {*}
 */
// const envConfig = {
//     develop: {
//         //开发环境
//         "env": "develop",
//         "envName": "开发环境",
//         "protocol": 'https',
//         "fileDomain": "devapi.polyihome.com",
//         "apiDomain": "devapi.polyihome.com",
//         "h5Domain": "m.polyihome.develop",
//         "pcDomain": "web.polyihome.develop",

//     },
//     trial: {
//         //测试环境（体验版）
//         "env": "trial",
//         "envName": "测试环境（体验版）",
//         "protocol": 'https',
//         "fileDomain": "intapi.polyihome.com",
//         "apiDomain": "intapi.polyihome.com",
//         "h5Domain": "testm.polyihome.com",
//         "pcDomain": "testweb.polyihome.com",

//     },
//     // trial: {
//     //     //预生产，用户环境（体验版）
//     //     "env": "trial",
//     //     "envName": "测试环境（体验版）",
//     //     "protocol": 'https',
//     //     "fileDomain": "testapi.polyihome.com",
//     //     "apiDomain": "testapi.polyihome.com",
//     //     "h5Domain": "testm.polyihome.com",
//     //     "pcDomain": "testweb.polyihome.com",

//     // },
//     release: {
//         //生产环境
//         "env": "release",
//         "envName": "生产环境",
//         "protocol": 'https',
//         "fileDomain": "api.polyihome.com",
//         "apiDomain": "api.polyihome.com",
//         "h5Domain": "m.polyihome.com",
//         "pcDomain": "web.polyihome.com",

//     }
// }

const envAll = {
    int: {
        //开发环境
        "env": "develop",
        "envName": "开发环境",
        "protocol": 'https',
        "fileDomain": "devapi.polyihome.com",
        "apiDomain": "devapi.polyihome.com",
        "h5Domain": "m.polyihome.develop",
        "pcDomain": "web.polyihome.develop",
    },
    dev: {
        //测试环境（体验版）
        "env": "trial",
        "envName": "测试环境（体验版）",
        "protocol": 'https',
        "fileDomain": "intapi.polyihome.com",
        "apiDomain": "intapi.polyihome.com",
        "h5Domain": "testm.polyihome.com",
        "pcDomain": "testweb.polyihome.com",
    },
    uat: {
        //预生产，用户环境（体验版）
        "env": "trial",
        "envName": "测试环境（体验版）",
        "protocol": 'https',
        "fileDomain": "testapi.polyihome.com",
        "apiDomain": "testapi.polyihome.com",
        "h5Domain": "testm.polyihome.com",
        "pcDomain": "testweb.polyihome.com",
    },
    prd: {
        //生产环境
        "env": "release",
        "envName": "生产环境",
        "protocol": 'https',
        "fileDomain": "api.polyihome.com",
        "apiDomain": "api.polyihome.com",
        "h5Domain": "m.polyihome.com",
        "pcDomain": "web.polyihome.com",
    }

}

let env = storageTool.getEnv();
const currentEnvConfig = envAll[env];

/** api请求域名，带协议
 * @param {*}
 * @return {*}
 */
const baseUrl = currentEnvConfig['protocol'] + '://' + currentEnvConfig['apiDomain'];

/** h5请求域名，带协议
 * @param {*}
 * @return {*}
 */
const h5Url = currentEnvConfig['protocol'] + '://' + currentEnvConfig['h5Domain'];



// const currentEnv = {
//     getBaseUrl() {
//         let config = this.getConfig();
//         const _baseUrl = config['protocol'] + '://' + config['apiDomain'];
//         return _baseUrl;
//     },
//     getConfig() {
//         let env = storageTool.getEnv();
//         let config;
//         if (env) {
//             config = envAll[env];
//         } else {
//             switch (__wxConfig.envVersion) {
//                 case 'develop':
//                     config = envAll['dev'];
//                     break;
//                 case 'trial':
//                     config = envAll['uat'];
//                     break;
//                 default:
//                     config = envAll['prd'];
//             }
//         }
//         return config;
//     }
// }


export { currentEnvConfig, baseUrl, h5Url }