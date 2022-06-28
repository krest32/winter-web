<template>
<div class="Page Confirm">
    <div class="Title">
        <img src="~/assets/img/step1.png" class="fL" />
        <h1 class="fr f18">购物车</h1>
        <div class="clear"></div>
    </div>
    <form name="flowForm" id="flowForm" method="post" action="">
        <table class="GoodList">
            <tbody>
                <tr>
                    <th class="name">商品</th>
                    <th class="num">购买数量</th>
                    <th class="num">单价</th>
                    <th class="num ">总价</th>
                    <th class="price">编辑</th>
                </tr>
            </tbody>
            <tbody>

                <!-- <tr> <td colspan="3" class="Title red f18 fb"><p>限时折扣</p></td> </tr> -->
                <tr class="good" v-for="item in carItemtList" :key="item.productId">
                    <td class="name First">
                        <a target="_blank" href="/shop/productList">
                            <img :src="item.picture" />
                        </a>

                        <div class="goodInfo">
                            <input type="hidden" class="ids ids_14502" value="14502" />
                            <a target="_blank" href="/shop/productList">{{item.productTitle}}</a>
                        </div>
                    </td>
                    <td class="goodInfo">
                        <el-input-number v-model="item.countNum" @change="handleNumChange(item.productId,item.countNum)" :min="0" label="描述文字"></el-input-number>
                    </td>
                    <td class="num">
                        <p>
                            ￥<strong>{{item.price}}</strong>
                        </p>
                        <!-- <span class="discName red">限时8折</span> -->
                    </td>
                    <td class="num">
                        <p>

                            ￥<strong>{{item.totalPrice}}</strong>

                        </p>
                        <!-- <span class="discName red">限时8折</span> -->
                    </td>
                    <td class="price">
                        <buttom class="button button1" @click="removeData(item.productId,)">删除</buttom>
                    </td>
                </tr>

            </tbody>
        </table>

        <div class="Finish">
            <div class="fr" id="AgreeDiv">
                <label for="Agree">
                    <p class="on">
                        <input type="checkbox" checked="checked" />我已阅读并同意<a href="javascript:" target="_blank">《购买协议》</a>
                    </p>
                </label>
            </div>
            <div class="clear"></div>
            <div class="Main fl">
                <div class="fl">
                    <a href="/shop/productList">返回商品列表</a>
                </div>
                <div class="fr">
                    <p>
                        共
                        <strong class="red">{{cartInfo.countNum}}</strong>
                        件商品，合计<span class="red f20">￥<strong id="AllPrice">{{cartInfo.totalAmount}}</strong>
                        </span>
                    </p>
                </div>
            </div>
            <input name="score" value="0" type="hidden" id="usedScore" />
            <button class="fr redb" type="button" id="submitPay" @click="toOrder()">
                生成订单
            </button>
            <div class="clear"></div>
        </div>

    </form>

</div>
</template>

<script>
import cookie from "js-cookie";
import productApi from "@/api/product";
export default {
    data() {
        return {
            carItemtList: [],
            cartInfo: {},
            loginInfo: {},

        }
    },
    created() {
        this.getOrderList();
        this.checkMemberInfo();
    },

    methods: {
        checkMemberInfo() {
            //debugger
            // 从 cookies中获取用户信息，然后给与变量
            var jsonStr = cookie.get("winter_blogs_ucenter");
            //alert(jsonStr)
            //   如果要得到Json对象的数据，需要先对数据进行处理，数据存储在cookies中，形式并不是Json格式
            if (jsonStr) {
                this.loginInfo = JSON.parse(jsonStr);
            }

        },

        // 选出选定商品
        removeData(id) {
            productApi.deleteCartItem(id).then(Response => {
                console.log("删除")
                this.getOrderList();
            })

        },

        handleNumChange(productId, num) {
            productApi.changeCartItemNum(productId, num).then(Response => {
                // this.toCart();
            })
        },

        getOrderList() {
            productApi.getCartList().then(Response => {
                this.carItemtList = Response.data.data.cartVo.cartItemVoList;
                this.cartInfo = Response.data.data.cartVo;
                console.log("cartList：", this.carItemtList);
                console.log("CartInfo", this.cartInfo)
            })
            // this.$router.push({path: "/productcart/"});

        },

        // 跳转到订单页面
        toOrder() {
            if (this.loginInfo.id) {
                this.$router.push({
                    path: "/shop/productorder/"+this.loginInfo.id
                });
            } else {
                this.$message({
                    type: 'info',
                    message: '您还未登录'
                })
            }

        }
    }
};
</script>

<style>
.box1 {
    margin-top: 20px;
    text-align: center;
}

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
    background-color: #af4c72;
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
    border: 2px solid #bd466e;
}

.button1:hover {
    background-color: #ce3c5b;
    color: white;
}

.button:hover {
    background-color: #dd3551;
    color: white;
}
</style>
