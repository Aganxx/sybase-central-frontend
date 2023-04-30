<template lang="pug">
.complaint-wrapper
  .complaint-header.header 
    a-typography-title.title(:heading="3") 反馈中心
    a-button.btn(type="primary" size="large") 投诉
  .complaint-content 
    a-typography-title.processing(:heading="6") 等待处理
    a-grid(:cols="3" :colGap="24" :rowGap="30" class="grid-demo-grid" :collapsed="collapsed")
      a-grid-item(v-for="item of processing")
        a-card.card
          template(#title)
            .card-title {{ item.subject }}
          template(#extra v-if="isAdmin")
            a-button.btn(size="large" type="primary") 已解决
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
</template>
<script setup name="Complaint" lang="ts">
  import { useUserStore } from '@/store';
  import { storeToRefs } from 'pinia';
  import { ref } from 'vue';
  // data
  const processed = ref();
  const processing = ref();
  const { complaint, isAdmin } = storeToRefs(useUserStore());
  processed.value = complaint.value.filter((item) => item.status);
  processing.value = complaint.value.filter((item) => item.status === false);
  // methods
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
      .btn
        border-radius 6px
      .card-time
        margin-top 30px
</style>
