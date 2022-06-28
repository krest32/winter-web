<template>
<div id="aCoursesList">
    <!-- 博客文章开始-->

    <section class="container">
        <header class="comm-title">
            <h2 class="fl tac">
                <span class="c-333">全部视频</span>
            </h2>
            <!-- 浮动框,默认会浮动 在页面右侧 -->

            <aside class="fr">
                <label class="h-r-s-box">
                    <input type="text" placeholder="输入搜索的关键字" v-model="queryVedioVo.title" />
                    <button type="submit" class="s-btn" @click="searchVedio">
                        <em class="icon18">&nbsp;</em>
                    </button>
                </label>
            </aside>
        </header>
        
        <section class="c-sort-box">
            <section class="c-s-dl">
                <dl>
                    <dt>
                        <span class="c-999 fsize14">视频分类</span>
                    </dt>
                    <dd class="c-s-dl-li">
                        <ul class="clearfix">
                            <li v-for="(catelog,index) in catelogList" :key="catelog.id" :class="{active:threeIndex==index}">
                                <a :title="catelog.title" href="#" @click="getQueryVedioVo(catelog.id,index)">{{catelog.title}}</a>
                            </li>
                        </ul>
                    </dd>
                </dl>
            </section>

            <div>
                <section class="no-data-wrap" v-if="vedioList.total==0">
                    <em class="icon30 no-data-ico">&nbsp;</em>
                    <span class="c-666 fsize14 ml10 vam">没有相关数据，小编正在努力整理中...</span>
                </section>
                <article class="comm-course-list mt20">
                    <ul class="of" id="bna">
                        <li v-for="vedio in vedioList" :key="vedio.id">
                            <div class="cc-l-wrap">
                                <section class="course-img">
                                    <img :src="vedio.pictureAddress" class="img-responsive" :alt="vedio.title" />
                                    <div class="cc-mask" v-if="Number(vedio.isFree) === 1">
                                        <a :href="'/vediopages/vedio/' + vedio.id" title="开始阅读" class="comm-btn c-btn-1">开始观看</a>
                                    </div>
                                    <!-- 当视频收费时页面跳转 -->
                                    <div class="cc-mask" v-if="Number(vedio.isFree) === 0">
                                        <a :href="'/vediopages/vedioList/' + vedio.albumId" title="开始阅读" class="comm-btn c-btn-1">立即购买</a>
                                    </div>
                                </section>
                                <h3 class="hLh30 txtOf mt10">
                                    <div v-if="Number(vedio.isFree) === 1">
                                        <a :href="'/vediopages/vedio/' + vedio.id" :title="vedio.title" class="course-title fsize18 c-333">{{ vedio.title }}</a>
                                    </div>
                                    <!-- 当视频收费时页面跳转 -->
                                    <div v-if="Number(vedio.isFree) === 0">
                                        <a :href="'/vediopages/vedioList/' + vedio.albumId" :title="vedio.title" class="course-title fsize18 c-333">{{ vedio.title }}</a>
                                    </div>
                                </h3>
                                <section class="mt10 hLh20 of">
                                    <span class="fr jgTag bg-green" v-if="Number(vedio.isFree) === 1">
                                        <i class="c-fff fsize12 f-fA">免费</i>
                                    </span>
                                    <span class="fr jgTag bg-red" v-if="Number(vedio.isFree) === 0">
                                        <i class="c-fff fsize15 f-fA">￥:{{vedio.price}}</i>
                                    </span>
                                    <span class="fl jgAttr c-ccc f-fA">
                                        <i class="c-999 f-fA">{{ vedio.clickCount }}人看过</i>
                                        <!-- <i class="c-999 f-fA">{{ vedio.collectCount }}人收藏</i> -->
                                    </span>
                                    <span class="fr jgTag bg-red mr5">
                                        <a href="#" class="c-fff fsize12 f-fA " @click="collectVedio(vedio.id)">收藏</a>
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
                        <el-pagination :current-page="page" :page-size="limit" :total="total" style="padding: 30px 0; text-align: center" layout="total, prev, pager, next, jumper" @current-change="getVedioList" />
                    </client-only>
                </div>
            </div>
            <!-- 公共分页 结束 -->
        </section>
    </section>

</div>
<!-- /博客分类 结束 -->
</template>

<script>
import cookie from "js-cookie";
import vedioApi from "@/api/vedio";
import memberApi from "@/api/member"
export default {
    data() {
        return {
            page: 0,
            limit: 12,
            total: 0,
            queryVedioVo: {},
            vedioList: [],
            catelogList: [],
            threeIndex: -1,
            token: '',
            loginInfo: {},
            vedioCollect: {}

        };
    },

    created() {
        this.getVedioList();
        this.listCateLog()
    },

    methods: {
        showInfo() {
            //debugger
            // 从 cookies中获取用户信息，然后给与变量
            var jsonStr = cookie.get("winter_blogs_ucenter");
            //alert(jsonStr)
            //   如果要得到Json对象的数据，需要先对数据进行处理，数据存储在cookies中，形式并不是Json格式
            if (jsonStr) {
                this.loginInfo = JSON.parse(jsonStr);
            }

        },

        // 收藏视频
        collectVedio(id) {
            this.showInfo()
            console.log(this.loginInfo.id)
            if (this.loginInfo.id) {
                this.vedioCollect.memberId = this.loginInfo.id
                this.vedioCollect.vedioId = id
                console.log("vedioCollect:", this.vedioCollect)
                memberApi.addCollectVedio(this.vedioCollect).then(Response => {
                    this.$message({
                        type: 'success',
                        message: '收藏成功!'
                    })
                })
            } else {
                this.$message({
                    type: 'error',
                    message: '请先登陆!'
                })
            }

        },

        // 得到queryVedio的信息
        getQueryVedioVo(catelogId, index) {
            this.threeIndex = index;
            this.queryVedioVo.catelogId = catelogId
            this.getVedioList()

        },
        // 分类列表
        listCateLog() {
            vedioApi.listCateLog().then(Response => {
                this.catelogList = Response.data.data.list
            })
        },

        //搜素视频关键字
        searchVedio() {
            console.log(this.queryVedioVo)
            this.getVedioList()
        },

        // 获得Vedio列表信息
        getVedioList(page = 1) {
            this.page = page
            vedioApi.querySearchVedio(this.page, this.limit, this.queryVedioVo).then(Response => {
                this.vedioList = Response.data.data.vedioList;
                this.total = Response.data.data.total
                console.log(this.vedioList);
            });
        },

    }
};
</script>

<style scoped>
.active {
    background: #bdbdbd;
}

.hide {
    display: none;
}

.show {
    display: block;
}
</style>
