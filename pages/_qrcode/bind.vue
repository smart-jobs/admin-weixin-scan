<template>
  <info title="微信号还未绑定" message="请输入用户名和密码进行微信绑定" type="waiting">
    <div class="weui-cells weui-cells_form">
      <div v-if="false" class="weui-cell">
        <div class="weui-cell__hd">
          <label class="weui-label">学校代码</label>
        </div>
        <div class="weui-cell__bd">
          <input v-model="yxdm" class="weui-input" type="text" placeholder="请输入所在学校代码">
        </div>
      </div>
      <div class="weui-cell">
        <div class="weui-cell__hd">
          <label class="weui-label">用户名</label>
        </div>
        <div class="weui-cell__bd">
          <input v-model="username" class="weui-input" type="text" placeholder="请输入登录用户名">
        </div>
      </div>
      <div class="weui-cell">
        <div class="weui-cell__hd">
          <label class="weui-label">密码</label>
        </div>
        <div class="weui-cell__bd">
          <input v-model="password" class="weui-input" type="password" placeholder="请输入登录密码">
        </div>
      </div>
    </div>
    <template slot="opr">
      <p class="weui-btn-area">
        <a :class="{ 'weui-btn_disabled': loading }" href="javascript:;" class="weui-btn weui-btn_primary" @click="onBind">{{ loading? '处理中...':'确定' }}</a>
        <a v-show="!loading" href="javascript:;" class="weui-btn weui-btn_default" @click="close">取消</a>
      </p>
    </template>

  </info>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import Info from '@/components/info';
const Weui = process.client ? require('we-vue') : undefined;
const { ErrorCode } = require('naf-core').Error;

export default {
  components: {
    Info,
  },
  layout: 'nofooter',
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
        redirect(`/${params.qrcode}/login`);
        return;
      }
      if (res.errcode !== ErrorCode.USER_NOT_BIND) {
        error({ message: res.errmsg });
      }
    } catch (err) {
      error(err.message);
    }
  },
  data() {
    return {
      username: '',
      password: '',
      loading: false,
      btnText: '确定',
    };
  },
  methods: {
    ...mapActions(['bind']),
    async onBind() {
      const isEmpty = val => {
        return !val || val.trim() == '';
      };
      // TODO: 检查参数
      if (isEmpty(this.username)) {
        showAlert('用户名不能为空');
        return;
      }
      if (isEmpty(this.password)) {
        showAlert('密码不能为空');
        return;
      }

      // TODO: 提交绑定请求
      try {
        this.loading = true;
        const res = await this.bind({
          qrcode: this.$route.params.qrcode,
          username: this.username,
          password: this.password,
        });
        this.$checkRes(res, '登录绑定成功');
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
