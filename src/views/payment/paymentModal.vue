<template lang="pug">
a-modal(v-model:visible='visible' :closable="false")
  template(#title)
    .modal-header
      .modal-title 提示
  .modal-content
    | 若该账单已支付，请点击确认！
  template(#footer)
    .modal-footer 
      a-button.modal-ok(type="primary" @click="handleOk" :loading='loading') 确认
      a-button.modal-cancel(type="text" @click="handleCancel") 取消
</template>
<script lang="ts" setup name="PaymentModal">
  import { Message } from '@arco-design/web-vue';
  import { resolvePayment } from '@/api/user';
  import { ref } from 'vue';
  // data
  const props = defineProps({
    payment_id: {
      type: String,
      default: '',
    },
  });

  const emits = defineEmits(['created']);
  const visible = ref(false);
  const loading = ref(false);

  // methods
  const handleOk = async () => {
    try {
      loading.value = true;
      await resolvePayment({ id: props.payment_id });
      Message.success('提交成功!');
      emits('created');
    } finally {
      loading.value = false;
      visible.value = false;
    }
  };
  const handleCancel = () => {
    visible.value = false;
  };
  const show = () => {
    visible.value = true;
  };
  // lifecycle

  defineExpose({
    show,
  });
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped></style>
