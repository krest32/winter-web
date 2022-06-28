module.exports = {
    /*
     ** Headers of the page
     */

    // 修改端口设置
    server: {
        port: 10002, // default: 3000
        host: "localhost" // default: localhost
    },

    // 加入幻灯片插件和css样式
    plugins: [{ src: "~/plugins/nuxt-swiper-plugin.js", ssr: false }],
    css: ["swiper/dist/css/swiper.css"],

    head: {
        title: "Winter 前端测试系统",
        meta: [
            { charset: "utf-8" },
            { name: "viewport", content: "width=device-width, initial-scale=1" },
            {
                hid: "description",
                name: "description",
                content: "Winter Blog"
            }
        ],
        // 定义图标的地址
        link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
    },
    /*
     ** Customize the progress bar color
     */
    loading: { color: "#3B8070" },
    /*
     ** Build configuration
     */
    build: {
    }
};

//修改启动端口
// export default {

// };
