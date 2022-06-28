<template>
<div id="aCoursesList">
    <!-- 博客文章开始-->
    <section class="container">
        <header class="comm-title">
            <h2 class="fR tac">
                <span class="c-333">会员中心</span>
            </h2>
            <!-- 浮动框,默认会浮动 在页面右侧 -->
        </header>
        <section class="c-sort-box">
            <section class="c-s-dl">
                <dl class="c-999 c-s-dl-li">
                    <ul class="clearfix">
                        <li>
                            <a href="#" @click="getCollectBlog">收藏博客</a>
                        </li>
                        <li>
                            <a href="#" @click="getCollectVedio">收藏视频</a>
                        </li>
                        <li>
                            <a href="#" @click="checkMemberInfo">个人资料</a>
                        </li>
                        <li>
                            <a href="#" @click="checkMemberAddress">收货地址管理</a>
                        </li>
                        <li>
                            <a href="#" @click="showOrderInfo">我的订单</a>
                        </li>
                    </ul>
                </dl>
            </section>
            <div v-if="showCollectVedio">
                <!-- /无数据提示 开始-->
                <section class="no-data-wrap" v-if="vedioTotal==0">
                    <em class="icon30 no-data-ico">&nbsp;</em>
                    <span class="c-666 fsize14 ml10 vam">没有收藏的视频...</span>
                </section>

                <div>
                    <article class="comm-course-list mt20">
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
                                            <a :href="'/vediopages/vedioList/' + vedio.id" title="开始阅读" class="comm-btn c-btn-1">立即购买</a>
                                        </div>
                                    </section>
                                    <h3 class="hLh30 txtOf mt10">
                                        <div v-if="Number(vedio.isFree) === 1">
                                            <a :href="'/vediopages/vedio/' + vedio.id" :title="vedio.title" class="course-title fsize18 c-333">{{ vedio.title }}</a>
                                        </div>
                                        <!-- 当视频收费时页面跳转 -->
                                        <div v-if="Number(vedio.isFree) === 0">
                                            <a :href="'/vediopages/vedioList/' + vedio.id" :title="vedio.title" class="course-title fsize18 c-333">{{ vedio.title }}</a>
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
                                            <a href="#" class="c-fff fsize12 f-fA" @click="cancelCcollect(vedio.id)">取消收藏</a>
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
                    <div class="paging" v-if="showCollectVedio">
                        <client-only>
                            <el-pagination :current-page="vedioPage" :page-size="vedioLimit" :total="vedioTotal" style="padding: 30px 0; text-align: center" layout="total, prev, pager, next, jumper" @current-change="getVedioList" />
                        </client-only>
                    </div>
                </div>
            </div>
            <div v-if="editMemberInfo">
                <!-- 会员基本信息 开始 -->
                <section class="fl t-infor-box c-desc-content">
                    <div class="mt20 ml20">
                        <section class="t-infor-pic">
                            <img :src="memberInfo.avatar" :alt="memberInfo.name">
                        </section>
                        <h3 class="hLh30 mt20">
                            <span class="fsize24 c-333 ">昵称：{{ memberInfo.nickname }}</span>
                        </h3>
                        <h3 class="hLh30 mt20">
                            <span class="fsize24 c-333 mt20">性别：</span>
                            <span class="fsize24 c-333 mt20" v-if="Number(memberInfo.sex) === 0">男</span>
                            <span class="fsize24 c-333 mt20" v-if="Number(memberInfo.sex) === 1">女</span>

                        </h3>
                        <h3 class="hLh30 mt20">
                            <span class="fsize24 c-333 mt20">年龄：{{ memberInfo.age }}</span>
                        </h3>
                        <h3 class="hLh30 mt20">
                            <span class="fsize24 c-333 mt20">手机：{{ memberInfo.mobile }}</span>
                        </h3>
                        <h3 class="hLh30 mt20">
                            <span class="fsize24 c-333 mt20">邮箱：{{ memberInfo.mail }}</span>
                        </h3>
                        <h3 class="hLh30 mt20">
                            <span>
                                <el-button type="primary" @click="dialogVideoFormVisible = true">修改注册信息</el-button>
                            </span>
                        </h3>
                        <div class="clear" />
                    </div>
                </section>
                <div class="clear" />
            </div>
        </section>
        <el-dialog :visible.sync="dialogVideoFormVisible" title="修改信息">
            <el-form ref="memberInfo" :model="memberInfo" label-width="120px">
                <el-form-item label="名字">
                    <el-input v-model="memberInfo.nickname" style="width: 300px" />
                </el-form-item>
                <el-form-item label="性别" style="width: 1000px">
                    <el-select v-model="memberInfo.sex" clearable="clearable" placeholder="性别" style="width: 300px">
                        <el-option :value="0" label="男" />
                        <el-option :value="1" label="女" />
                    </el-select>
                </el-form-item>

                <!-- <el-form-item label="头像">
                    <pan-thumb :image="memberInfo.avatar" />
                    <el-button type="primary" icon="el-icon-upload" @click="imagecropperShow = true">更换头像</el-button>
                    <image-cropper v-show="imagecropperShow" :width="300" :height="300" :key="imagecropperKey" :url="'http://localhost:8010' + '/others/Aliyun/oss'" field="file" @close="close" @crop-upload-success="cropSuccess" />
                </el-form-item> -->

                <el-form-item label="年龄">
                    <el-input-number v-model="memberInfo.age" style="width: 300px" />
                </el-form-item>

                <el-form-item label="手机">
                    <el-input v-model="memberInfo.mobile" style="width: 300px" />
                </el-form-item>

                <el-form-item label="邮箱">
                    <el-input v-model="memberInfo.mail" style="width: 300px" />
                </el-form-item>
            </el-form>

            <div slot="footer" class="dialog-footer">
                <el-button @click="cancel">取 消</el-button>
                <el-button :disabled="saveVideoBtnDisabled" type="primary" @click="updateMemberInfo">确 定</el-button>
            </div>
        </el-dialog>
        <div v-if="showaddressInfo">

            <div>
                <article class="comm-course-list mt20">
                    <h3 class="hLh30 mt20">
                        <span>
                            <el-button type="primary" @click="dialogaddressFormVisible = true">新增地址</el-button>
                        </span>
                    </h3>
                    <div class="clear"></div>
                </article>

                <el-table :data="addressList" border style="width: 100%">
                    <el-table-column prop="address" label="地址信息">
                    </el-table-column>
                    <el-table-column prop="gmtCreate" label="添加时间">
                    </el-table-column>
                    <el-table-column prop="gmtModified" label="修改时间">
                    </el-table-column>
                    <el-table-column label="操作" align="center">
                        <template slot-scope="scope" v-if="showaddressInfo">
                            <!-- <router-link :to="'/edu/teacher/edit/' + scope.row.id"> -->
                            <el-button type="primary" size="mini" icon="el-icon-edit" @click="getAddressById(scope.row.id)">修改</el-button>
                            <el-button type="danger" size="mini" icon="el-icon-delete" @click="removeDataById(scope.row.id)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>

                <el-dialog :visible.sync="dialogaddressFormVisible" title="添加/修改地址">
                    <el-form ref="addressInfo" :model="addressInfo" label-width="120px">
                        <el-form-item label="地址">
                            <el-input v-model="addressInfo.address" style="width:400px" />
                        </el-form-item>
                    </el-form>

                    <div slot="footer" class="dialog-footer">
                        <el-button @click="cancelSaveAddress">取 消</el-button>
                        <el-button :disabled="saveAddressBtnDisabled" type="primary" @click="saveOrUpdataAddressData">确 定</el-button>
                    </div>
                </el-dialog>
            </div>
            <!-- 公共分页 开始 -->

        </div>

        <div v-if="showOrderInfomation">

            <div>
                <article class="comm-course-list mt20">
                    <div class="clear"></div>
                </article>

                <el-table :data="orderList" border style="width: 100%">
                    <el-table-column prop="id" label="编号" align="center">
                    </el-table-column>

                    <el-table-column prop="totalFee" label="总价" align="center">
                    </el-table-column>
                    <el-table-column prop="totalNum" label="商品数量" align="center">
                    </el-table-column>
                    <el-table-column prop="statusDescrpt" label="订单状态" align="center">
                    </el-table-column>

                    <el-table-column prop="address" label="收货地址" align="center">
                    </el-table-column>
                    <el-table-column prop="gmtCreate" label="创建时间" align="center">
                    </el-table-column>

                    <el-table-column label="管理" align="center" width="100px">
                        <template slot-scope="scope">
                            <el-button :disabled="scope.row.status!=0" type="danger" size="mini" @click="cancelOrder(scope.row.id)">取消订单</el-button>
                        </template>
                    </el-table-column>

                    <el-table-column label="操作" align="center" width="200px">
                        <template slot-scope="scope">
                            <el-button type="primary" size="mini" @click="deleteOrder(scope.row.id)">删除</el-button>
                            <el-button type="primary" size="mini" @click="showOrderDetail(scope.row.id)">订单详情</el-button>
                        </template>
                    </el-table-column>
                </el-table>

                <el-dialog title="订单详情" :visible.sync="dialogOrderVisible" width="60%">

                    <el-table :data="orderDetailList" element-loading-text="拼命加载中" border="border" fit="fit" highlight-current-row="highlight-current-row">
                        <!-- 序号 -->
                        <el-table-column label="序号" width="70" align="center">
                            <template slot-scope="scope">
                                <!-- 自动生成博客的序号 -->
                                {{ scope.$index + 1 }}
                            </template>
                        </el-table-column>

                        <el-table-column prop="product.title" label="名称" align="center" />

                        <el-table-column prop="sex" label="性别" align="center">
                            <template slot-scope="scope">
                                {{ scope.row.sex == 0 ? "男" : "女" }}
                            </template>
                        </el-table-column>

                        <el-table-column prop="product.picture" label="图片" align="center">
                            <template slot-scope="scope">
                                <el-image :src="scope.row.product.picture" fit="contain" style="width: 100px; height: 100px" />
                            </template>
                        </el-table-column>

                        <el-table-column prop="payPrice" label="价格" align="center" />

                        <el-table-column prop="num" label="购买数量" align="center" />

                    </el-table>

                </el-dialog>

                <el-dialog :visible.sync="dialogaddressFormVisible" title="添加/修改地址">
                    <el-form ref="addressInfo" :model="addressInfo" label-width="120px">
                        <el-form-item label="地址">
                            <el-input v-model="addressInfo.address" style="width:400px" />
                        </el-form-item>
                    </el-form>

                    <div slot="footer" class="dialog-footer">
                        <el-button @click="cancelSaveAddress">取 消</el-button>
                        <el-button :disabled="saveAddressBtnDisabled" type="primary" @click="saveOrUpdataAddressData">确 定</el-button>
                    </div>
                </el-dialog>
            </div>
            <!-- 公共分页 开始 -->

        </div>
    </section>
    <!-- 新增作者对话框 -->

</div>
</template>

<script>
import cookie from "js-cookie";
import memberApi from "@/api/member";
import ImageCropper from '@/components/ImageCropper'
import PanThumb from '@/components/PanThumb'
export default {
    components: {
        ImageCropper,
        PanThumb
    },
    data() {
        return {
            dialogOrderVisible: false,
            showOrderInfomation: false,
            saveAddressBtnDisabled: false,
            dialogaddressFormVisible: false,
            showCollectVedio: false,
            showaddressInfo: false,
            saveVideoBtnDisabled: false,
            dialogVideoFormVisible: false,
            editMemberInfo: true,
            blogInfo: {},
            vedioPage: 0,
            vedioLimit: 8,
            vedioTotal: 0,
            queryBlogVo: {},
            vedioList: [],
            addressList: [],
            addressInfo: {
                id: '',
                memberId: '',
                address: ''
            },
            memberInfo: {
                nickname: '',
                avatar: '',
                pictureName: '',
                mail: ''
            },
            loginInfo: {},
            BASE_API: process.env.BASE_API, // 接口API地址
            imagecropperShow: false, // 是否显示上传组件
            imagecropperKey: 0, // 上传组件id
            vedioCollect: {},
            orderList: [],
            orderDetailList: []
        };
    },
    created() {
        this.getMemberInfById();
        this.getVedioList();
    },
    methods: {
        // 删除订单
        deleteOrder(id) {
             this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                })
                .then(() => {
                    memberApi.deleteOrder(id).then(Response => {
                        this.showOrderInfo();
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        })
                    })
                })
                .catch((response) => {
                    // 失败
                    if (response === 'cancel') {
                        this.$message({
                            type: 'info',
                            message: '已取消删除'
                        })
                    }
                })
        },
        //取消订单
        cancelOrder() {

        },

        // 显示订单详情
        showOrderDetail(id) {
            this.dialogOrderVisible = true
            for (var i = 0; i < this.orderList.length; i++) {
                if (this.orderList[i].id == id) {
                    // children若为空数组，则将children设为undefined
                    this.orderDetailList = this.orderList[i].details
                }
            }
            console.log("orderDetailList:", this.orderDetailList)

        },

        // 获取订单信息
        showOrderInfo() {
            this.showOrderInfomation = true
            this.showCollectVedio = false
            this.editMemberInfo = false
            this.showaddressInfo = false
            memberApi.getOrderList(this.memberInfo.id).then(Response => {
                this.orderList = Response.data.data.list
                console.log(this.orderList)
            })
        },

        getAddressById(id) {
            this.dialogaddressFormVisible = true
            memberApi.getAddressById(id).then(Response => {
                this.addressInfo = Response.data.data.address
            })
        },

        removeDataById(id) {
            this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                })
                .then(() => {
                    memberApi.deleteAddressById(id).then(Response => {
                        this.getAddressByMemberId()
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        })
                    })
                })
                .catch((response) => {
                    // 失败
                    if (response === 'cancel') {
                        this.$message({
                            type: 'info',
                            message: '已取消删除'
                        })
                    }
                })
        },

        // 取消保存新的地址
        cancelSaveAddress() {
            this.dialogaddressFormVisible = false
            this.addressInfo = {}
        },

        //保存或者修改地址
        saveOrUpdataAddressData() {
            if (!this.addressInfo.id) {
                this.addNewAddress()
                this.getAddressByMemberId()
            } else {
                this.updateAddressById()
                this.getAddressByMemberId()
            }
            this.dialogaddressFormVisible = false
            this.addressInfo = {}
        },

        //更新地址信息
        updateAddressById() {
            memberApi.updateAddressById(this.addressInfo).then(Response => {
                this.$message({
                    type: 'success',
                    message: '更新地址成功!'
                })
                this.getAddressByMemberId()
            })
        },

        // 保存新的收获地址
        addNewAddress() {
            this.addressInfo.memberId = this.memberInfo.id
            memberApi.addNewAddress(this.addressInfo).then(Response => {
                this.$message({
                    type: 'success',
                    message: '添加新地址成功!'
                })
                this.getAddressByMemberId()
            })
        },
        checkMemberAddress() {
            this.showOrderInfomation = false
            this.showCollectVedio = false
            this.editMemberInfo = false
            this.showaddressInfo = true
            this.getAddressByMemberId()
        },

        //根据会员id得到地址列表
        getAddressByMemberId() {
            memberApi.getAddressByMemberId(this.memberInfo.id).then(Response => {
                this.addressList = Response.data.data.addressList
                console.log("addressList:", this.addressList)
            })
        },

        getCollectBlog() {},

        getCollectVedio() {
            this.showOrderInfomation = false
            this.showCollectVedio = true
            this.editMemberInfo = false
            this.showaddressInfo = false
        },
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

        // 取消视频收藏
        cancelCcollect(id) {
            this.showInfo()
            this.vedioCollect.memberId = this.loginInfo.id
            this.vedioCollect.vedioId = id
            console.log("vedioCollect:", this.vedioCollect)
            memberApi.cancelCcollect(this.vedioCollect).then(Response => {
                this.$message({
                    type: 'success',
                    message: '取消收藏成功!'
                })
                this.getVedioList();

            })
        },
        // 获取视频列表
        getVedioList(vedioPage = 1) {
            this.vedioPage = vedioPage
            const id = this.$route.params.id
            memberApi.getCollectVedio(id, this.vedioPage, this.vedioLimit).then(Response => {
                this.vedioList = Response.data.data.memberVedioList.vedioList
                this.vedioTotal = Response.data.data.total
                console.log("vedioList:", this.vedioList)
            })
        },

        // 上传成功后的回调函数
        cropSuccess(data) {
            console.log(data)
            this.imagecropperShow = false
            this.memberInfo.avatar = data.url
            this.memberInfo.pictureName = data.filename
            // 上传成功后，重新打开上传组件时初始化组件，否则显示上一次的上传结果
            this.imagecropperKey = this.imagecropperKey + 1
        },

        // 关闭上传组件
        close() {
            this.imagecropperShow = false
            // 上传失败后，重新打开上传组件时初始化组件，否则显示上一次的上传结果
            this.imagecropperKey = this.imagecropperKey + 1
        },

        // 取消上传
        cancel() {
            this.dialogVideoFormVisible = false

        },
        // 更新会员信息
        updateMemberInfo() {
            console.log("memberInfo", this.memberInfo)
            memberApi.updateMemberInfo(this.memberInfo).then(Response => {
                this.$message({
                    type: 'success',
                    message: '修改成功!'
                })
                this.dialogVideoFormVisible = false,
                    this.getMemberInfById()
            })
        },
        //跳转到编辑用户信息上面
        checkMemberInfo() {
            this.showOrderInfomation = false
            this.showCollectVedio = false
            this.editMemberInfo = true
            this.showaddressInfo = false
            this.getMemberInfById()
        },
        //得到作者信息
        getMemberInfById() {
            const id = this.$route.params.id;
            memberApi.getMemberInfo(id).then(Response => {
                this.memberInfo = Response.data.data.member
                console.log("memberInfo:", this.memberInfo)
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
</style>
