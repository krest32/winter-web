import axios from "axios";
import { MessageBox, Message } from "element-ui";
// 导入cookies的依赖
import cookie from "js-cookie";
// 创建axios实例
const service = axios.create({
    baseURL: "http://localhost:9002", // api的base_url
    timeout: 20000 // 请求超时时间
});

// http request 拦截器,
// Java的接口是通过http请求当中的header来获取信息的，所以拦截器的作用就是将cookies信息放入到请求头当中
// service.interceptors.request.use，意思是系统服务.拦截器。每次发从request请求时使用它
service.interceptors.request.use(
    config => {
        //debugger
        // 查找cookies中是否有对应的key的值，如果有就放入到请求头当中
        if (cookie.get("w_blogs_token") && cookie.get("user-key")) {
            config.headers["user-key"] = cookie.get("user-key");
            config.headers["token"] = cookie.get("w_blogs_token");
        } else if (cookie.get("w_blogs_token")) {
            config.headers["token"] = cookie.get("w_blogs_token");
        } else if (cookie.get("user-key")) {
            config.headers["user-key"] = cookie.get("user-key");
        } else {
            //设置UUID的方法
            var s = [];
            var hexDigits = "0123456789abcdef";
            for (var i = 0; i < 36; i++) {
                s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
            }
            s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
            s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
            s[8] = s[13] = s[18] = s[23] = "-";
            var uuid = s.join("");
            cookie.set("user-key", uuid, { expires: 30 }, { domain: "localhost" });
        }
        return config;
    },
    err => {
        return Promise.reject(err);
    }
);

// http response 拦截器
service.interceptors.response.use(
    response => {
        //debugger
        if (response.data.code == 2000) {
            console.log("response.data.resultCode是28004");
            // 返回 错误代码-1 清除ticket信息并跳转到登录页面
            //debugger
            window.location.href = "/login";
            return;
        } else {
            if (response.data.code !== 20000) {
                //25000：订单支付中，不做任何提示
                if (response.data.code != 25000) {
                    Message({
                        message: response.data.message || "error",
                        type: "error",
                        duration: 5 * 1000
                    });
                }
            } else {
                return response;
            }
        }
    },
    error => {
        return Promise.reject(error.response); // 返回接口返回的错误信息
    }
);

export default service;
