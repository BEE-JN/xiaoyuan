// login.js
// 获取应用实例
const app = getApp();

Page({
    data: {
        stuid: null,
        password: null,
        rembPwStatus: false
    },

    onShow() {
        // 用户名自动填充
        qq.getStorage({
            key: 'stuid',
            success: res => {
                if (res.data != "") {
                    this.setData({
                        stuid: res.data
                    })
                }
            }
        })
    },

    inputId: function(e) {
        this.setData({
            stuid: e.detail.value
        })
    },

    inputPw: function(e) {
        this.setData({
            password: e.detail.value
        })
    },

    // 是否记住密码
    rembPw(e) {
        if (e.detail.value == true) {
            this.setData({
                rembPwStatus: true
            })      
        } else if (e.detail.value == false) {
            this.setData({
                rembPwStatus: false
            })
        }
    },

    login: function(e) {
        // 当学号和密码不为空时允许提交
        if (this.data.stuid == null) {
            qq.showToast({
                title: '请输入学号!',
                icon: 'none',
                duration: 1000
            })  
        } else if (this.data.password == null) {
            qq.showToast({
                title: '请输入密码!',
                icon: 'none',
                duration: 1000
            })
        } else {
            // 调用储存能力
            qq.setStorage({
                key: 'stuid',
                data: this.data.stuid
            })
            // 全局变量赋值，方便后续的request
            app.globalData.stuid = this.data.stuid
            // 如果用户记住密码
            if (this.data.rembPwStatus == true) {
                qq.setStorage({
                    key: 'password',
                    data: this.data.password
                })
                app.globalData.stuid = this.data.password
            }
            qq.switchTab({
                url: '../index/index'
            })
        }  
    }
})