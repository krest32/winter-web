import request from "@/utils/request";

export default {
    // 删除订单
    deleteOrder(id) {
        return request({
            url: `/others/product-order/deleteOrderById/${id}`,
            method: "get"
        });
    },

    //根据手机号码发送短信
    getMobile(mobile) {
        return request({
            url: `/others/Aliyun/send/${mobile}`,
            method: "get"
        });
    },

    //用户注册
    submitRegister(formItem) {
        return request({
            url: `/member/member/register`,
            method: "post",
            data: formItem
        });
    },

    //用户登陆
    submitLogin(LoginInfo) {
        return request({
            url: `/member/member/frontLogin`,
            method: "post",
            data: LoginInfo
        });
    },
    //根据token获取用户信息
    getLoginInfo() {
        return request({
            url: `/member/member/getLoginInfo`,
            method: "get"
            // headers: {'token': cookie.get('guli_token')}
        });
        //headers: {'token': cookie.get('guli_token')}
    },

    getMemberInfo(id) {
        return request({
            url: `/member/member/getMemberInfo/${id}`,
            method: "get",
        });
    },

    updateMemberInfo(memberInfo) {
        return request({
            url: `/member/member/updateMember`,
            method: "post",
            data: memberInfo
        });
    },

    // 获取收藏的视频列表
    getCollectVedio(id, page, limit) {
        return request({
            url: `/member/member/getCollectVedio/${id}/${page}/${limit}`,
            method: "get",
        });
    },

    // 收藏视频
    addCollectVedio(vedioCollect) {
        return request({
            url: `/member/vediocollect/addCollectVedio`,
            method: "post",
            data: vedioCollect
        });
    },

    // 取消收藏视频
    cancelCcollect(vedioCollect) {
        return request({
            url: `/member/vediocollect/cancelCollect`,
            method: "post",
            data: vedioCollect
        });
    },

    // 添加地址信息
    addNewAddress(addressInfo) {
        return request({
            url: `/member/address/addNewAddress`,
            method: "post",
            data: addressInfo
        });
    },

    // 根据会员id得到所有地址
    getAddressByMemberId(id) {
        return request({
            url: `/member/address/getAddressByMemberId/${id}`,
            method: "get"
        });
    },

    //根据id删除地址信息
    deleteAddressById(id) {
        return request({
            url: `/member/address/deleteAddressById/${id}`,
            method: "delete"
        });
    },

    //根据id得到address信息
    getAddressById(id) {
        return request({
            url: `/member/address/getAddressById/${id}`,
            method: "get"
        });
    },

    // 根据idgengxindizhixinxi
    updateAddressById(addressInfo) {
        return request({
            url: `/member/address/updateAddressById`,
            method: "post",
            data: addressInfo
        });
    },

    // 根据Id查询订单信息
    getOrderList(memberId) {
        return request({
            url: `/others/product-order/getOrderList/${memberId}`,
            method: "get"
        });
    }

};
