<template lang="pug">
a-modal(v-model:visible='visible' :closable="false")
  template(#title)
    .modal-header
      .modal-title 投诉信
  .modal-content
    .input-title 标题
    a-input(v-model="complaintInfo.subject" :readonly="false")
    .input-title 内容
    a-input(v-model="complaintInfo.content" :readonly="false")
  template(#footer)
    .modal-footer 
      a-button.modal-ok(type="primary" @click="handleOk" :loading='loading') 提交
      a-button.modal-cancel(type="text" @click="handleCancel") 取消
</template>
<script lang="ts" setup name="complaintModal">
  import { Message } from '@arco-design/web-vue';
  import { requestComplaint } from '@/api/user';
  import type { ComplaintInfo } from '@/api/user';
  import { ref } from 'vue';
  // data
  const emits = defineEmits(['created']);
  const visible = ref(false);
  const loading = ref(false);
  const complaintInfo = ref<ComplaintInfo>({
    subject: '',
    content: '',
  });

  // methods
  const handleOk = async () => {
    try {
      loading.value = true;
      await requestComplaint(complaintInfo.value);
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
