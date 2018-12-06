<template>
  <info title="扫码登录成功" message="你已成功通过微信扫码登录智慧就业平台。" type="success"></info>
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
