<template lang="pug">
a-modal(v-model:visible='visible' :closable="false")
  template(#title)
    .modal-header
      .modal-title 添加一名成员
  .modal-content
    .input-title 用户名
    a-input(v-model="memberInfo.username" :readonly="false")
    .input-title 密码
    a-input(v-model="memberInfo.password" :readonly="false")
    .input-title.select 身份
    a-select(:options="selectRole" placeholder="选择身份" :onChange="submitRole")
  template(#footer)
    .modal-footer 
      a-button.modal-ok(type="primary" @click="handleOk" :loading='loading') 确认添加
      a-button.modal-cancel(type="text" @click="handleCancel") 取消
</template>
<script lang="ts" setup name="ManagementModal">
  import { Message } from '@arco-design/web-vue';
  import { register } from '@/api/user';
  import type { RegisterData } from '@/api/user';
  import { ref } from 'vue';
  // data
  const emits = defineEmits(['created']);
  const visible = ref(false);
  const loading = ref(false);
  const memberInfo = ref<RegisterData>({
    username: '',
    password: '',
    role: '',
  });
  const selectRole = ['管理员', '普通用户'];

  // methods
  const submitRole = (value: any) => {
    memberInfo.value.role = value === '管理员' ? 'admin' : 'user';
  };
  const handleOk = async () => {
    try {
      loading.value = true;
      await register(memberInfo.value);
      Message.success('添加成功!');
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
