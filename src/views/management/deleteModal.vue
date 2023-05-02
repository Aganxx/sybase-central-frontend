<template lang="pug">
a-modal(v-model:visible='visible' :closable="false")
  template(#title)
    .modal-header
      .modal-title 提示
  .modal-content
    | 你正在删除一名用户，请点击确认删除！
  template(#footer)
    .modal-footer 
      a-button.modal-ok(type="primary" @click="handleOk" :loading='loading') 确认
      a-button.modal-cancel(type="text" @click="handleCancel") 取消
</template>
<script lang="ts" setup name="DeleteModal">
  import { Message } from '@arco-design/web-vue';
  import { deleteUser } from '@/api/user';
  import { ref } from 'vue';
  // data
  const props = defineProps({
    user_id: {
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
      await deleteUser({ id: props.user_id });
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
