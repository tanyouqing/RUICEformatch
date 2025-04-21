<script lang="ts" setup>
import { nextTick, onMounted, reactive } from 'vue'
import { useRoute } from 'vue-router'
import httpInstance from '../../../http'
import { render_Kline } from '../../../data/charts/renderChart'

interface StockInfo {
  current_price: number
  growth_amount: number
  growth_rate: number
  market_cap: number
  pe_ratio: number
  volume: number
  daily_data: any[]
  [key: string]: any // 允许动态属性
}

interface IndexItem {
  index_name: keyof typeof key2text // 严格限制为 key2text 的键
  value: number | string
}

const route = useRoute()

// 初始化时提供所有必填属性的默认值
const stock_info = reactive<StockInfo>({
  current_price: 0,
  growth_amount: 0,
  growth_rate: 0,
  market_cap: 0,
  pe_ratio: 0,
  volume: 0,
  daily_data: [],
})

const formed_indices = reactive<{
  list: IndexItem[]
}>({
  list: [],
})

// 添加类型声明允许字符串索引
const key2text: Record<string, string> = {
  current_price: 'Current Price ( $)',
  growth_amount: 'Growth Amount',
  growth_rate: 'Growth Rate',
  market_cap: 'Market Cap (billion $)',
  pe_ratio: 'P/E Ratio',
  volume: 'Volume',
}

onMounted(async () => {
  console.log('Stock page mounted')

  try {
    const response = await httpInstance.get<StockInfo>(`${route.query.ticker}`)
    Object.assign(stock_info, response.data)

    console.log('stock_info: ', stock_info)

    // 过滤有效键值
    const validKeys = Object.keys(key2text)
    formed_indices.list = Object.entries(stock_info)
      .filter(([key]) => validKeys.includes(key))
      .map(([key, value]) => ({
        index_name: key as keyof typeof key2text,
        value: key === 'market_cap' ? (Number(value) / 1e9).toFixed(3) : Number(value).toFixed(3),
      }))

    await nextTick(() => {
      const dom = document.getElementById('k_chart')
      if (dom && stock_info.daily_data) {
        render_Kline(dom, stock_info.daily_data, `${route.query.ticker}`)
      }
    })
  } catch (error) {
    console.error('Error fetching stock data:', error)
  }
})
</script>

<template>
  <h1 class="page-title font-bold"></h1>
  <section class="flex flex-col gap-4">
    <div id="main">
      <div class="left-part">
        <div id="k_chart" style="height: 600px; width: 1000px"></div>
      </div>
      <div class="right-part">
        <ElDescriptions
          v-if="formed_indices.list.length > 0"
          class="margin-top"
          :column="1"
          direction="horizontal"
          size="large"
          border
          style="margin-top: 10px"
        >
          <ElDescriptionsItem v-for="item in formed_indices.list" :key="item.index_name" align="center">
            <template #label>
              <div class="cell-item" style="width: 130px">
                {{ key2text[item.index_name] || 'Unknown' }}
                <!-- 添加安全兜底 -->
              </div>
            </template>
            {{ item.value }}
          </ElDescriptionsItem>
        </ElDescriptions>
      </div>
    </div>
  </section>
</template>
