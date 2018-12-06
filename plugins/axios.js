import Vue from 'vue';
// import NafCore from 'naf-core';
// const { BusinessError } = NafCore.Error;

var vm = new Vue({})

export default function ({ $axios, redirect, app, store }) {
  $axios.onRequest(config => {
    if (process.browser) {
      // vm.$loading()
    }
  });

  $axios.onResponse(response => {
    if (process.browser) {
      // let load = vm.$loading();
      // load.close();
      const res = response.data;
      if (res.errcode) {
        // console.log('response: ', response);
        console.error(`请求发生错误：${res.errcode}, ${res.errmsg}`);
      }
    }
  })

  $axios.onError(error => {
    if (process.browser) {
      // let load = vm.$loading();
      // load.close();
    }
    const code = parseInt(error.response && error.response.status)
    console.error(`请求发生错误：${code}`);
  })

  // $axios.defaults.headers.common['x-tenant'] = 'demo';

}
