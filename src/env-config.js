/*
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-12-17 14:29:26
 * @LastEditors: zyc
 * @LastEditTime: 2021-01-20 09:57:11
 */

/**各环境变量参数
 * @param {*}
 * @return {*}
 */
const envConfig = {
    develop: {
        //开发环境
        "env": "develop",
        "envName": "开发环境",
        "protocol": 'https',
        "fileDomain": "devapi.polyihome.com",
        "apiDomain": "devapi.polyihome.com",
        "h5Domain": "m.polyihome.develop",
        "pcDomain": "web.polyihome.develop",
 
    },
    trial: {
        //测试环境（体验版）
        "env": "trial",
        "envName": "测试环境（体验版）",
        "protocol": 'https',
        "fileDomain": "intapi.polyihome.com",
        "apiDomain": "intapi.polyihome.com",
        "h5Domain": "testm.polyihome.com",
        "pcDomain": "testweb.polyihome.com",

    },
    // trial: {
    //     //预生产，用户环境（体验版）
    //     "env": "trial",
    //     "envName": "测试环境（体验版）",
    //     "protocol": 'https',
    //     "fileDomain": "testapi.polyihome.com",
    //     "apiDomain": "testapi.polyihome.com",
    //     "h5Domain": "testm.polyihome.com",
    //     "pcDomain": "testweb.polyihome.com",

    // },
    release: {
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

/**当前环境变量参数
 * @param {*}
 * @return {*}
 */
const currentEnvConfig = envConfig[__wxConfig.envVersion];

/** api请求域名，带协议
 * @param {*}
 * @return {*}
 */
const baseUrl = currentEnvConfig['protocol'] + '://' + currentEnvConfig['apiDomain'];

export { envConfig, currentEnvConfig, baseUrl }