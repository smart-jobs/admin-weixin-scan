<template>
  <info title="解除绑定成功" message="你已成功解除微信绑定关系。" type="success"></info>
</template>

<script>
import Info from '@/components/info';

export default {
  components: {
    Info,
  },
  head: {
    title: '操作成功',
  },
};
</script>
