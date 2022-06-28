<template>
<div class="main">
    <div class="title">
        <!-- 标题栏 -->
        <a href="/member/login">登录</a>
        <span>·</span>
        <a class="active" href="/member/register">注册</a>
    </div>

    <div class="sign-up-container">
        <client-only>
            <el-form ref="userForm" :model="params">
                <!-- 设置昵称 -->
                <el-form-item class="input-prepend restyle" prop="nickname" :rules="[
            { required: true, message: '请输入你的昵称', trigger: 'blur' }
          ]">
                    <div>
                        <p>
                            <el-input type="text" placeholder="你的昵称" v-model="params.nickname" />
                            <i class="iconfont icon-user" />
                        </p>
                    </div>
                </el-form-item>

                <!-- 输入手机号 -->
                <!-- 框架中提供了输入框内容的判断功能，使用rules关键字 -->
                <!-- rules详解 required: true, //输入框必须有内容 message: '请输入手机号码', //输入框的提示内容 trigger:
                'blur' , // 促发条件：blur：当输入框失去鼠标的焦点时候，就会错发 validator: checkPhone,
                //验证规则：checkphone 自定义的规则，验证手机号码是否合适 trigger: 'blur' //
                促发条件：blur：当输入框失去鼠标的焦点时候，就会促发 -->
                <el-form-item class="input-prepend restyle no-radius" prop="mobile" :rules="[
            { required: true, message: '请输入手机号码', trigger: 'blur' },
            { validator: checkPhone, trigger: 'blur' }
          ]">
                    <div>
                        <el-input type="text" placeholder="手机号" v-model="params.mobile" />
                        <i class="iconfont icon-phone" />
                    </div>
                </el-form-item>

                <!-- 输入验证码 -->
                <el-form-item class="input-prepend restyle no-radius" prop="code" :rules="[
            { required: true, message: '请输入验证码', trigger: 'blur' }
          ]">
                    <div style="width: 100%;display: block;float: left;position: relative">
                        <el-input type="text" placeholder="验证码" v-model="params.code" />
                        <i class="iconfont icon-phone" />
                    </div>
                    <div class="btn" style="position:absolute;right: 0;top: 6px;width: 40%;">
                        <a href="javascript:" type="button" @click="getCodeFun()" :value="codeTest" style="border: none;background-color: none">{{ codeTest }}</a>
                    </div>
                </el-form-item>

                <!-- 输入密码 -->
                <el-form-item class="input-prepend" prop="password" :rules="[{ required: true, message: '请输入密码', trigger: 'blur' }]">
                    <div>
                        <el-input type="password" placeholder="设置密码" v-model="params.password" />
                        <i class="iconfont icon-password" />
                    </div>
                </el-form-item>

                <!-- 注册按钮 -->
                <div class="btn">
                    <input type="button" class="sign-up-button" value="注册" @click="submitRegister()" />
                </div>
                <p class="sign-up-msg">
                    点击 “注册” 即表示您同意并愿意遵守简书
                    <br />
                    <a target="_blank" href="http://www.jianshu.com/p/c44d171298ce">用户协议</a>
                    和
                    <a target="_blank" href="http://www.jianshu.com/p/2ov8x3">隐私政策</a>
                    。
                </p>
            </el-form>

            <!-- 更多注册方式 -->
            <div class="more-sign">
                <h6>社交帐号直接注册</h6>
                <ul>
                    <li>
                        <a id="weixin" class="weixin" target="_blank" href="http://huaan.free.idcfengye.com/api/ucenter/wx/login"><i class="iconfont icon-weixin" /></a>
                    </li>
                    <li>
                        <a id="qq" class="qq" target="_blank" href="#"><i class="iconfont icon-qq" /></a>
                    </li>
                </ul>
            </div>

        </client-only>
    </div>

</div>
</template>

<script>
import "~/assets/css/sign.css";
import "~/assets/css/iconfont.css";
import memberApi from "@/api/member";
export default {
    layout: "sign",
    data() {
        return {
            params: {
                mobile: "",
                code: "",
                nickname: "",
                password: ""
            },
            sending: true, //是否发送验证码
            second: 60, //倒计时间
            codeTest: "获取验证码"
        };
    },
    methods: {
        // 通过输入的手机号，获取验证码
        getCodeFun() {
            //sending = false
            //his.sending原为true,请求成功，!this.sending == true，主要是防止有人把disabled属性去掉，多次点击；
            if (!this.sending) return;
            //debugger
            // prop 换成你想监听的prop字段
            this.$refs.userForm.validateField("mobile", errMsg => {
                if (errMsg == "") {
                    // 获取验证码方法
                    memberApi.getMobile(this.params.mobile).then(res => {
                        //  设定发送之后，不能够再次被点击
                        this.sending = false;
                        this.timeDown();
                    });
                }
            });
        },

        timeDown() {
            // js中的倒计时方法，每隔一秒将当前的数字建减一：
            // serInterval("alert('test')",3000)  每隔3秒钟，弹出一个alert弹框。
            //   这个JavaScript中，经常用到的一个方法
            let result = setInterval(() => {
                //   设置当前的倒计时单位是秒，并且执行自减运算
                --this.second;
                //   执行自减运算后，将倒计时数字改变为提示信息
                this.codeTest = this.second;
                // 如果到倒计时的数字小于 1
                if (this.second < 1) {
                    //  停止倒计时
                    clearInterval(result);
                    //   设置发送的按钮可以点击
                    this.sending = true;
                    //this.disabled = false;
                    //   然后重新设置倒计时的初始化变量
                    this.second = 60;
                    this.codeTest = "获取验证码";
                }
            }, 1000); //每隔1秒，将括号内的方法执行一遍
        },

        // 提交注册信息
        submitRegister() {
            //判断
            this.$refs["userForm"].validate(valid => {
                if (valid) {
                    // 调用注册方法发送信息
                    memberApi.submitRegister(this.params).then(response => {
                        //提示注册成功
                        this.$message({
                            type: "success",
                            message: "注册成功"
                        });
                        // 注册成功之后，跳转页面到登陆页面
                        this.$router.push({
                            path: "/member/login"
                        });
                    });
                } else {
                    alert("error")
                }
            });
        },

        checkPhone(rule, value, callback) {
            //debugger
            if (!/^1[34578]\d{9}$/.test(value)) {
                return callback(new Error("手机号码格式不正确"));
            }
            return callback();
        }
    }
};
</script>
