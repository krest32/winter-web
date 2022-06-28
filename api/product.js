import request from "@/utils/request";
export default {

    getProductById(id) {
        return request({
            url: `/product/product/getProductById/${id}`,
            method: "get"
        });
    },



    ListCateLogOne() {
        return request({
            url: `/shop/w-catelog-sort/ListCateLogOne`,
            method: "get"
        });
    },

    // 获取选择的商品
    searchProduct(page, limit, data) {
        return request({
            url: `/others/es/searchProduct/${page}/${limit}`,
            method: "post",
            data: data
        });
    },

    // 列出所有的一级分类
    listCateLogThree() {
        return request({
            url: `/product/catelog/listCateLogThree`,
            method: "get"
        });
    },

    // 列出所有的二级分类
    ListChildCatelog(id) {
        return request({
            url: `/product/catelog/ListChildCatelog/${id}`,
            method: "get"
        });
    },

    /////////////////////////////////////////////购物车功能 Start////////////////////////////////////////////////////////////
    addCartItem(productId, num) {
        return request({
            url: `/others/cart/addCartItem/${productId}/${num}`,
            method: "get"
        });
    },


    getCartList() {
        return request({
            url: `/others/cart/getCartList`,
            method: "get"
        });
    },

    changeCartItemNum(productId, num) {
        return request({
            url: `/others/cart/changeCartItemNum/${productId}/${num}`,
            method: "get"
        });
    },

    deleteCartItem(productId) {
        return request({
            url: `/others/cart/deleteCartItem/${productId}`,
            method: "delete"
        });
    },

    /////////////////////////////////////////////购物车功能 end////////////////////////////////////////////////////////////


    /////////////////////////////////////////////订单功能 Start////////////////////////////////////////////////////////////

    // 创建订单
    createOrder(id) {
        return request({
            url: `/others/product-order/createOrder/${id}`,
            method: "get"
        });
    },

    // 提交订单
    submitOrder(orderSubmitVo) {
        return request({
            url: `/others/product-order/submitOrder`,
            method: "post",
            data: orderSubmitVo
        });
    },

    // 生成支付二维码
    createNative(orderNo) {
        return request({
            url: `/others/product-order-paylog/createNative/${orderNo}`,
            method: "get"
        });
    },

    // 查询支付状态
    queryPayStatus(orderNo) {
        return request({
            url: `/others/product-order-paylog/queryPayStatus/${orderNo}`,
            method: "get"
        });
    }

    /////////////////////////////////////////////订单功能 end////////////////////////////////////////////////////////////

}