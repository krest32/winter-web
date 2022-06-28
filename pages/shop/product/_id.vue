<template>
<div id="aCoursesList" class="bg-fa of">
    <!-- 讲师介绍 开始 -->
    <section class="container">
        <header class="comm-title">
            <h2 class="fl tac">
                <span class="c-333">商品详情</span>
            </h2>
            <aside class="fr">
                <label class="h-r-s-box">
                    <button class="button button1" @click="toCart">购物车</button>
                </label>
            </aside>
        </header>
        <div class="t-infor-wrap">
            <!-- 讲师基本信息 开始 -->
            <section class="fl t-infor-box c-desc-content">
                <div class="mt20 ml20">
                    <!-- 产品名称 -->
                    <section class="t-infor-pic">
                        <img :src="productInfo.picture" :alt="productInfo.title">
                    </section>
                    <h3 class="hLh30">
                        <span class="fsize24 c-333">{{ productInfo.title }}</span>
                    </h3>
                    <section class="mt10">
                        <span class="t-tag-bg">品牌： {{ productInfo.brandTitle }}</span>
                        <span class="t-tag-bg red">价格： {{ productInfo.price }}</span>
                    </section>
                    <section class="mt10">
                        <span class="t-tag-bg ">参数
                            <li v-for="attrinfo in productInfo.attrList" :key="attrinfo.attrId">
                                <div>
                                    <p>{{attrinfo.attrGroupTitle}}：{{attrinfo.attrTitle}}</p>
                                </div>
                            </li>
                        </span>
                    </section>
                    <section class="mt10">
                        <span class="t-tag-bg">上架时间： {{ productInfo.gmtModified }}</span>
                    </section>

                    <section class="mt10 ">
                        <button class="button button1" @click="addToCart">立即购买</button>
                    </section>
                    <div class="clear" />
                </div>
            </section>
            <!-- /讲师基本信息 结束 -->
            <div class="clear" />
        </div>

    </section>
    <!-- /讲师介绍 结束 -->
</div>
</template>

<script>
import productApi from "@/api/product";
export default {
    data() {
        return {
            productInfo: {},
            num: 1,
            attrList: {}

        }
    },
    created() {
        this.init();
    },

    methods: {

        toCart() {
            productApi.getCartList().then(Response => {
                this.cartList = Response.data.data.cartVo;
                console.log("cartList：", this.cartList)
            })
            this.$router.push({
                path: "/shop/productcart"
            });
        },
        
        addToCart() {
            productApi.addCartItem(this.productInfo.id, this.num).then(Response => {
                this.$message({
                    type: "success",
                    message: "添加成功!"
                });
                console.log("添加购物车成功")
            })
        },

        init() {
            const id = this.$route.params.id;
            this.getProductById(id)
        },

        getProductById(id) {
            productApi.getProductById(id).then(Response => {
                this.productInfo = Response.data.data.product;
                this.attrList =
                    console.log(this.productInfo)
            })
        }

    }

}
</script>

<style>
.button {
    margin-left: 100px;
    background-color: #fa0707;
    /* Green */
    border: none;
    color: rgb(245, 6, 6);
    padding: 3px 5px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    border-radius: 4px;
    font-size: 10px;
    margin: 4px 1px;
    -webkit-transition-duration: 0.4s;
    /* Safari */
    transition-duration: 0.4s;
    cursor: pointer;
}

.button1 {
    background-color: white;
    color: black;
    border: 2px solid #e91a0b;
}
</style>
