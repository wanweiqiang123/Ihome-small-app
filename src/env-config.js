/*
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-12-17 14:29:26
 * @LastEditors: zyc
 * @LastEditTime: 2020-12-17 14:55:50
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
        "protocol": 'http',
        "fileDomain": "api.polyihome.develop",
        "apiDomain": "api.polyihome.develop",
        "h5Domain": "m.polyihome.develop",
        "pcDomain": "web.polyihome.develop",

    },
    trial: {
        //测试环境（体验版）
        "env": "trial",
        "envName": "测试环境（体验版）",
        "protocol": 'https',
        "fileDomain": "test.api.polyihome.com",
        "apiDomain": "test.api.polyihome.com",
        "h5Domain": "test.m.polyihome.com",
        "pcDomain": "test.web.polyihome.com",

    },
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


export { envConfig, currentEnvConfig }