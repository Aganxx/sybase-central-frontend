<template>
  <router-view v-slot="{ Component, route }">
    <component
      :is="Component"
      v-if="route.meta.ignoreCache"
      :key="route.fullPath"
    />
    <keep-alive v-else :include="cacheList">
      <component :is="Component" :key="route.fullPath" />
    </keep-alive>
  </router-view>
</template>

<script lang="ts" setup>
  import { computed } from 'vue';
  import { useTabBarStore } from '@/store';

  const tabBarStore = useTabBarStore();

  const cacheList = computed(() => tabBarStore.getCacheList);
</script>

<style scoped lang="less"></style>
