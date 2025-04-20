<script lang="ts" setup>
import { useRouter } from 'vue-router'
import { VaCard } from 'vuestic-ui'
import { computed, ref } from 'vue'
import { store } from '../../../../stores/store'

const selectedStock = ref(null)
const stockList = computed(() => Object.keys(store.stockMap))
// 获取登陆数据
const wholeName = computed(() => store.stockMap[selectedStock.value])
//跳转登录页
const router = useRouter()
const toBackTest = () => {
  router.push({
    path: '/auth/login',
  })
}
const toViewStock = () => {
  const rt = router.resolve({
    name: 'stock',
    query: {
      ticker: selectedStock.value,
    },
  })
  window.open(rt.href, '_blank')
}
</script>

<template>
  <VaCard class="flex flex-col">
    <VaCardTitle class="flex items-start justify-between">
      <h1 class="card-title text-secondary font-bold uppercase">列表</h1>
      <div class="flex gap-1"></div>
    </VaCardTitle>
    <VaCardContent class="flex flex-col-reverse md:flex-row  justify-between gap-5 h-full">
      <div>
        <div style="height: 10px"></div>
        <ElRow>
          <ElCol class="row" :span="4" style="height: 10px">
            <ElButton type="success" @click="toBackTest">返回</ElButton>
          </ElCol>
        </ElRow>
        <div style="height: 20px"></div>
        <!-- 显示一些状态 -->
        <div class="card-header">
          <h3>股票列表</h3>
        </div>
        <div style="height: 20px"></div>
        <ElSelect v-model="selectedStock" filterable clearable placeholder="请选择" style="width: 175px">
          <ElOption v-for="item in stockList" :key="item" :label="item" :value="item" />
        </ElSelect>
        <ElButton @click="toViewStock">查询</ElButton>
        <div style="height: 20px"></div>
        <p>{{ wholeName }}</p>

        <ElCard shadow="hover" class="card" style="height: 300px; overflow: auto">
          <ElRow
            v-for="(stock, index) in stockList"
            :key="index"
            style="justify-content: center; margin-bottom: 10px"
          >
            <ElLink @click="() => (selectedStock = stock)"> {{ stock }}</ElLink>
          </ElRow>
        </ElCard>
      </div>
    </VaCardContent>
  </VaCard>
</template>

<style scoped>
.card-header {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
