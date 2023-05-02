<template lang="pug">
a-modal(v-model:visible='visible' :closable="false")
  template(#title)
    .modal-header
      .modal-title 缴费表
  .modal-content
    .input-title 类型
    a-input(v-model="buildingOperationData.paymentType" :readonly="false")
    .input-title 金额
    a-input(v-model="buildingOperationData.amount" :readonly="false")
  template(#footer)
    .modal-footer 
      a-button.modal-ok(type="primary" @click="handleOk" :loading='loading') 提交
      a-button.modal-cancel(type="text" @click="handleCancel") 取消
</template>
<script lang="ts" setup name="BuildingModal">
  import { Message } from '@arco-design/web-vue';
  import { buildingOperation } from '@/api/user';
  import type { BuildingOperation } from '@/api/user';
  import { ref } from 'vue';
  // data
  const props = defineProps({
    building_id: {
      type: String,
      default: '',
    },
  });

  const emits = defineEmits(['created']);
  const visible = ref(false);
  const loading = ref(false);
  const buildingOperationData = ref<BuildingOperation>({
    id: '',
    paymentType: '',
    amount: '',
  });

  // methods
  const handleOk = async () => {
    try {
      loading.value = true;
      buildingOperationData.value.id = props.building_id;
      await buildingOperation(buildingOperationData.value);
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
