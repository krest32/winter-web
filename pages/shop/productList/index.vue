<template>
<div id="aCoursesList" class="bg-fa of">
    <!-- /课程列表 开始 -->
    <section class="container">
        <header class="comm-title">
            <h2 class="fl tac">
                <span class="c-333">全部商品</span>
            </h2>
            <!-- 浮动框,默认会浮动在页面右侧 -->

            <aside class="fr">
                <label class="h-r-s-box">
                    <input type="text" placeholder="输入搜索的关键字" v-model="searchVo.keyWords" />
                    <!-- <button type="submit" class="s-btn" @click="searchProduct()">
                        <em class="icon18">&nbsp;</em>
                    </button> -->
                    <button class="button button1" @click="searchProduct()">搜索</button>
                    <button class="button button1" @click="resetData()">清空</button>
                    <button class="button button1" @click="toCart">购物车</button>
                </label>
            </aside>
        </header>

        <section class="c-sort-box">

            <section class="c-s-dl">
                <dl>
                    <dt>
                        <span class="c-999 fsize14">三级分类</span>
                    </dt>
                    <dd class="c-s-dl-li">
                        <ul class="clearfix">
                            <li v-for="(threeSort,index) in threeSortList" :key="threeSort.id" :class="{active:threeIndex==index}">
                                <a :title="threeSort.title" href="#" @click="getTwoSortList(threeSort.id,index)">{{threeSort.title}}</a>
                            </li>
                        </ul>
                    </dd>
                </dl>
                <dl v-if="showTwoSortLsit">
                    <dt>
                        <span class="c-999 fsize14">二级分类</span>
                    </dt>
                    <dd class="c-s-dl-li">
                        <ul class="clearfix">
                            <li v-for="(twoSort,index) in twoSortList" :key="twoSort.id" :class="{active:twoIndex==index}">
                                <a :title="twoSort.title" href="#" @click="getOneSortList(twoSort.id,index)">{{twoSort.title}}</a>
                            </li>
                        </ul>
                    </dd>
                </dl>
                <dl v-if="showOneSortList">
                    <dt>
                        <span class="c-999 fsize14">一级分类</span>
                    </dt>
                    <dd class="c-s-dl-li" v-if="showOneSortList">
                        <ul class="clearfix">
                            <li v-for="(oneSort,index) in oneSortList" :key="oneSort.id" :class="{active:oneIndex==index}">
                                <a :title="oneSort.title" href="#" @click="handleOneSortClick(oneSort.id,index)">{{oneSort.title}}</a>
                            </li>
                        </ul>
                    </dd>
                </dl>
            </section>

            <div class="mt40">
                <div>
                    <article class="comm-course-list">
                        <ul class="of" id="bna">
                            <li v-for="product in productList" :key="product.id">
                                <div class="cc-l-wrap">

                                    <section class="course-img">
                                        <img :src="product.picture" class="img-responsive" :alt="product.title" />
                                        <div class="cc-mask">
                                             <a :href="'/shop/product/' + product.id" title="详情页" class="comm-btn c-btn-1">详情页</a>
                                        </div>
                                    </section>

                                    <h3 class="hLh30 txtOf mt10">
                                        <client-only>
                                            <el-button class="fr" type="success" icon="el-icon-shopping-cart-2" circle size="small" @click="addToCart(product.id)"></el-button>
                                        </client-only>
                                        <!-- <a :href="'/blogpages/blog/' + product.id" :title="product.title" class="course-title fsize18 c-333">{{ product.title }}</a> -->
                                        <a :title="product.title" class="course-title fsize18 c-333">{{ product.title }}</a>
                                    
                                    </h3>

                                    <section class="mt10 hLh20 of">
                                        <span class="fl jgAttr c-ccc f-fA">
                                            <!-- <i class="c-999 f-fA">库存剩余:{{product.stock}}</i> -->
                                        </span>

                                        <span class="fr jgTag bg-red">
                                            <i class="c-fff fsize15 f-fA">￥{{product.price}}</i>
                                        </span>
                                    </section>
                                </div>
                            </li>
                        </ul>
                    </article>
                </div>
            </div>
            <!-- 公共分页 开始 -->
            <div>
                <div class="paging">
                    <client-only>
                        <el-pagination :current-page="page" :page-size="limit" :total="total" style="padding: 30px 0; text-align: center" layout="total, prev, pager, next, jumper" @current-change="searchProduct" />
                    </client-only>
                </div>
            </div>
            <!-- 公共分页 结束 -->
        </section>
    </section>
    <!-- /课程列表 结束 -->
</div>
</template>

<script>
import productApi from "@/api/product";
import cookie from "js-cookie";
export default {
    data() {
        return {
            // 分页信息
            page: 1,
            limit: 8,
            total: 0,

            // 分类信息
            showTwoSortLsit: false,
            showOneSortList: false,
            threeSortList: [],
            twoSortList: [],
            oneSortList: [],
            threeSortId: '',
            twoSortId: '',
            threeIndex: -1,
            twoIndex: -1,
            oneIndex: -1,
            // 搜索信息
            searchVo: {
                keyWords: '',
                oneSortId: '',
                twoSortId: '',
                threeSortId: '',
            },
            cartList: [],
            productList: [],
            // 品牌列表
            brandList: [],
            brandIndex: -1,
            num: 1,

        };
    },

    created() {
        this.listCateLogThree();
        this.searchProduct();
    },

    methods: {
        resetData() {
            this.threeIndex = -1
            this.twoIndex = -1
            this.oneIndex = -1
            this.searchVo = {}
            this.threeSortId = ''
            this.twoSortList = []
            this.twoSortId = ''
            this.oneSortList = []
            this.showTwoSortLsit = false
            this.showOneSortList = false
            this.searchProduct()
        },

        addToCart(id) {
            productApi.addCartItem(id, this.num).then(Response => {
                this.$message({
                    type: "success",
                    message: "添加成功!"
                });
                console.log("添加购物车成功")
            })
        },

        //跳转到购物车  
        toCart() {
            productApi.getCartList().then(Response=>{
                this.cartList=Response.data.data.cartVo;
                console.log("cartList：",this.cartList)
            })
            this.$router.push({
                path: "/shop/productcart"
            });
        },

        // 列出所有的三级分类
        listCateLogThree() {
            productApi.listCateLogThree().then(Response => {
                this.threeSortList = Response.data.data.listCateLogThree;
            })
        },

        // 设置二级分类查询条件
        getTwoSortList(threeSortId, index) {
            //设置选中阴影
            this.threeIndex = index;
            this.showTwoSortLsit = true
            //设置查询条件
            this.searchVo.threeSortId = threeSortId;
            this.searchVo.twoSortId = '';
            this.searchVo.oneSortId = '';
            this.threeSortId = threeSortId;
            this.twoIndex = -1
            this.twoSortId = ''
            this.oneIndex = -1
            this.showOneSortList = false
            this.listTwoSortList()

            // 进行复杂查询
            this.searchProduct();

        },

        // 根据Id查询二级分类
        listTwoSortList() {
            productApi.ListChildCatelog(this.threeSortId).then(Response => {
                this.twoSortList = Response.data.data.ListChildCatelog;
                console.log("listCateLogTwo:", this.twoSortList);
            })
        },

        // 根据Id查询一级分类
        getOneSortList(twoSortId, index) {
            this.twoIndex = index;
            this.searchVo.twoSortId = twoSortId;

            // 设置一级分类选项
            this.oneIndex = -1;
            this.oneSortList = []
            this.oneSortId = ''
            this.listOneSortList();
            this.searchVo.oneSortId = '';

            this.searchProduct();
        },

        // 根据Id查询一级分类
        listOneSortList() {
            this.oneIndex = -1;
            productApi.ListChildCatelog(this.searchVo.twoSortId).then(Response => {
                this.oneSortList = Response.data.data.ListChildCatelog;
                console.log("oneSortList:", this.oneSortList);
                this.showOneSortList = true
            })
        },

        //处理一级分类点击事件
        handleOneSortClick(oneSortId, index) {
            this.oneIndex = index;
            this.searchVo.oneSortId = oneSortId;
            this.searchProduct();
        },

        //处理品牌点击事件
        handleBrandClick(brandId, index) {
            this.brandIndex = index;
        },

        //根据条件查找产品信息
        searchProduct(page = 1) {
            this.page = page
            console.log("searchVo:", this.searchVo)
            productApi.searchProduct(this.page, this.limit, this.searchVo).then(Response => {
                this.productList = Response.data.data.result.products
                this.brandList = Response.data.data.result.brandList
                this.total = Response.data.data.result.total
                console.log("productList", this.productList);
            })
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

.button {
    background-color: #4CAF50;
    /* Green */
    border: none;
    color: white;
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

.button2 {
    background-color: #4CAF50;
    /* Green */
    border: none;
    color: white;
    padding: 3px 5px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    border-radius: 4px;
    font-size: 16px;
    -webkit-transition-duration: 0.4s;
    /* Safari */
    transition-duration: 0.4s;
    cursor: pointer;
}

.button1 {
    background-color: white;
    color: black;
    border: 2px solid #4CAF50;
}

.button1:hover {
    background-color: #4CAF50;
    color: white;
}

.button:hover {
    background-color: #4CAF50;
    color: white;
}
</style>
