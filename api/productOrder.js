import request from "@/utils/request";
export default {
  // 生成订单
  createOrder(vedioSortId) {
    return request({
      url: `/order/w-order/createOrder/${vedioSortId}`,
      method: "post"
    });
  },
}