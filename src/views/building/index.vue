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
          a-table-column(v-if="isAdmin")
            template(#cell="{record}")
              .operation(@click="handleClick(record)") 更多操作
BuildingModal(ref="showBuildingModal" :building_id="building_id")
</template>
<script setup name="Building" lang="ts">
  import { ref, computed } from 'vue';
  import { useUserStore } from '@/store';
  import { storeToRefs } from 'pinia';
  import BuildingModal from './buildingModal.vue';

  // data
  const showBuildingModal = ref<InstanceType<typeof BuildingModal>>();
  const { community, building } = storeToRefs(useUserStore());
  const communityInfo = ref();
  const buildingInfo = ref();
  const building_id = ref('');
  const isAdmin = computed(
    () => localStorage.getItem('currentRole') === 'admin'
  );
  type Community = keyof typeof community.value;
  buildingInfo.value = {
    ...building.value,
  };
  // methods
  const handleClick = (record: any) => {
    building_id.value = record._id;
    showBuildingModal.value && showBuildingModal.value.show();
  };
  const getInfoTitle = (key: string) => {
    switch (key) {
      case 'name':
        return '小区名';
      case 'location':
        return '位置';
      case 'area':
        return '占地面积';
      case 'contact':
        return '联系电话';
      case 'building':
        return '楼栋';
      case 'level':
        return '楼层';
      case 'check_in_time':
        return '入住时间';
      case 'state':
        return '是否在售';
      case 'buildingType':
        return '类型';
      case 'username':
        return '住户';
      default:
        return undefined;
    }
  };
  let columns = Object.keys(building.value[0]).map((key) => {
    return {
      title: getInfoTitle(key),
      dataIndex: key,
    };
  });
  columns = columns.filter((item) => item.title !== undefined);
  communityInfo.value = Object.keys(community.value)
    .map((key) => {
      return {
        label: `${getInfoTitle(key)}:`,
        value: community.value[key as Community],
      };
    })
    .filter((item) => item.label !== 'undefined:');
  // lifecycle
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  .community-info
    margin-top 10px
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
    .operation
      color rgb(22, 92, 255)
      cursor pointer
</style>
