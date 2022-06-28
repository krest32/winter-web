import request from "@/utils/request";
export default {
    //得到VedioSort列表信息
    getVedioList() {
        return request({
            url: `/blogs/w-vedio-sort/ListAll`,
            method: "get"
        });
    },

    // 根据Id得到VedioList
    getSortVedioById(id) {
        return request({
            url: `/blogs/w-vedio-sort/getSortVedioById/${id}`,
            method: "get"
        });
    },

    //  根据id得到PlayAuth
    vedioPlayAuth(id) {
        return request({
            url: `/vedio/vedio/getVedioPlayAuth/${id}`,
            method: "get"
        });
    },

    // 条件查询 Vedio
    querySearchVedio(page, limit, queryVedioVo) {
        return request({
            url: `/vedio/vedio/querySearchVedio/${page}/${limit}`,
            method: "post",
            data: queryVedioVo
        });
    },

    // 列出所有的视频分类
    listCateLog() {
        return request({
            url: `/vedio/catelog/listCateLog`,
            method: "get"
        });
    },

    // 根据vedio，的搭配专辑列表
    getVedioListById(Id, page, limit, queryVedioVo) {
        return request({
            url: `/vedio/vedio/getVedioListById/${Id}/${page}/${limit}`,
            method: "post",
            data: queryVedioVo
        });
    },

    getVedioListByVedioId(vedioId, page, limit, queryVedioVo) {
        return request({
            url: `/vedio/vedio/getVedioListByVedioId/${vedioId}/${page}/${limit}`,
            method: "post",
            data: queryVedioVo
        });
    },

    //查看视频是否被购买
    isBuyAlbum(memberid, albumId) {
        return request({
            url: `/member/member/isBuyAlbum/${memberid}/${albumId}`,
            method: "get",
        });
    }
};
