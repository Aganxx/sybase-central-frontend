<template lang="pug">
.management-wrapper 
  .management-header.header 
    a-typography-title.title(:heading="3") 用户管理
    a-button.btn(size="large" type="primary" @click="openModal") 添加成员
  .management-content 
    .admins-list
      a-typography-title.title(:heading="6") 管理员列表
      a-table(:data="adminsList" :pagination="false" :hoverable="false")
        template(#columns)
          a-table-column(v-for="column in columns" :title="column.title" :data-index="column.dataIndex")
    .users-list
      a-typography-title.title(:heading="6") 用户列表
      a-table(:data="usersList" :pagination="false" :hoverable="false")
        template(#columns)
          a-table-column(v-for="column in columns" :title="column.title" :data-index="column.dataIndex")
          a-table-column(v-if="isAdmin")
            template(#cell="{record}")
              .operation(@click="handleClick(record)") 删除用户
ManagementModal(ref="showManagementModal")
DeleteModal(ref="showDeleteModal" :user_id="user_id")
</template>
<script setup name="Management" lang="ts">
  import { useUserStore } from '@/store';
  import { storeToRefs } from 'pinia';
  import { ref, computed } from 'vue';
  import ManagementModal from './managementModal.vue';
  import DeleteModal from './deleteModal.vue';
  // data
  const showManagementModal = ref<InstanceType<typeof ManagementModal>>();
  const showDeleteModal = ref<InstanceType<typeof DeleteModal>>();
  const { usersList, adminsList } = storeToRefs(useUserStore());
  const user_id = ref('');
  const isAdmin = computed(
    () => localStorage.getItem('currentRole') === 'admin'
  );
  const columns = [
    { title: '用户ID', dataIndex: '_id' },
    { title: '用户名', dataIndex: 'username' },
    { title: '创建时间', dataIndex: 'created_at' },
  ];
  // methods
  const openModal = () => {
    if (showManagementModal.value) showManagementModal.value.show();
  };
  const handleClick = (record: any) => {
    user_id.value = record._id;
    showDeleteModal.value && showDeleteModal.value.show();
  };
  // lifecycle
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  .management-wrapper
    .management-header
      display flex
      justify-content space-between
      align-items center
      .btn
        border-radius 6px
        width 110px
    .operation
      color rgba(255, 80, 130, 1)
      cursor pointer
</style>
