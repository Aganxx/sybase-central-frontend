<template lang="pug">
.declaration-wrapper 
  .declaration-header.header 
    a-typography-title.title(:heading="3") 报修中心
  .declaration-content 
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
<script setup name="Declaration" lang="ts">
  import { useUserStore } from '@/store';
  import { storeToRefs } from 'pinia';
  import { ref } from 'vue';
  // data
  const processed = ref();
  const processing = ref();
  const { declaration, isAdmin } = storeToRefs(useUserStore());
  processed.value = declaration.value.filter((item) => item.status);
  processing.value = declaration.value.filter((item) => item.status === false);
  // methods
  // lifecycle
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  .declaration-wrapper
    .declaration-header
      display flex
      justify-content space-between
      align-items center
      .btn
        width 110px
        border-radius 6px
    .declaration-content
      .btn
        border-radius 6px
      .card-time
        margin-top 30px
</style>
