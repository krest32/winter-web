<template>
<div>
    <!-- 幻灯片 开始 -->
    <div class="swiper-container">
        <div v-swiper:mySwiper="swiperOption">
            <!-- 添加幻灯片按钮 -->
            <div class="swiper-pagination swiper-pagination-white"></div>
            <div class="swiper-wrapper">
                <div v-for="banner in bannerList" :key="banner.id" class="swiper-slide" style="background: #040B1B;">
                    <!-- <a target="_blank" href="/"> -->
                    <a>
                        <img :src="banner.imageAddress" alt="banner.title" />
                    </a>
                </div>
            </div>
        </div>
        <!-- 添加幻灯片按钮 -->
        <div class="swiper-pagination swiper-pagination-white"></div>
        <div class="swiper-button-prev swiper-button-white" slot="button-prev"></div>
        <div class="swiper-button-next swiper-button-white" slot="button-next"></div>
        <!-- 如果需要滚动条 -->
        <div class="swiper-scrollbar"></div>
    </div>
    <!-- 幻灯片 结束 -->

    <div id="aCoursesList">
        <!-- 博客文章开始-->
        <div>
            <section class="container">
                <header class="comm-title">
                    <h2 class="tac">
                        <span class="c-333">热门博客</span>
                    </h2>
                </header>
                <div>
                    <article class="comm-course-list">
                        <ul class="of" id="bna">
                            <li v-for="blog in blogList" :key="blog.id">
                                <div class="cc-l-wrap">

                                    <section class="course-img">
                                        <img :src="blog.pictureAddress" class="img-responsive" :alt="blog.title" />
                                        <div class="cc-mask">
                                            <a :href="'/blogpages/blog/' + blog.id" title="开始阅读" class="comm-btn c-btn-1">开始阅读</a>
                                        </div>
                                    </section>

                                    <h3 class="hLh30 txtOf mt10">
                                        <a :href="'/blogpages/blog/' + blog.id" :title="blog.title" class="course-title fsize18 c-333">{{ blog.title }}</a>
                                    </h3>

                                    <section class="mt10 hLh20 of">
                                        <span class="fr jgTag bg-green" v-if="Number(blog.price) === 0">
                                            <i class="c-fff fsize12 f-fA">免费</i>
                                        </span>
                                        <span class="fl jgAttr c-ccc f-fA">
                                            <i class="c-999 f-fA">{{ blog.clickCount }}人读过</i>
                                            <i class="c-999 f-fA">{{ blog.collectCount }}人收藏</i>
                                        </span>
                                    </section>
                                </div>
                            </li>
                        </ul>
                        <div class="clear"></div>
                    </article>
                    <section class="tac pt20">
                        <a href="/blogpages/blogList" title="全部博客" class="comm-btn c-btn-2">全部博客</a>
                    </section>
                </div>
            </section>
        </div>
        <!-- 博客文章 结束 -->

        <!-- 热门作者 开始  -->
        <div>
            <section class="container">
                <header class="comm-title">
                    <h2 class="tac">
                        <span class="c-333">本站作者</span>
                    </h2>
                </header>
                <div>
                    <article class="i-teacher-list">
                        <ul class="of">
                            <li v-for="author in authorList" :key="author.id">
                                <section class="i-teach-wrap">
                                    <div class="i-teach-pic">
                                        <a :href="'/blogpages/author/'+author.id" title="姚晨">
                                            <img :alt="author.name" :src="author.pictureAddress" />
                                        </a>
                                    </div>
                                    <div class="mt10 hLh30 txtOf tac">
                                        <a :href="'/blogpages/author/'+author.id" :title="author.name" class="fsize18 c-666">{{ author.name }}</a>
                                    </div>
                                    <div class="hLh30 txtOf tac">
                                        <span class="fsize14 c-999">{{ author.summary }}</span>
                                    </div>
                                    <div class="mt15 i-q-txt">
                                        <p class="c-999 f-fA">
                                            {{ author.intro }}
                                        </p>
                                    </div>
                                </section>
                            </li>
                        </ul>
                        <div class="clear"></div>
                    </article>
                    <section class="tac pt20">
                        <a href="/blogpages/author" title="全部作者" class="comm-btn c-btn-2">全部作者</a>
                    </section>
                </div>
            </section>
        </div>

        <!-- 热门作者 结束  -->
        <!-- 热门视频 开始 -->
        <div>
            <section class="container">
                <header class="comm-title">
                    <h2 class="tac">
                        <span class="c-333">热门视频</span>
                    </h2>
                </header>
                <div>
                    <article class="comm-course-list">
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
                                            <i class="c-999 f-fA">{{ vedio.collectCount }}人收藏</i>
                                        </span>
                                        <span class="fr jgTag bg-green mr5">
                                            <a href="#" class="c-fff fsize12 f-fA" @click="collectVedio(vedio.id)">收藏</a>
                                        </span>
                                    </section>
                                </div>
                            </li>
                        </ul>
                        <div class="clear"></div>
                    </article>
                    <section class="tac pt20">
                        <a href="/vediopages/vedioList" title="全部博客" class="comm-btn c-btn-2">全部视频</a>
                    </section>
                </div>
            </section>
        </div>
        <!-- 热门视频 结束 -->

        <!-- 热门商品 开始 -->
        <div>
            <section class="container">
                <header class="comm-title">
                    <h2 class="tac">
                        <span class="c-333">最新商品</span>
                    </h2>
                </header>

                <div>
                    <article class="comm-course-list">
                        <ul class="of" id="bna">
                            <li v-for="product in productList" :key="product.id">
                                <div class="cc-l-wrap">

                                    <section class="course-img">
                                        <img :src="product.picture" class="img-responsive" :alt="product.title" />
                                        <div class="cc-mask">
                                            <a :href="'/blogpages/blog/' + product.id" title="立即购买" class="comm-btn c-btn-1">立即购买</a>
                                        </div>
                                    </section>

                                    <h3 class="hLh30 txtOf mt10">
                                        <client-only>
                                            <el-button class="fr" type="success" icon="el-icon-shopping-cart-2" circle size="small" @click="addToCart(product.id)"></el-button>
                                        </client-only>
                                        <a :href="'/blogpages/blog/' + product.id" :title="product.title" class="course-title fsize18 c-333">{{ product.title }}</a>
                                    </h3>

                                    <section class="mt10 hLh20 of">
                                        <span class="fl jgAttr c-ccc f-fA">
                                            <i class="c-999 f-fA">库存剩余:{{product.stock}}</i>
                                        </span>

                                        <span class="fr jgTag bg-red">
                                            <i class="c-fff fsize15 f-fA">￥{{product.price}}</i>
                                        </span>
                                    </section>
                                </div>
                            </li>
                        </ul>
                        <div class="clear"></div>
                    </article>
                    <section class="tac pt20">
                        <a href="/shop/productList" title="全部博客" class="comm-btn c-btn-2">全部商品</a>
                    </section>
                </div>
            </section>
        </div>
        <!-- 热门商品 结束 -->
    </div>
</div>
</template>

<script>
import vedioApi from "@/api/vedio";
import cookie from "js-cookie";
import pageApi from "@/api/page";
export default {
    data() {
        return {
            isBuy: 0,
            blogList: [],
            blogSortList: [],
            authorList: [],
            blog: {},
            author: {},
            loginInfo: {},
            swiperOption: {
                loop: true,
                speed: 5000,
                autoplay: true,
                autoplay: {
                    delay: 2000,
                    stopOnLastSlide: false,
                    disableOnInteraction: true
                },
                //配置分页
                pagination: {
                    el: ".swiper-pagination" //分页的dom节点
                },
                //配置导航
                navigation: {
                    nextEl: ".swiper-button-next", //下一页dom节点
                    prevEl: ".swiper-button-prev" //前一页dom节点
                },
                centeredSlides: true
            },
            bannerList: [],
            banner: {
                id: "",
                title: "",
                imageUrl: "",
                sort: "",
                gmtCreate: ""
            },
            vedioList: [],
            productList: []
        };
    },

    created() {
        this.getBannerList()
        this.vedioListOrderByPlayCount()
        this.getAuthorList()
        this.getBlogList()
        this.isBuyAlbum()
        this.getNewProducts()
    },

    methods: {
        addToCart(){},
        getNewProducts() {
            pageApi.getNewProducts().then(Response => {
                this.productList = Response.data.data.collect
            })
        },

        isBuyAlbum() {
            var jsonStr = cookie.get("winter_blogs_ucenter");
            if (jsonStr) {
                this.loginInfo = JSON.parse(jsonStr);
            }
            const id = this.$route.params.id;
            vedioApi.isBuyAlbum(this.loginInfo.id, id).then(Response => {
                this.isBuy = Response.data
                console.log("isBuy:", this.isBuy)
                console.log("Response:", Response)
            })
        },

        //获取视频的列表
        vedioListOrderByPlayCount() {
            pageApi.vedioListOrderByPlayCount().then(Response => {
                this.vedioList = Response.data.data.vedioList
                console.log("vedioList:", this.vedioList)
            })

        },

        // 显示页面的初始化信息
        getLoginInfo() {
            console.log(this.loginInfo);
        },

        //   得到banner图片列表
        getBannerList() {
            pageApi.listBanner().then(Response => {
                this.bannerList = Response.data.data.bannerList
            })
        },

        // 得到热门博客列表
        getBlogList() {
            pageApi.getHotBlog().then(Response => {
                this.blogList = Response.data.data.blogList;
                console.log("blogList: ", this.blogList);
            });
        },

        // 得到作者列表
        getAuthorList() {
            pageApi.webAuthorList().then(Response => {
                this.authorList = Response.data.data.authorList;
                // console.log(this.authorList);
            });
        }
    }
};
</script>
