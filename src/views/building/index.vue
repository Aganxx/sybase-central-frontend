<template lang="pug">
.building-wrapper
  .building-header.header 
    a-typography-title.title(:heading="3") 住宅信息
  .building-content 
    a-typography-title.title(:heading="6") 小区基本信息
    .community-info
      .community-info-content
        .info-content-item(v-for="item in communityInfo")
          .info-label {{ item.label }}
          .info-value {{ item.value }}
    .building-info 
      a-typography-title.title(:heading="6") 房屋基本信息
      a-table(:data="building" :pagination="false" :hoverable="false")
        template(#columns)
          a-table-column(v-for="column in columns" :title="column.title" :data-index="column.dataIndex")
          a-table-column
            template(#cell="{record}")
              .operation(@click="handleClick(record)") 更多操作
</template>
<script setup name="Building" lang="ts">
  import { ref } from 'vue';
  import { useUserStore } from '@/store';
  import { storeToRefs } from 'pinia';
  // data
  const { community, building, isAdmin, role } = storeToRefs(useUserStore());
  const communityInfo = ref();
  const buildingInfo = ref();
  type Community = keyof typeof community.value;
  communityInfo.value = Object.keys(community.value)
    .map((key) => {
      return {
        label: `${key}:`,
        value: community.value[key as Community],
      };
    })
    .filter((item) => item.label !== '_id:');
  let columns = Object.keys(building.value[0]).map((key) => {
    return {
      title: key.charAt(0).toUpperCase() + key.slice(1),
      dataIndex: key,
    };
  });
  columns = columns.filter((item) => item.title !== '_id');
  columns = columns.filter((item) => item.title !== 'Community_id');
  columns = columns.filter((item) => item.title !== 'User_id');
  buildingInfo.value = {
    ...building.value,
  };
  // methods
  const handleClick = (record: any) => {};
  // lifecycle
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  .community-info
    margin-top 30px
    padding 16px 24px 24px
    border-radius 10px
    background rgba(247, 248, 253, 1)
    .community-info-content
      display grid
      grid-template-columns 1fr 1fr
      .info-content-item
        position relative
        display flex
        padding 6px 0
        font-size 14px
        line-height 19px
        .info-label
          min-width 78px
          margin-right 8px
          opacity .6
  .building-info
    margin-top 30px
</style>
