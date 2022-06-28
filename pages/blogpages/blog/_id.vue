<template>

<div id="aCoursesList" class="bg-fa of">
    <!-- Blog 开始 -->

    <section class="container">
        <!-- Blog所属分类 开始 -->
        <section class="path-wrap txtOf hLh30">
            <a href="/" title="title" class="c-999 fsize14">首页</a>
            \
            <a href="/blogpages/blogList" title="title" class="c-999 fsize14">博客列表</a>
        </section>
        <!-- /课程所属分类 结束 -->

        <div class="mt20 c-infor-box">
            <article class="fl col-7">
                <section class="mr5">
                    <div class="i-box">
                        <div>
                            <section id="c-i-tabTitle" class="c-infor-tabTitle c-tab-title">
                                <a name="c-i" class="current" title="博客标题">{{blogInfo.title}}</a>
                            </section>
                        </div>

                        <!-- 将内容中的html翻译过来 -->
                        <div id="app">
                            <span>
                                  <p v-html="blogInfo.content"></p>
                            </span>
                          
                        </div>
                    </div>
                </section>
            </article>
            <aside class="fl col-3">
                <div class="i-box">
                    <!-- 主讲讲师 开始-->
                    <!-- 主讲讲师 开始-->
                    <div>
                        <section class="c-infor-tabTitle c-tab-title">
                            <a title="title" href="javascript:void(0)">作者</a>
                        </section>
                        <section class="stud-act-list">
                            <ul style="height: auto;">
                                <li>
                                    <div class="u-face">
                                        <a :href="'/blogpages/author/' + blogInfo.authorId">
                                            <img :src="blogInfo.authorAvatar" width="50" height="50" alt="alt" />
                                        </a>
                                    </div>
                                    <section class="hLh30 txtOf">
                                        <a :href="'/blogpages/author/' + blogInfo.authorId" class="c-333 fsize16 fl">{{ blogInfo.authorName }}</a>
                                    </section>
                                    <section class="hLh20 txtOf">
                                        <span class="c-999">{{ blogInfo.authorSummary }}</span>
                                    </section>
                                </li>
                            </ul>
                        </section>
                    </div>
                    <!-- /主讲讲师 结束 -->
                </div>
            </aside>
            <div class="clear" />
        </div>
    </section>
    <!-- /课程详情 结束 -->
</div>
</template>

<script>
import blogApi from "@/api/blog";
export default {
    data() {
        return {
            blogInfo: {},
            authorInfo: {},
            blogList: []
        };
    },
    created() {
        this.blogInfoById();
    },
    methods: {
        getAuthorInfo() {

        },
        //   根据Id叨叨Blog的详细信息
        blogInfoById() {
            const id = this.$route.params.id;
            blogApi.webGetBlogById(id).then(Response => {
                this.blogInfo = Response.data.data.blog;
                console.log(this.blogInfo);
            });
        },

    }
};
</script>
