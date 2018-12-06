<template>
  <div class="weui-msg">
    <div class="weui-msg__icon-area">
      <i class="weui-icon-warn weui-icon_msg" />
    </div>
    <div class="weui-msg__text-area">
      <h2 class="weui-msg__title">{{statusCode}}</h2>
      <p class="weui-msg__desc">{{message}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'nuxt-error',
  props: ['error'],
  head() {
    return {
      title: this.message,
    };
  },
  computed: {
    statusCode() {
      return (this.error && this.error.statusCode && `页面错误：${this.error.statusCode}`) || '页面错误';
    },
    message() {
      return this.error.message || `Error`;
    },
  },
};
</script>
