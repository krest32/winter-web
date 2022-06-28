<template>
<div id="aCoursesList" class="bg-fa of">
    <!-- 讲师列表 开始 -->
    <section class="container">
        <section class="c-sort-box unBr">
            <header class="comm-title">
                <h2 class="tac">
                    <span class="c-333">全部作者</span>
                </h2>
            </header>
            <div>
                <!-- /无数据提示 开始-->
                <section class="no-data-wrap" v-if="total==0">
                    <em class="icon30 no-data-ico">&nbsp;</em>
                    <span class="c-666 fsize14 ml10 vam">没有相关数据，小编正在努力整理中...</span>
                </section>
                <!-- /无数据提示 结束-->
                <!-- /数据列表 开始-->
                <article v-if="total>0" class="i-teacher-list">
                    <ul class="of">
                        <li v-for="author in authorList" :key="author.id">
                            <section class="i-teach-wrap">
                                <div class="i-teach-pic">
                                    <a :href="'/blogpages/author/'+author.id" :title="author.name">
                                        <img :src="author.pictureAddress" :alt="author.name" height="142" hright="142">
                                    </a>
                                </div>
                                <div class="mt10 hLh30 txtOf tac">
                                    <a :href="'/blogpages/author/'+author.id" :title="author.name" class="fsize18 c-666">{{ author.name }}</a>
                                </div>
                                <div class="hLh30 txtOf tac">
                                    <span class="fsize14 c-999">{{ author.summary }}</span>
                                </div>
                                <div class="mt15 i-q-txt">
                                    <p class="c-999 f-fA">{{ author.intro }}</p>
                                </div>
                            </section>
                        </li>
                    </ul>
                    <div class="clear" />
                </article>
                <!-- /数据列表 结束-->
            </div>
            <!-- 公共分页 开始 -->
            <div>
                <div class="paging">
                    <client-only>
                        <el-pagination :current-page="page" :page-size="limit" :total="total" style="padding: 30px 0; text-align: center" layout="total, prev, pager, next, jumper" @current-change="PageQueryAuthor" />
                    </client-only>
                </div>
            </div>
            <!-- 公共分页 结束 -->
        </section>
    </section>
    <!-- /讲师列表 结束 -->
</div>
</template>

<script>
import blogApi from '@/api/blog'
export default {
    data() {
        return {
            data: {},
            page: 0,
            limit: 8,
            total: 0,
            authorList: [],
            queryAuthorVo: {}
        };
    },

    created() {
        this.PageQueryAuthor()
    },

    methods: {
        PageQueryAuthor(page = 1) {
            this.page = page
            blogApi.PageQueryAuthor(this.page, this.limit, this.queryAuthorVo).then(Response => {
                this.authorList = Response.data.data.list
                this.total = Response.data.data.total
                console.log("authorList:", this.authorList)
            })

        }

    }
};
</script>
