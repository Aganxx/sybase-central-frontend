<template lang="pug">
.home-wrapper
  .home-header 
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
    { title: '住宅信息', content: 'nihao', link: '/dashboard/building' },
    { title: '账单管理', content: 'nihao', link: '/dashboard/payment' },
    { title: '住户反馈于投诉', content: 'nihao', link: '/dashboard/complaint' },
    { title: '基础设施维修', content: 'nihao', link: '/dashboard/declaration' },
  ];
  // methods
  // lifecycle
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  .home-wrapper
    .home-header
      padding-bottom 20px
      border-bottom 1px solid rgba(23,12,44,.1)
    .home-content
      margin-top 30px
      .card
        width 460px
        height 200px
        border none
        border-radius 10px
        background rgba(255, 255, 255 .7)
        box-shadow 0 2px 10px #00000026
        :deep(.arco-card-header)
          padding 15px 10px
          margin 0 15px
          height auto
</style>
