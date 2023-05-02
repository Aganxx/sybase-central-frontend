<template lang="pug">
.payment-wrapper 
  .payment-header.header 
    a-typography-title.title(:heading="3") 账单
  .payment-content
    a-typography-title.table-title(:heading="6") 待缴费账单
    a-table(:data="unpaid" :pagination="false" :hoverable="false")
      template(#columns)
        a-table-column(v-for="column in columns" :title="column.title" :data-index="column.dataIndex")
        a-table-column(v-if="isAdmin")
          template(#cell="{record}")
            .operation(@click="handleClick(record)") 更多操作
    a-typography-title.table-title(:heading="6") 已缴费账单
    a-table(:data="paid" :pagination="false" :hoverable="false")
      template(#columns)
        a-table-column(v-for="column in columns" :title="column.title" :data-index="column.dataIndex")
PaymentModal(ref="showPaymentModal" :payment_id="payment_id")
</template>
<script setup name="Payment" lang="ts">
  import { useUserStore } from '@/store';
  import { storeToRefs } from 'pinia';
  import { ref } from 'vue';
  import PaymentModal from './paymentModal.vue';

  // data
  const paid = ref();
  const unpaid = ref();
  const payment_id = ref('');

  const showPaymentModal = ref<InstanceType<typeof PaymentModal>>();
  const { payment, isAdmin } = storeToRefs(useUserStore());
  paid.value = payment.value.filter((item) => item.state === true);
  unpaid.value = payment.value.filter((item) => item.state === false);

  const columns = [
    { title: '单号', dataIndex: '_id' },
    { title: '金额', dataIndex: 'amount' },
    { title: '类型', dataIndex: 'paymentType' },
    { title: '生效时间', dataIndex: 'time' },
  ];
  // methods
  const handleClick = (record: any) => {
    payment_id.value = record._id;
    showPaymentModal.value && showPaymentModal.value.show();
  };
  // lifecycle
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  .payment-content
    margin-top 20px
    .table-title
      margin 20px 0 10px
    .operation
      color rgb(22, 92, 255)
      cursor pointer
</style>
