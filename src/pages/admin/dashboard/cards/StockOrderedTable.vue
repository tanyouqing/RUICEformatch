<script setup>
defineProps({
  top10_list: Array,
})
</script>

<template>
  <ElTable :data="top10_list" stripe style="width: 100%">
    <ElTableColumn prop="ticker" label="股票" width="150" />
    <ElTableColumn prop="market_cap" label="市值" width="150" />
    <ElTableColumn prop="growth_amount" label="增长量" width="150" />
    <ElTableColumn prop="growth_rate" label="增长率" width="150" />
  </ElTable>
</template>

<style scoped></style>
