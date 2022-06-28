<template>
<div id="aCoursesList" class="bg-fa of">
    <!-- Blog 开始 -->
    <section class="container">
        <section class="path-wrap txtOf hLh30">
            <a href="/" title class="c-999 fsize14">首页</a>
            \
            <a href="/vediopages/vedioList" title class="c-999 fsize14">视频列表</a>
        </section>
        <div>
            <article class="c-v-pic-wrap">
                <section id="videoPlay" class="p-h-video-box">
                    <img :src="albumInfo.pictureAddress" :alt="albumInfo.title" class="dis c-v-pic" height="357px">
                </section>
            </article>
            <aside class="c-attr-wrap">
                <section class="ml20 mr15">
                    <h2 class="hLh30 txtOf mt15">
                        <span class="c-fff fsize24">{{ albumInfo.title }}</span>
                    </h2>
                    <section class="c-attr-jg">
                        <span class="c-fff">价格：</span>
                        <b class="c-yellow" style="font-size:24px;">￥{{ albumInfo.price }}</b>
                    </section>
                    <!-- <section class="c-attr-mt of">
                        <span class="ml10 vam">
                            <em class="icon18 scIcon" />
                            <a class="c-fff vam" title="收藏" href="#">收藏</a>
                        </span>
                    </section> -->
                    <section class="c-attr-mt">
                        <!-- <div v-if="isBuy === 1">
                            <a href="#" title="立即观看" class="comm-btn c-btn-3">立即观看</a>
                        </div> -->
                        <div v-if="isBuy === 0">
                            <a href="#" title="立即观看" class="comm-btn c-btn-3" @click="buyAlbum">立即购买</a>
                        </div>

                    </section>
                </section>
            </aside>
            <aside class="thr-attr-box">
                <ol class="thr-attr-ol">
                    <li>
                        <p>&nbsp;</p>
                        <aside>
                            <span class="c-fff f-fM">播放数</span>
                            <br>
                            <h6 class="c-fff f-fM mt10">{{ albumInfo.playCount }}</h6>
                        </aside>
                    </li>
                    <li>
                        <p>&nbsp;</p>
                        <aside>
                            <span class="c-fff f-fM">购买数</span>
                            <br>
                            <h6 class="c-fff f-fM mt10">{{ albumInfo.puyCount }}</h6>
                        </aside>
                    </li>
                    <li>
                        <p>&nbsp;</p>
                        <aside>
                            <span class="c-fff f-fM">收藏数</span>
                            <br>
                            <h6 class="c-fff f-fM mt10">{{ albumInfo.collectCount }}</h6>
                        </aside>
                    </li>
                </ol>
            </aside>
            <div class="clear" />
        </div>
    </section>

    <!-- 视频列表信息基本信息 开始 -->
    <section class="container">
        <header class="comm-title">
            <h2 class="fl tac">
                <span class="c-333" :title="albumTitle">专辑：《{{albumTitle}}》</span>
            </h2>
        </header>
        <section class="c-sort-box">
            <div>
                <article class="comm-course-list">
                    <ul class="of" id="bna">
                        <li v-for="vedio in vedioList" :key="vedio.id">
                            <div class="cc-l-wrap">
                                <section class="course-img">
                                    <img :src="vedio.pictureAddress" class="img-responsive" :alt="vedio.title" />
                                    <div class="cc-mask" v-if="isBuy === 1 || Number(vedio.isFree) === 1">
                                        <a :href="'/vediopages/vedio/' + vedio.id" title="开始观看" class="comm-btn c-btn-1">开始观看</a>
                                    </div>

                                    <!-- 当视频收费时页面跳转 -->
                                    <div class="cc-mask" v-if="isBuy === 0 && Number(vedio.isFree) === 0">
                                        <a :href="'/vediopages/vedioList/' + vedio.albumId" title="立即购买" class="comm-btn c-btn-1">立即购买</a>
                                    </div>
                                </section>
                                <h3 class="hLh30 txtOf mt10">
                                    <div v-if="isBuy === 1 || Number(vedio.isFree) === 1">
                                        <a :href="'/vediopages/vedio/' + vedio.id" :title="vedio.title" class="course-title fsize18 c-333">{{ vedio.title }}</a>
                                    </div>
                                    <!-- 当视频收费时页面跳转 -->
                                    <div v-if="isBuy === 0">
                                        <a :href="'/vediopages/vedioList/' + vedio.albumId" :title="vedio.title" class="course-title fsize18 c-333">{{ vedio.title }}</a>
                                    </div>
                                </h3>
                                <!-- 当视频收费时页面跳转 -->

                                <section class="mt10 hLh20 of">
                                    <span class="fr jgTag bg-green" v-if="Number(vedio.isFree) === 1">
                                        <i class="c-fff fsize12 f-fA">免费</i>
                                    </span>
                                    <span class="fr jgTag bg-red" v-if="Number(vedio.isFree) === 0">
                                        <i class="c-fff fsize15 f-fA">￥:{{vedio.price}}</i>
                                    </span>

                                    <span class="fl jgAttr c-ccc f-fA">
                                        <i class="c-999 f-fA">{{ vedio.clickCount }}人看过</i>
                                        <i class="c-999 f-fA">{{ vedio.collectCount }}人收藏</i>
                                    </span>
                                </section>
                            </div>
                        </li>
                    </ul>
                    <div class="clear"></div>
                </article>
            </div>
            <!-- 公共分页 开始 -->
            <div>
                <div class="paging">
                    <client-only>
                        <el-pagination :current-page="vedioPage" :page-size="vedioLimit" :total="vedioTotal" style="padding: 30px 0; text-align: center" layout="total, prev, pager, next, jumper" @current-change="getAblum" />
                    </client-only>
                </div>
            </div>
            <!-- 公共分页 结束 -->
        </section>
    </section>
    <!-- /课程基本信息 结束 -->

    <!-- 专辑详情 结束 -->
</div>
</template>

<script>
import cookie from "js-cookie";
import vedioApi from "@/api/vedio";
import commentApi from "@/api/comment";
import buyVedioApi from "@/api/buyVedio";
export default {
    data() {
        return {
            albumTitle: '',
            vedioPage: 0,
            vedioLimit: 8,
            vedioTotal: 0,
            queryVedioVo: {},
            albumInfo: {},
            isbuy: "",
            vedioSortInfo: {},
            vedioList: [],
            page: 0,
            limit: 5,
            commentList: [],
            comment: {},
            total: 0,
            orderNo: "",
            loginInfo: {},
            orderInfo: {},
            isBuy: 0
        };
    },
    created() {
        this.getAblum();
        this.isBuyAlbum()
    },
    methods: {
        isBuyAlbum() {
            var jsonStr = cookie.get("winter_blogs_ucenter");
            if (jsonStr) {
                this.loginInfo = JSON.parse(jsonStr);
                const id = this.$route.params.id;
                console.log("this.loginInfo.id, id:", this.loginInfo.id, id)
                vedioApi.isBuyAlbum(this.loginInfo.id, id).then(Response => {
                    console.log("Response:", Response)
                    this.isBuy = Response.data.data.isBuy
                    console.log("isBuy:", this.isBuy)
                })
            }
        },
        // 校验是否登陆
        checkLogin() {
            // 从 cookies中获取用户信息，然后给与变量
            var jsonStr = cookie.get("winter_blogs_ucenter");
            //alert(jsonStr)
            //   如果要得到Json对象的数据，需要先对数据进行处理，数据存储在cookies中，形式并不是Json格式
            if (jsonStr) {
                this.loginInfo = JSON.parse(jsonStr);
            } else {
                this.$message({
                    type: "error",
                    message: "请先登陆!"

                });
                this.$router.push({
                    path: "/member/login"
                });
            }
        },

        // 购买专辑
        buyAlbum() {
            this.checkLogin()
            // 如果已经登陆，执行下面逻辑
            if (this.loginInfo.id) {
                this.orderInfo.albumId = this.albumInfo.id
                this.orderInfo.memberId = this.loginInfo.id
                console.log("orderInfo:", this.orderInfo)
                buyVedioApi.createOrder(this.orderInfo).then(Response => {
                    this.$router.push({
                        path: "/buyVedio/order/" + Response.data.data.orderId
                    });
                })
            }
        },

        //生成订单
        createOrder() {
            const id = this.$route.params.id;
            orderApi.createOrder(id).then(Response => {
                this.orderNo = Response.data.data.orderNo;
                console.log(this.orderNo);
                this.$router.push({
                    path: "/order/" + this.orderNo
                });
            });
        },

        //得到VedioSort分类下的详细信息

        getAblum(vedioPage = 1) {
            this.vedioPage = vedioPage
            const id = this.$route.params.id
            vedioApi.getVedioListById(id, this.vedioPage, this.vedioLimit, this.queryVedioVo).then(Response => {
                this.vedioList = Response.data.data.vedioList
                this.vedioTotal = Response.data.data.total
                this.albumInfo = Response.data.data.albumInbfo
                this.albumTitle = Response.data.data.albumTitle
                // 调试显示
                console.log(this.vedioList);
                console.log(this.albumInfo);
            });
        },

        // 获取评论列表
        getCommentList(page = 1) {
            const vediosortId = this.$route.params.id;
            this.page = page;
            commentApi
                .getCommentList(this.page, this.limit, vediosortId)
                .then(Response => {
                    this.commentList = Response.data.data.commentList;
                    this.total = Response.data.data.total;
                    // 调试显示
                    //   console.log(this.total);
                    //   console.log(this.commentList);
                });
        },

        //添加评论
        addComment() {
            this.comment.vediosortId = this.$route.params.id;
            commentApi.saveComment(this.comment).then(Response => {
                if (Response.data.success) {
                    this.getCommentList();
                    this.comment.content = "";
                    return this.$message({
                        type: "success",
                        message: "保存成功!"
                    });
                } else {
                    this.getCommentList();
                    this.comment.content = "";
                    this.$message({
                        type: "error",
                        message: "请先登录"
                    });
                }
            });
        }
    }
};
</script>

<style scoped>
#warp {
    position: absolute;
    width: 500px;
    height: 200px;
    left: 50%;
    top: 50%;
    margin-left: -250px;
    margin-top: -100px;
    border: solid 3px red;
}
</style>
