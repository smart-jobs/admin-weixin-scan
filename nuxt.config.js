const pkg = require('./package');

const url_prefix = '/platform/weixin';

module.exports = {
  mode: 'universal',

  /*
  ** Headers of the page
  */
  head: {
    title: pkg.description,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    script: [
      {
        type: 'text/javascript',
        src: 'http://res.wx.qq.com/open/js/jweixin-1.2.0.js',
      },
    ],
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  /*
  ** Global CSS
  */
  css: ['we-vue/lib/style.css'],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
      { src: '~/plugins/we-vue', ssr: false }, 
      { src: '~/plugins/check-res', ssr: false }, 
      '~/plugins/axios'
    ],

  /*
  ** Nuxt.js modulesy
  */
  modules: [
    // Doc: https://github.com/nuxt-community/axios-module#usage
    '@nuxtjs/axios',
    // Doc: https://bootstrap-vue.js.org/docs/
    // 'bootstrap-vue/nuxt',
  ],
  /*
  ** Axios module configuration
  */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
    prefix: `${url_prefix}/api`,
    browserBaseURL: `${url_prefix}/api`,
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/,
        });
      }
    },
  },
  router: {
    base: `${url_prefix}/`,
  },
  vue: {
    config: {
      wxapi: {
        baseUrl: 'http://www.jilinobswx.cn', 
      },
    }
  },
  /**
   * 扩展配置信息，自定义
   */
  extends: {
    api: {
      baseUrl: 'http://127.0.0.1:8000/platform/api', 
    },
},
};
