import request from "@/utils/request";
export default {
    // 生成订单
    createOrder(orderVedio) {
        return request({
            url: `/member/order-vedio/createOrderVedio`,
            method: "post",
            data: orderVedio
        });
    },

    // 根据订单获得订单信息
    getOrderInfo(id) {
        return request({
            url: `/member/order-vedio/getOrderVedioInfo/${id}`,
            method: "get",
        });
    },

    // 根据订单获得订单信息
    createNative(id) {
        return request({
            url: `/member/pay-log/createNative/${id}`,
            method: "get",
        });
    },

    //查询支付状态
    queryPayStatus(id) {
        return request({
            url: `/member/pay-log/queryPayStatus/${id}`,
            method: "get",
        });
    }


}