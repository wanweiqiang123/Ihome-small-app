# sales-small-app 微信小程序

## npm install  
## npm run serve  
## npm run build  

## 注意事项

小程序代码上传限制是2M，注意静态图片的大小

UI框架使用uviewUI  https://www.uviewui.com/components/intro.html

uni.redirectTo   跳转后左上角会出现首页图标

uni.navigateTo   跳转后左上角会出现返回图标

分包：
customerPackage  客户
intermediaryPackage   中介渠道
staffPackage  员工案场

登录后根据用户类型跳转对应的模块

XXXTabBar   需要自定义tabBar的，在页面的最外层加上此组件