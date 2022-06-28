<template>
<div id="aCoursesList">
    <!-- 博客文章开始-->
    <section class="container">
        <header class="comm-title">
            <h2 class="fl tac">
                <span class="c-333">全部博客</span>
            </h2>
            <!-- 浮动框,默认会浮动 在页面右侧 -->

            <aside class="fr">
                <label class="h-r-s-box">
                    <button class="button button1" @click="resetData()">清空</button>
                    <input type="text" placeholder="输入搜索的关键字" v-model="queryBlogVo.title" />
                    <button type="submit" class="s-btn" @click="searchData">
                        <em class="icon18">&nbsp;</em>
                    </button>

                </label>
            </aside>
        </header>
        <section class="c-sort-box">
            <section class="c-s-dl">
                <dl>
                    <dt>
                        <span class="c-999 fsize14">主题分类</span>
                    </dt>
                    <dd class="c-s-dl-li">
                        <ul class="clearfix">
                            <li v-for="(sort,index) in sortList" :key="sort.id" :class="{active:threeIndex==index}">
                                <a :title="sort.title" href="#" @click="getQueryVedioVo(sort.id,index)">{{sort.title}}</a>
                            </li>
                        </ul>
                    </dd>
                    <dt>
                        <span class="c-999 fsize14">标签分类</span>
                    </dt>
                    <dd class="c-s-dl-li">
                        <ul class="clearfix">
                            <li v-for="(tag,index) in tagList" :key="tag.id" :class="{active:tagIndex==index}">
                                <a :title="tag.title" href="#" @click="getBlogByTag(tag.id,index)">{{tag.title}}</a>
                            </li>
                        </ul>
                    </dd>
                </dl>
            </section>

            <div>
                <article class="comm-course-list mt20">
                    <ul class="of" id="bna">
                        <li v-for="blog in blogList" :key="blog.id">
                            <div class="cc-l-wrap">
                                <section class="course-img">
                                    <img :src="blog.pictureAddress" class="img-responsive" :alt="blog.title" />
                                    <div class="cc-mask">
                                        <a :href="'/blogpages/blog/' + blog.id" title="开始阅读" class="comm-btn c-btn-1">开始阅读</a>
                                    </div>
                                    <!-- 当视频收费时页面跳转 -->
                                    <div class="cc-mask" v-if="Number(blog.isFree) === 0">
                                        <a :href="'/blogpages/blog/' + blog.id" title="开始阅读" class="comm-btn c-btn-1">开始阅读</a>
                                    </div>
                                </section>
                                <h3 class="hLh30 txtOf mt10">
                                    <div>
                                        <a :href="'/blogpages/blog/' + blog.id" :title="blog.title" class="course-title fsize18 c-333">{{ blog.title }}</a>
                                    </div>
                                </h3>
                                <section class="mt10 hLh20 of">
                                    <span class="fr jgTag bg-green" v-if="Number(blog.isFree) === 1">
                                        <i class="c-fff fsize12 f-fA">免费</i>
                                    </span>
                                    <span class="fr jgTag bg-red" v-if="Number(blog.isFree) === 0">
                                        <i class="c-fff fsize15 f-fA">￥:{{vedio.price}}</i>
                                    </span>
                                    <span class="fl jgAttr c-ccc f-fA">
                                        <i class="c-999 f-fA">{{ blog.clickCount }}人看过</i>
                                        <i class="c-999 f-fA">{{ blog.collectCount }}人收藏</i>
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
                        <el-pagination :current-page="page" :page-size="limit" :total="total" style="padding: 30px 0; text-align: center" layout="total, prev, pager, next, jumper" @current-change="PageQueryBlog" />
                    </client-only>
                </div>
            </div>
            <!-- 公共分页 结束 -->
        </section>
    </section>

</div>
</template>

<script>
import blogApi from "@/api/blog";
export default {
    data() {
        return {
            blogInfo: {},
            page: 0,
            limit: 8,
            total: 0,
            queryBlogVo: {},
            blogList: [],
            sortList: [],
            tagList: [],
            tagIndex: -1,
            threeIndex: -1,
        };
    },
    created() {
        this.PageQueryBlog();
        this.listAllSort();
        this.ListTag();
    },
    methods: {

        // 清空搜索条件
        resetData() {
            this.tagIndex = -1
            this.threeIndex = -1
            this.blogList = [];
            this.sortList = [];
            this.tagList = [];
            this.queryBlogVo = {};
            this.PageQueryBlog();
            this.listAllSort();
            this.ListTag();
        },

        // 根据选择的标签获取blog
        getBlogByTag(tagId, index) {
            this.tagIndex = index;
            this.threeIndex = -1
            blogApi.queryBlogListByTagId(tagId).then(Response => {
                this.blogList = Response.data.data.blogList;
                this.total = Response.data.data.total;
            })
        },

        // 加载所有的博客标签
        ListTag() {
            blogApi.ListTag().then(Response => {
                this.tagList = Response.data.data.tagList;
                console.log(this.tagList)
            })
        },

        // 条件搜索
        getQueryVedioVo(sortId, index) {
            this.tagIndex = -1
            this.threeIndex = index;
            this.queryBlogVo.blogSortId = sortId
            this.PageQueryBlog()
        },

        // 得到分类选项
        listAllSort() {
            blogApi.listAllSort().then(Response => {
                this.sortList = Response.data.data.sortList
                console.log("sortlist:", this.sortList)
            })
        },
        // 得到博客列表
        PageQueryBlog(page = 1) {
            this.page = page
            blogApi.PageQueryBlog(this.page, this.limit, this.queryBlogVo).then(Response => {
                this.blogList = Response.data.data.list;
                this.total = Response.data.data.total;
                console.log(this.blogList);
            });
        },
        searchData() {
            this.PageQueryBlog()
        }

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
