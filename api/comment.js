import request from "@/utils/request";
export default {
  // 保存信息的评论
  saveComment(commentInfo) {
    return request({
      url: `/cms/w-comment/saveComment`,
      method: "post",
      data: commentInfo
    });
  },

  // 获取评论列表
  getCommentList(page, limit, vedioSortId) {
    return request({
      url: `/cms/w-comment/getCommentByVedioSortId/${page}/${limit}/${vedioSortId}`,
      method: "get"
    });
  }
};
