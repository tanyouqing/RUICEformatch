<script lang="ts" setup>
import { nextTick, onMounted, reactive } from 'vue'
import { useRoute } from 'vue-router'
import httpInstance from '../../../http'
import { render_Kline } from '../../../data/charts/renderChart'
const route = useRoute()
let stock_info = reactive({})
const formed_indices = reactive({
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
  stock_info = (await httpInstance.get(`${route.query.ticker}`)).data
  console.log('stock_info: ', stock_info)
  for (const key in stock_info) {
    if (key === 'daily_data') {
      continue
    }
    formed_indices.list.push({
      index_name: key,
      value: key == 'market_cap' ? (stock_info[key] / 1e9).toFixed(3) : Number(stock_info[key].toFixed(3)),
    })
  }
  await nextTick(() => {
    const dom = document.getElementById('k_chart')

    render_Kline(dom, stock_info.daily_data, `${route.query.ticker}`)
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
