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
  [key: string]: any
}

interface IndexItem {
  index_name: string
  value: number | string
}

const route = useRoute()
const stock_info = reactive<StockInfo>({})
const formed_indices = reactive<{
  list: IndexItem[]
}>({
  list: [],
})

const key2text = {
  current_price: 'Current Price ( $)',
  growth_amount: 'Growth Amount',
  growth_rate: 'Growth Rate',
  market_cap: 'Market Cap (billion $)',
  pe_ratio: 'P/E Ratio',
  volume: 'Volume',
}

onMounted(async () => {
  console.log('Stock page mounted')
  // 修改前：stock_info = (await httpInstance.get(`${route.query.ticker}`)).data
  // 修改后：明确指定类型为 StockInfo
  const response = await httpInstance.get<StockInfo>(`${route.query.ticker}`)
  Object.assign(stock_info, response.data)

  console.log('stock_info: ', stock_info)

  for (const key in stock_info) {
    if (key === 'daily_data') {
      continue
    }
    // 修改前：formed_indices.list.push(...)
    // 修改后：明确指定数组类型
    formed_indices.list.push({
      index_name: key,
      // 修改前：stock_info[key] 可能是未定义属性
      // 修改后：通过接口定义确保属性存在
      value: key === 'market_cap' ? (stock_info.market_cap / 1e9).toFixed(3) : Number(stock_info[key].toFixed(3)),
    })
  }

  await nextTick(() => {
    const dom = document.getElementById('k_chart')
    if (dom) {
      // 修改前：stock_info.daily_data 可能不存在
      // 修改后：通过接口定义确保属性存在
      render_Kline(dom, stock_info.daily_data, `${route.query.ticker}`)
    }
  })
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
          <!-- 修改前：item 可能是 never 类型 -->
          <!-- 修改后：通过接口定义确保 item 有正确类型 -->
          <ElDescriptionsItem
            v-for="item in formed_indices.list"
            :key="item.index_name"
            align="center">
            <template #label>
              <div class="cell-item" style="width: 130px">
                {{ key2text[item.index_name] }}
              </div>
            </template>
            {{ item.value }}
          </ElDescriptionsItem>
        </ElDescriptions>
      </div>
    </div>
  </section>
</template>
