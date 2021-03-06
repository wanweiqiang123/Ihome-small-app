/*
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-12-17 14:29:26
 * @LastEditors: wwq
 * @LastEditTime: 2021-05-24 09:57:14
 */

import storageTool from './common/storageTool'

/**各环境变量参数
 * @param {*}
 * @return {*}
 */

const envAll = {
    dev: {
        //开发环境
        "env": "develop",
        "envName": "开发环境",
        "protocol": 'https',
        "fileDomain": "devapi.polyihome.com",
        "apiDomain": "devapi.polyihome.com",
        "h5Domain": "devm.polyihome.com",
        "pcDomain": "devweb.polyihome.com",
    },
    int: {
        //测试环境（体验版）
        "env": "trial",
        "envName": "测试环境（体验版）",
        "protocol": 'https',
        "fileDomain": "intapi.polyihome.com",
        "apiDomain": "intapi.polyihome.com",
        "h5Domain": "intm.polyihome.com",
        "pcDomain": "intweb.polyihome.com",
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

//强制生产环境只用生产地址
if (__wxConfig.envVersion == 'release') {
    env = 'prd';
}
// if (env == 'dev') {
//     env = 'int';
// }
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


export { currentEnvConfig, baseUrl, h5Url, envAll }