<template>
  <info title="绑定登录成功" message="你已成功绑定微信账号，并自动登录智慧就业平台。" type="success"></info>
</template>

<script>
import Info from '@/components/info';

export default {
  components: {
    Info,
  },
  head: {
    title: '登录成功',
  },
};
</script>
