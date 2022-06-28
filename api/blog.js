import request from "@/utils/request";
export default {
    ///////////////////////////////sort 开始/////////////////////////////////////////////////
    // 获得所有的分类列表
    listAllSort() {
        return request({
            url: `/blog/sort/listAllSort`,
            method: "get"
        });
    },


    ///////////////////////////////blog 开始/////////////////////////////////////////////////

    // 根据author id 得到BlogList
    getBlogByAuthor(id, page, limit) {
        return request({
            url: `/blog/blog/getBlogByAuthor/${id}/${page}/${limit}`,
            method: "get"
        });
    },

    // 根据id得到Blogw
    webGetBlogById(id) {
        return request({
            url: `/blog/blog/webGetBlogById/${id}`,
            method: "get"
        });
    },

    // 获取Blog列表
    PageQueryBlog(page, limit, queryBlogVo) {
        return request({
            url: `/blog/blog/PageQueryBlog/${page}/${limit}`,
            method: "post",
            data: queryBlogVo
        });
    },



    ///////////////////////////////blog 结束/////////////////////////////////////////////////
    ///////////////////////////////author 开始/////////////////////////////////////////////////


    //根据id得到作者信息
    getAuthorById(id) {
        return request({
            url: `/blog/author/getAuthorById/${id}`,
            method: "get"
        });
    },



    //根据id得到作者信息
    PageQueryAuthor(page, limit, querAuthor) {
        return request({
            url: `/blog/author/PageQueryAuthor/${page}/${limit}`,
            method: "post",
            data: querAuthor
        });
    },
    ///////////////////////////////author 结束////////////////////////////////////////////////

    // 列出所有tag
    ListTag() {
        return request({
            url: `/blog/tag/listAllTag`,
            method: "get"
        });
    },

    queryBlogListByTagId(tagId) {
        return request({
            url: `/blog/tag-relation/queryBlogListByTagId/${tagId}`,
            method: "get"
        });
    }

};