<template>
<div class="Page Confirm">
    <div class="Title">
        <h1 class="fl f18">订单确认</h1>
        <img src="~/assets/img/cart_setp2.png" class="fr" />
        <div class="clear"></div>
    </div>

    <el-card class="box-card">
        <div slot="header" class="clearfix">
            <span>用户信息确认</span>
            <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
        </div>
        <el-form ref="form" :model="orderInfo" label-width="80px">
            <el-form-item label="收件人">
                <el-input v-model="orderInfo.nickname" style="width: 400px" disabled></el-input>
            </el-form-item>
            <el-form-item label="联系方式">
                <el-input v-model="orderInfo.mobile" style="width: 400px" disabled></el-input>
            </el-form-item>
            <el-form-item label="选择地址">
                <el-table ref="singleTable" border :data="orderInfo.addressList" highlight-current-row style="width: 600px" @current-change="handleCurrentChange">
                    <el-table-column prop="address" label="所有地址" show-overflow-tooltip align="center"></el-table-column>
                </el-table>
            </el-form-item>
        </el-form>
    </el-card>

    <form name="flowForm" id="flowForm" method="post" action="" class="mt20">
        <table class="GoodList">
            <tbody>
                <tr>
                    <th class="name">商品</th>
                    <th class="num">购买数量</th>
                    <th class="num">剩余库存</th>
                    <th class="num">单价</th>
                    <th class="price">总价</th>
                </tr>
            </tbody>
            <tbody>
                <!-- <tr> <td colspan="3" class="Title red f18 fb"><p>限时折扣</p></td> </tr> -->
                <!-- <tr> <td colspan="3" class="Title red f18 fb"><p>限时折扣</p></td> </tr> -->
                <tr class="good" v-for="item in itemList" :key="item.productId">
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
                        <p>
                            <strong>{{item.countNum}}</strong>
                        </p>
                    </td>

                    <td class="price">
                        <p>
                            <strong>{{item.stockNum}}</strong>
                        </p>
                    </td>

                    <td class="num">
                        <p>
                            ￥<strong>{{item.price}}</strong>
                        </p>

                    </td>
                    <td class="num">
                        <p>
                            ￥<strong>{{item.totalPrice}}</strong>
                        </p>
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
                    <a href="/shop/productcart/">返回购物车</a>
                </div>
                <div class="fr">
                    <p>
                        共
                        <strong class="red">{{orderInfo.totalNum}}</strong>
                        件商品，合计<span class="red f20">￥<strong id="AllPrice">{{orderInfo.totalFee}}</strong>
                        </span>
                    </p>
                </div>
            </div>
            <input name="score" value="0" type="hidden" id="usedScore" />
            <button class="fr redb" type="button" id="submitPay" @click="toCart()" v-if="orderInfo.outOfStock">
                商品缺少库存
            </button>
            <button class="fr redb" type="button" id="submitPay" @click="toPay()" v-if="!orderInfo.outOfStock">
                确认订单支付
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
            itemList: [],
            orderInfo: {},
            loginInfo: {},
            currentAddress: {},
            orderSubmitVo: {},
            submitOrderVo: {}

        }
    },
    created() {
        this.createOrder();
    },

    methods: {
        toCart() {
            this.$router.push({
                path: "/shop/productcart/"
            });

        },
        handleCurrentChange(val) {
            this.currentAddress = val;
            this.orderSubmitVo.address = this.currentAddress.address
            console.log(this.orderSubmitVo.address)
        },
        createOrder() {
            var jsonStr = cookie.get("winter_blogs_ucenter");
            //alert(jsonStr)
            //   如果要得到Json对象的数据，需要先对数据进行处理，数据存储在cookies中，形式并不是Json格式
            if (jsonStr) {
                this.loginInfo = JSON.parse(jsonStr);
                productApi.createOrder(this.loginInfo.id).then(Response => {
                    this.orderInfo = Response.data.data.productOrder
                    this.itemList = Response.data.data.productOrder.orderVo.orderItemVoList
                    console.log("order:", this.orderInfo)
                })
            }
        },

        toPay() {
            // 创建需要的数据
            this.orderSubmitVo.id = this.orderInfo.id
            this.orderSubmitVo.memberId = this.orderInfo.memberId
            this.orderSubmitVo.nickname = this.orderInfo.nickname
            this.orderSubmitVo.mobile = this.orderInfo.mobile
            this.orderSubmitVo.orderVo = this.orderInfo.orderVo
            this.orderSubmitVo.orderToken = this.orderInfo.orderToken
            this.orderSubmitVo.totalNum = this.orderInfo.totalNum
            this.orderSubmitVo.totalFee = this.orderInfo.totalFee

            if (this.orderSubmitVo.address != null) {
                productApi.submitOrder(this.orderSubmitVo).then(Response => {
                        this.$message({
                            type: "success",
                            message: "创建订单成功!"
                        });
                        this.submitOrderVo = Response.data.data.submitOrderVo
                        console.log("submitOrderVo:", this.submitOrderVo)
                        this.$router.push({
                            path: "/shop/orderPay/" + this.orderSubmitVo.id
                        });

                    })
                    .catch(error => {
                        this.$message({
                            type: "error",
                            message: "创建订单失败!"
                        });
                        this.$router.push({
                            path: "/shop/productcart"
                        });
                    })
            } else {
                this.$message({
                    type: "error",
                    message: "请选择地址!"
                });
            }

        }
    }

};
</script>

<style></style>
