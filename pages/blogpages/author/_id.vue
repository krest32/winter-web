<template>
<div id="aCoursesList" class="bg-fa of">
    <!-- 讲师介绍 开始 -->
    <section class="container">
        <header class="comm-title">
            <h2 class="fl tac">
                <span class="c-333">作者介绍</span>
            </h2>
        </header>
        <div class="t-infor-wrap">
            <!-- 讲师基本信息 开始 -->
            <section class="fl t-infor-box c-desc-content">
                <div class="mt20 ml20">
                    <section class="t-infor-pic">
                        <img :src="authorInfo.pictureAddress" :alt="authorInfo.name">
                    </section>
                    <h3 class="hLh30">
                        <span class="fsize24 c-333">{{ authorInfo.name }}
                            &nbsp;
                            {{ authorInfo.level===1?'初级作者':'高级作者' }}
                        </span>
                    </h3>
                    <section class="mt10">
                        <span class="t-tag-bg">{{ authorInfo.intro }}</span>
                    </section>
                    <section class="t-infor-txt">
                        <p class="mt20">{{ authorInfo.career }}</p>
                    </section>
                    <div class="clear" />
                </div>
            </section>
            <!-- /讲师基本信息 结束 -->
            <div class="clear" />
        </div>
        <section class="mt30">
            <div>
                <header class="comm-title all-teacher-title c-course-content">
                    <h2 class="fl tac">
                        <span class="c-333">全部文章</span>
                    </h2>
                    <section class="c-tab-title">
                        <a href="javascript: void(0)">&nbsp;</a>
                    </section>
                </header>
                <!-- 无数据提示 开始-->
                <!-- <section class="no-data-wrap" v-if="courseList.total==0">
                    <em class="icon30 no-data-ico">&nbsp;</em>
                    <span class="c-666 fsize14 ml10 vam">没有相关数据，小编正在努力整理中...</span>
                </section> -->
                <!-- /无数据提示 结束-->

                <!-- 课程列表 开始-->
                <article class="comm-course-list">
                    <ul class="of">
                        <li v-for="blog in blogList" :key="blog.id">
                            <div class="cc-l-wrap">
                                <section class="course-img">
                                    <img :src="blog.pictureAddress" class="img-responsive">
                                    <div class="cc-mask">
                                        <a :href="'/blogpages/blog/'+blog.id" title="开始学习" target="_blank" class="comm-btn c-btn-1">开始学习</a>
                                    </div>
                                </section>
                                <h3 class="hLh30 txtOf mt10">
                                    <a :href="'/blogpages/blog/'+blog.id" :title="blog.title" target="_blank" class="course-title fsize18 c-333">{{ blog.title }}</a>
                                </h3>
                            </div>
                        </li>
                    </ul>
                    <div class="clear" />
                </article>
                <!-- /课程列表 结束-->
            </div>
            <!-- 公共分页 开始 -->
            <div>
                <div class="paging">
                    <client-only>
                        <el-pagination :current-page="page" :page-size="limit" :total="total" style="padding: 30px 0; text-align: center" layout="total, prev, pager, next, jumper" @current-change="getBlogByAuthor" />
                    </client-only>
                </div>
            </div>
            <!-- 公共分页 结束 -->
        </section>
    </section>
    <!-- /讲师介绍 结束 -->
</div>
</template>

<script>
import blogApi from '@/api/blog'
export default {
    data() {
        return {
            authorInfo: {},
            blogList: [],
            page: 0,
            limit: 12,
            total: 0
        };
    },

    created() {
        this.init()
    },

    methods: {
        init() {
            const id = this.$route.params.id;
            this.getAuthorById(id)
            this.getBlogByAuthor()
        },

        getAuthorById(id) {
            blogApi.getAuthorById(id).then(Response => {
                this.authorInfo = Response.data.data.author
                //  console.log("authorInfo:",this.authorInfo)
            })
        },

        // 根据author 得到blogList
        getBlogByAuthor(page = 1) {
            const id = this.$route.params.id;
            this.page = page
            blogApi.getBlogByAuthor(id, this.page, this.limit).then(Response => {
                this.blogList = Response.data.data.blogList
                this.total = Response.data.data.total
                console.log("blogList:", this.blogList)
            })
        }
    }
};
</script>
