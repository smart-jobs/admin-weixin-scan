<template>
  <info title="解除绑定" type="waiting">
    <span slot="desc">你确定要解除和用户<b style="color: red;" >{{ username }}</b>的微信绑定关系吗？</span>
    <template slot="opr">
      <p class="weui-btn-area">
        <a 
          :class=" { 'weui-btn_disabled': loading }" 
          href="javascript:;" 
          class="weui-btn weui-btn_primary"
          @click="login">{{ loading?'正在操作...':'确定' }}</a> 
        <a 
          v-show="!loading" 
          href="javascript:;" 
          class="weui-btn weui-btn_default" 
          @click="close">取消</a>
      </p>
    </template>
  </info>
</template>

<script>
const Weui = process.client ? require('we-vue') : undefined;
import Info from '@/components/info';

export default {
  components: {
    Info,
  },
  data() {
    return {
      loading: false,
      username: 'admin',
    };
  },
  methods: {
    login() {
      Weui.Dialog({
        title: '对话框标题',
        message: 'no implements!',
        skin: 'ios',
      });
    },
    close() {
      wx.closeWindow();
    },
  },
};
</script>
