<template>
<div class="in-wrap">
    <!-- 公共头引入 -->
    <header id="header">
        <section class="container">
            <!-- 插入logo图片,同时配置logo的的大小样式,位置等 -->
            <h1 id="logo">
                <!-- title 当鼠标放在图片上面会显示这几个字 -->
                <a href="#" title="Winter Blog">
                    <img src="~/assets/img/logo.png" width="100%" alt="Winter Blog" />
                </a>
            </h1>
            <!-- 作为标题引引导栏 -->
            <div class="h-r-nsl">
                <ul class="nav">
                    <router-link to="/" tag="li" active-class="current" exact>
                        <a>首页</a>
                    </router-link>
                    <router-link to="/blogpages/blogList" tag="li" active-class="current">
                        <a>博客</a>
                    </router-link>
                    <router-link to="/blogpages/author" tag="li" active-class="current">
                        <a>作者</a>
                    </router-link>
                    <router-link to="/vediopages/vedioList" tag="li" active-class="current">
                        <a>视频</a>
                    </router-link>
                    <router-link to="/shop/productList" tag="li" active-class="current">
                        <a>杂货铺</a>
                    </router-link>
                </ul>

                <!-- /  -->
                <ul class="h-r-login">
                    <li v-if="!loginInfo.id" id="no-login">
                        <a href="/member/login" title="登录">
                            <em class="icon18 login-icon">&nbsp;</em>
                            <span class="vam ml5">登录</span>
                        </a>
                        |
                        <a href="/member/register" title="注册">
                            <span class="vam ml5">注册</span>
                        </a>
                    </li>

                    <!-- 两个元素字同一个位置，根据是否有用户id决定显示的结果 -->
                    <li v-if="loginInfo.id" id="is-login-one" class="mr10">
                        <!-- 用来统计未读信息的数量 -->
                        <a id="headerMsgCountId" href="#" title="消息">
                            <em class="icon18 news-icon">&nbsp;</em>
                        </a>
                        <q class="red-point" style="display: none">&nbsp;</q>
                    </li>

                    <li v-if="loginInfo.id" id="is-login-two" class="h-r-user">
                        <a :href="'/member/ucenter/'+loginInfo.id" title>
                            <img :src="loginInfo.avatar" width="30" height="30" class="vam picImg" alt />
                            <span id="userName" class="vam disIb">
                                {{loginInfo.nickname}}
                            </span>
                        </a>
                        <a href="javascript:void(0);" title="退出" @click="logout()" class="ml5">退出</a>
                    </li>
                    <!-- /未登录显示第1 li；登录后显示第2，3 li -->
                </ul>

                <!-- 浮动框,默认会浮动在页面右侧 -->
                <!-- <aside class="h-r-search">
                    <form action="#" method="post">
                        <label class="h-r-s-box">
                            <input type="text" placeholder="输入搜索的关键字" name="queryCourse.courseName" value />
                            <button type="submit" class="s-btn">
                                <em class="icon18">&nbsp;</em>
                            </button>
                        </label>
                    </form>
                </aside> -->
            </div>

            <aside class="mw-nav-btn">
                <div class="mw-nav-icon"></div>
            </aside>
            <div class="clear"></div>
        </section>
    </header>

    <!-- /公共头引入 -->
    <nuxt />

    <!-- 公共底引入 -->
    <footer id="footer">
        <section class="container">
            <div class>
                <h4 class="hLh30">
                    <span class="fsize18 f-fM c-999">友情链接</span>
                </h4>
                <ul class="of flink-list">
                    <li>
                        <a href="https://gitee.com/krest202/winter" title="Winter Blog" target="_blank">Gitee-WinterBlog</a>
                    </li>
                </ul>
                <div class="clear"></div>
            </div>
            <div class="b-foot">
                <section class="fl col-7">
                    <section class="mr20">
                        <section class="b-f-link">
                            <a href="#" title="关于我" target="_blank">关于我们</a>|
                            <a href="#" title="联系我" target="_blank">联系我们</a>|
                            <a href="#" title="帮助中心" target="_blank">帮助中心</a>|
                            <a href="https://gitee.com/krest202/winter" title="资源下载" target="_blank">资源下载</a>|
                            <span>服务热线：17610041263(北京)</span>
                            <span>Email：18635572970@163.com</span>
                        </section>
                        <section class="b-f-link mt10">
                            <span>©2020 winter-blog 版权归 krest 所有</span>
                        </section>
                    </section>
                </section>
                <aside class="fl col-3 tac mt15">
                    <section class="gf-tx">
                        <span>
                            <img src="~/assets/img/wx-icon.png" alt />
                        </span>
                    </section>
                    <section class="gf-tx">
                        <span>
                            <img src="~/assets/img/wb-icon.png" alt />
                        </span>
                    </section>
                </aside>
                <div class="clear"></div>
            </div>
        </section>
    </footer>
    <!-- /公共底引入 -->
</div>
</template>

<script>
import "~/assets/css/reset.css";
import "~/assets/css/theme.css";
import "~/assets/css/global.css";
import "~/assets/css/web.css";
import "~/assets/css/base.css";
import "~/assets/css/activity_tab.css";
import "~/assets/css/bottom_rec.css";
import "~/assets/css/nice_select.css";
import "~/assets/css/order.css";
import "~/assets/css/swiper-3.3.1.min.css";
import "~/assets/css/pages-weixinpay.css";

import cookie from "js-cookie";
import userApi from "@/api/register";
export default {
    data() {
        return {
            token: "",
            loginInfo: {
                id: "",
                age: "",
                avatar: "",
                mobile: "",
                nickname: "",
                sex: ""
            }
        };
    },

    created() {
        this.showInfo();
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

        logout() {
            //debugger
            cookie.set("winter_blogs_ucenter", "", {
                domain: "localhost"
            });
            cookie.set("w_blogs_token", "", {
                domain: "localhost"
            });

            //跳转页面
            window.location.href = "/";
        }
    }
};
</script>
