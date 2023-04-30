<template lang="pug">
.home-wrapper
  .home-header.header
    a-typography-title.title(:heading="3") 欢迎回来
  .home-content 
    a-grid(:cols="2" :colGap="24" :rowGap="30" class="grid-demo-grid" :collapsed="collapsed")
      a-grid-item(v-for="item of cardData")
        a-card.card
          template(#title)
            .card-title {{ item.title }}
          template(#extra)
            a-link(:href="item.link") 查看详情
          .card-content {{ item.content }}
</template>
<script setup name="Home" lang="ts">
  // data
  const cardData = [
    {
      title: '住宅信息',
      content: '随时查看你的房屋信息。',
      link: '/dashboard/building',
    },
    {
      title: '缴费记录',
      content: '你的缴费小助手，再也不怕忘记费用缴纳。',
      link: '/dashboard/payment',
    },
    {
      title: '我的反馈',
      content: '查看反馈、投诉与建议申请进度。',
      link: '/dashboard/complaint',
    },
    {
      title: '设施维修',
      content: '关心小区基础设施，建设美丽社区。房屋损坏维修同样可申请。',
      link: '/dashboard/declaration',
    },
  ];
  // methods
  // lifecycle
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  .home-wrapper
    .home-content
      margin-top 30px
</style>
