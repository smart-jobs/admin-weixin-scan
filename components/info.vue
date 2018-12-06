<template>
  <div class="weui-msg">
    <div class="weui-msg__icon-area">
      <i :class="[iconCls, 'weui-icon_msg']"/>
    </div>
    <div class="weui-msg__text-area">
      <h2 class="weui-msg__title"><slot name="title">{{title}}</slot></h2>
      <p class="weui-msg__desc"><slot name="desc">{{message}}</slot></p>
    </div>
    <slot>
    </slot>
    <div class="weui-msg__opr-area">
      <slot name="opr">
      </slot>
    </div>
    <div class="weui-msg__extra-area">
      <slot name="extra">
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '信息',
    },
    message: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: 'info',
    },
  },
  computed: {
    iconCls() {
      return `weui-icon-${this.type}`;
    },
  },
};
</script>
