import request from "@/utils/request";

export default {
    //根据手机号码发送短信
    getMobile(mobile) {
        return request({
            url: `/smsInfo/sms/send/${mobile}`,
            method: "get"
        });
    },

    //用户注册
    submitRegister(formItem) {
        return request({
            url: `/cms/w-member/register`,
            method: "post",
            data: formItem
        });
    },

    //用户登陆
    submitLogin(LoginInfo) {
        return request({
            url: `/cms/w-member/frontLogin`,
            method: "post",
            data: LoginInfo
        });
    },
    //根据token获取用户信息
    getLoginInfo() {
        return request({
            url: `cms/w-member/getLoginInfo`,
            method: "get"
            // headers: {'token': cookie.get('guli_token')}
        });
        //headers: {'token': cookie.get('guli_token')}
    }
};
