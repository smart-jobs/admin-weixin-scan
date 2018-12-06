<template>
  <info title="扫码登录" type="waiting">
    <span slot="desc">你确定要使用用户<b style="color: red;">{{ (userinfo && userinfo.userid) || ''}}</b>登录就业管理系统吗？</span>
    <template slot="opr">
      <p class="weui-btn-area">
        <a :class=" { 'weui-btn_disabled': loading }" href="javascript:;" class="weui-btn weui-btn_primary" @click="onLogin">{{ loading?'正在登录...':'确定' }}</a>
        <a v-show="!loading" href="javascript:;" class="weui-btn weui-btn_default" @click="close">取消</a>
      </p>
    </template>
  </info>
</template>

<script>
import { mapState, mapActions } from 'vuex';
const Weui = process.client ? require('we-vue') : undefined;
import Info from '@/components/info';
const { ErrorCode } = require('naf-core').Error;

export default {
  middleware: 'subscribe',
  components: {
    Info,
  },
  async fetch({ store, params, error, redirect }) {
    try {
      // TODO: 检查二维码状态
      let res = await store.dispatch('checkQrcode', params);
      if (res.errcode !== 0) {
        error({ message: res.errmsg });
        return;
      }
      // TODO: 检查绑定状态
      res = await store.dispatch('fetchUser');
      if (res.errcode === 0) {
        return;
      }
      console.log('fetchUser res:', res);
      if (res.errcode === ErrorCode.USER_NOT_BIND) {
        redirect(`/${params.qrcode}/bind`);
      } else {
        error({ message: res.errmsg });
      }
    } catch (err) {
      error(err.message);
    }
  },
  data() {
    return {
      loading: false,
    };
  },
  computed: {
    ...mapState(['userinfo']),
  },
  methods: {
    ...mapActions(['login']),
    async onLogin() {
      // TODO: 提交请求
      try {
        this.loading = true;
        const res = await this.login({
          qrcode: this.$route.params.qrcode,
        });
        this.$checkRes(res, '扫码登录成功');
      } catch (err) {
        Weui.Toast.fail('操作失败');
        console.error(err);
      } finally {
        this.loading = false;
      }
    },
    close() {
      wx.closeWindow();
    },
  },
};
</script>
