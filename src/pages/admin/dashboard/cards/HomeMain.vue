<template>
  <VaCard>
    <VaCardTitle class="pb-0!">
      <h1 class="card-title text-secondary font-bold uppercase">股票</h1>
    </VaCardTitle>
    <VaCardContent class="flex flex-row gap-1">
      <div class="left-part">
        <ElTabs type="border-card" style="width: 700px">
          <ElTabPane label="市值TOP10">
            <StockOrderedTable :top10List="top10List.cap" />
          </ElTabPane>
          <ElTabPane label="增长量TOP10">
            <StockOrderedTable :top10List="top10List.amt" />
          </ElTabPane>
          <ElTabPane label="增长率TOP10">
            <StockOrderedTable :top10List="top10List.rate" />
          </ElTabPane>
        </ElTabs>
        <div style="margin-top: 50px">
          <ElInput
            id="txt-input"
            v-model="text_sentiment.input"
            placeholder="请输入"
            style="max-width: 400px"
            type="textarea"
            autosize
          >
          </ElInput>
          <ElButton @click="analyze_sentiment">分析</ElButton>
          <div style="margin-top: 30px">结果: {{ text_sentiment.result }}</div>
        </div>
      </div>
    </VaCardContent>
  </VaCard>
</template>
<script setup lang="ts">
import { onMounted, reactive } from 'vue'
import StockOrderedTable from '../cards/StockOrderedTable.vue'
import { ElTabs, ElTabPane } from 'element-plus'
import httpInstance from '../../../../http'
// let top10_cap_list = reactive({})
// let top10_growth_rate_list = reactive({})
// let top10_growth_amt_list = reactive({})
const top10List = reactive({
  cap: [],
  rate: [],
  amt: [],
})
const text_sentiment = reactive({
  input: '',
  result: '',
})
const analyze_sentiment = async () => {
  console.log('text_sentiment. start')
  const res = (await httpInstance.post('/nlp/sentiment_analyse', { text: text_sentiment.input })).data
  console.log('text_sentiment. res:', res)
  text_sentiment.result = res
}
onMounted(async () => {
  const stockListData = (await httpInstance.get('')).data
  console.log('data:', stockListData)
  const filer = (item) => {
    return {
      ticker: item.ticker,
      market_cap: (item.market_cap / 1e9).toFixed(3),
      growth_amount: item.growth_amount.toFixed(2),
      growth_rate: (item.growth_rate * 100).toFixed(2) + '%',
    }
  }

  top10List.cap = stockListData.top_10_market_cap.map(filer)
  top10List.rate = stockListData.top_10_growth_rate.map(filer)
  top10List.amt = stockListData.top_10_growth_amount.map(filer)
  //process
})
</script>
<style scoped>
#txt-input {
  margin: 10px;
}
.left-part {
  flex: 7;
  padding: 20px;
}
.right-part {
  flex: 3;
  padding: 20px;
  background-color: #f0ffff;
}
</style>
