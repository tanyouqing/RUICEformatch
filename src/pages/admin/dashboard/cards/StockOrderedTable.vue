<script setup>
defineProps({
  top10List: Array,
  default: () => [],
})
</script>

<template>
  <ElTable :data="top10List" stripe style="width: 100%">
    <ElTableColumn prop="ticker" label="股票" width="150" />
    <ElTableColumn prop="market_cap" label="市值" width="150" />
    <ElTableColumn prop="growth_amount" label="增长量" width="150" />
    <ElTableColumn prop="growth_rate" label="增长率" width="150" />
  </ElTable>
</template>

<style scoped></style>
