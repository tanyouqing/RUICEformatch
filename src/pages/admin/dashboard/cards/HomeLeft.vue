<script lang="ts" setup>
import { useRouter } from 'vue-router'
import { VaCard } from 'vuestic-ui'
import { computed, ref } from 'vue'
import { store } from '../../../../stores/store'

// 修改前：selectedStock 被定义为 ref(null)，导致索引类型错误
// 修改后：显式定义 selectedStock 的类型为 string | null
const selectedStock = ref<string | null>(null)

// 修改前：直接使用 selectedStock.value 作为索引，可能存在 null 值
// 修改后：使用可选链操作符避免直接访问可能为 null 的值
const wholeName = computed(() => store.stockMap[selectedStock.value ?? ''])

const stockList = computed(() => Object.keys(store.stockMap))

const router = useRouter()

const toBackTest = () => {
  router.push({
    path: '/auth/login',
  })
}

const toViewStock = () => {
  if (selectedStock.value) {
    const rt = router.resolve({
      name: 'stock',
      query: {
        ticker: selectedStock.value,
      },
    })
    window.open(rt.href, '_blank')
  }
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
            <!-- 修改前：直接将 stock 赋值给 selectedStock，类型不匹配 -->
            <!-- 修改后：显式转换类型 -->
            <ElLink @click="() => (selectedStock = stock as string)"> {{ stock }}</ElLink>
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
