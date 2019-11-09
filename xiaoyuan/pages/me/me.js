// me.js
// 获取应用实例
const app = getApp();

Page({
    clearUserInfo: function() {
        qq.clearStorage({
            success: res => {
                qq.showToast({
                title: '清除成功！',
                icon: 'success',
                duration: 1000
            })
            }
        })
    }
})