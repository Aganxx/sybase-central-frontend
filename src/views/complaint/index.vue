<template lang="pug">
.complaint-wrapper
  .complaint-header.header 
    a-typography-title.title(:heading="3") 反馈中心
    a-button.btn(v-if="!isAdmin" type="primary" size="large" @click="openModal") 投诉
  .complaint-content 
    a-typography-title.processing(:heading="6" v-if="processing.length") 等待处理
    a-grid(:cols="3" :colGap="24" :rowGap="30" class="grid-demo-grid" :collapsed="collapsed")
      a-grid-item(v-for="item of processing")
        a-card.card
          template(#title)
            .card-title {{ item.subject }}
          template(#extra v-if="isAdmin")
            a-button.btn(size="large" type="primary" @click="handleResolve(item)") 已解决
          .card-content {{ item.content }}
          .card-time {{ item.time }}
    a-typography-title.processed(:heading="6" v-if="processed.length") 已处理
    a-grid(:cols="3" :colGap="24" :rowGap="30" class="grid-demo-grid" :collapsed="collapsed")
      a-grid-item(v-for="item of processed")
        a-card.card
          template(#title)
            .card-title {{ item.subject }}
          template(#extra)
            .card-time {{ item.time }}
          .card-content {{ item.content }}
ComplaintModal(ref="showComplaintModal")
</template>
<script setup name="Complaint" lang="ts">
  import { useUserStore } from '@/store';
  import { storeToRefs } from 'pinia';
  import { ref, computed } from 'vue';
  import { resolveComplaint } from '@/api/user';
  import type { Complaint } from '@/store/modules/user/types';
  import ComplaintModal from './complaintModal.vue';
  import { Message } from '@arco-design/web-vue';

  // data
  const showComplaintModal = ref<InstanceType<typeof ComplaintModal>>();
  const processed = ref();
  const processing = ref();
  const { complaint } = storeToRefs(useUserStore());
  const isAdmin = computed(
    () => localStorage.getItem('currentRole') === 'admin'
  );
  processed.value = complaint.value.filter((item) => item.status);
  processing.value = complaint.value.filter((item) => item.status === false);
  // methods
  const openModal = () => {
    if (showComplaintModal.value) showComplaintModal.value.show();
  };
  const handleResolve = async (value: Complaint) => {
    await resolveComplaint({ id: value._id });
    Message.success('提交成功');
  };
  // lifecycle
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  .complaint-wrapper
    .complaint-header
      display flex
      justify-content space-between
      align-items center
      .btn
        width 110px
        border-radius 6px
    .complaint-content
      .card
        width 320px
      .btn
        border-radius 6px
      .card-time
        margin-top 30px
</style>
