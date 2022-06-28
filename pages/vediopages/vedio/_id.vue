<template>
<div class="container">
    <!-- 阿里云视频播放器样式 -->
    <link rel="stylesheet" href="https://g.alicdn.com/de/prismplayer/2.8.1/skins/default/aliplayer-min.css" />

    <!-- 阿里云视频播放器脚本 -->
    <script charset=" utf-8" type="text/javascript" src="https://g.alicdn.com/de/prismplayer/2.8.1/aliplayer-min.js" />

    <!-- 定义播放器dom -->
    <div id="J_prismPlayer" class="prism-player" />

    <section class="container">
        <header class="comm-title">
            <h2 class="fl tac">
                <span class="c-333" :title="albumTitle" >专辑：《{{albumTitle}}》</span>
            </h2>
            <!-- 浮动框,默认会浮动 在页面右侧 -->
        </header>
        <section class="c-sort-box">
            <div>
                <article class="comm-course-list">
                    <ul class="of" id="bna">
                        <li v-for="vedio in vedioList" :key="vedio.id">
                            <div class="cc-l-wrap">
                                <section class="course-img">
                                    <img :src="vedio.pictureAddress" class="img-responsive" :alt="vedio.title" />
                                    <div class="cc-mask">
                                        <a :href="'/vediopages/vedio/' + vedio.id" title="开始阅读" class="comm-btn c-btn-1">开始观看</a>
                                    </div>
                                </section>
                                <h3 class="hLh30 txtOf mt10">
                                    <a :href="'/vediopages/vedio/' + vedio.id" :title="vedio.title" class="course-title fsize18 c-333">{{ vedio.title }}</a>
                                </h3>
                                <section class="mt10 hLh20 of">
                                    <span class="fr jgTag bg-green" v-if="Number(vedio.isFree) === 1">
                                        <i class="c-fff fsize12 f-fA">免费</i>
                                    </span>


                                    <span class="fl jgAttr c-ccc f-fA">
                                        <i class="c-999 f-fA">{{ vedio.clickCount }}人看过</i>
                                        <i class="c-999 f-fA">{{ vedio.collectCount }}人收藏</i>
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
                <div class="paging">
                    <client-only>
                        <el-pagination :current-page="page" :page-size="limit" :total="total" style="padding: 30px 0; text-align: center" layout="total, prev, pager, next, jumper" @current-change="getVedioListById" />
                    </client-only>
                </div>
            </div>
            <!-- 公共分页 结束 -->
        </section>
    </section>

</div>
</template>

<script>
import vedioApi from "@/api/vedio";
export default {
  asyncData({ params, error }) {
    return vedioApi.vedioPlayAuth(params.id).then(response => {
      // console.log(response.data.data)
      return {
        // vid: params.id,
        vid: response.data.data.videoSourceId,
        playAuth: response.data.data.playAuth
      };
    });
  },
    data() {
        return {
            page: 0,
            limit: 2,
            total: 0,
            queryVedioVo: {},
            vedioList: [],
            catelogList: [],
            threeIndex: -1,
            albumTitle:''
        };
    },

    created() {
        this.getVedioListById();
    },

  //建立播放器
  mounted() {

    new Aliplayer(
      {
        id: "J_prismPlayer",
        vid: this.vid, // 视频id
        playauth: this.playAuth, // 播放凭证
        encryptType: "1", // 如果播放加密视频，则需设置encryptType=1，非加密视频无需设置此项
        width: "1160px",
        height: "800px"
      },
      function(player) {
        console.log("播放器创建成功");
      }
    );
  },
  /**
   * 页面渲染完成时：此时js脚本已加载，Aliplayer已定义，可以使用
   * 如果在created生命周期函数中使用，Aliplayer is not defined错误
   */
      methods: {
        // 根据vedioId 得到专辑列表
        getVedioListById(page=1){
            this.page=page
            const vedioId = this.$route.params.id
            vedioApi.getVedioListByVedioId(vedioId,this.page,this.limit,this.queryVedioVo).then(Response=>{
                this.vedioList = Response.data.data.vedioList
                this.total = Response.data.data.total
                this.albumTitle=Response.data.data.albumTitle
            })
        },

    }
};
</script>

<style></style>
