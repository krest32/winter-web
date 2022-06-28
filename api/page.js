import request from "@/utils/request";
export default {
    listBanner() {
        return request({
            url: `/others/banner/listBanner`,
            method: "get"
        });
    },

    // 获得视频列表
    vedioListOrderByPlayCount() {
        return request({
            url: `/vedio/vedio/vedioListOrderByPlayCount`,
            method: "get"
        });
    },

    // 获得作者列表
    webAuthorList() {
        return request({
            url: `/blog/author/webAuthorList`,
            method: "get"
        });
    },

    // 获得blog列表
    getHotBlog() {
        return request({
            url: `/blog/blog/getHotBlog`,
            method: "get"
        });
    },


    // 获得blog列表
    getNewProducts() {
        return request({
            url: `/product/product/listNewProducts`,
            method: "get"
        });
    },

};
