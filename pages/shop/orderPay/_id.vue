<template>
<div class="Page Confirm ">
    <!--主内容-->
    <div class="checkout py-container pay">
        <div class="checkout-tit">
            <h4 class="fl tit-txt">
                <span class="success-icon"></span>
                <span class="success-info">订单提交成功，请您及时付款！订单号：{{ payObj.out_trade_no }}</span>
            </h4>
            <span class="fr">
                <em class="sui-lead">应付金额：</em>
                <em class="orange money">￥{{ payObj.total_fee }}</em>
            </span>
            <div class="clearfix"></div>
        </div>
        <div class="checkout-steps">
            <div class="fl weixin">微信支付</div>
            <div class="fl sao">
                <p class="red">请使用微信扫一扫。</p>
                <div class="fl code">
                    <qriously :value="payObj.code_url" :size="338" />
                    <div class="saosao">
                        <p>请使用微信扫一扫</p>
                        <p>扫描二维码支付</p>
                    </div>
                </div>
            </div>
            <div class="clearfix"></div>
        </div>
    </div>
</div>
</template>

<script>
import productApi from "@/api/product";
export default {
    //根据订单id生成微信支付二维码
    asyncData({
        params,
        error
    }) {
        return productApi.createNative(params.id).then(response => {
            console.log(response.data.data)
            return {
                payObj: response.data.data
            };
        });
    },

    data() {
        return {
            timer: null, // 定时器名称
            initQCode: "",
            timer1: "",
            result: {}
        };
    },
    mounted() {
        //在页面渲染之后执行 每隔三秒，去查询一次支付状态
        this.timer1 = setInterval(() => {
            this.queryPayStatus(this.payObj.out_trade_no);
        }, 3000);
    },

    methods: {
        //查询支付状态的方法
        queryPayStatus(out_trade_no) {
            productApi.queryPayStatus(out_trade_no).then(Response => {
                this.result = Response.data.data.order
                console.log("查询支付状态:", this.result)
                if (this.result.status === 1) {
                    //如果支付成功，清除定时器
                    console.log("支付成功")
                    clearInterval(this.timer1);
                    this.$message({
                        type: "success",
                        message: "支付订单成功!"
                    });
                    //跳转到课程详情页面观看视频
                    this.$router.push({
                        path: "/shop/productlist/"
                    });
                }
            });
        }
    }
};
</script>
