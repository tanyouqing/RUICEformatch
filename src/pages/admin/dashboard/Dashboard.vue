<script lang="ts" setup>
// import RevenueUpdates from './cards/RevenueReport.vue'
// import ProjectTable from './cards/ProjectTable.vue'
// import RevenueByLocationMap from './cards/RevenueByLocationMap.vue'
// import DataSection from './DataSection.vue'
import HomeMain from './cards/HomeMain.vue'
// import MonthlyEarnings from './cards/MonthlyEarnings.vue'
// import RegionRevenue from './cards/RegionRevenue.vue'
// import Timeline from './cards/Timeline.vue'
import { onMounted, reactive } from 'vue'
import httpInstance from '../../../http'
// import Map from '../../../../../src/components/va-charts/chart-types/Map.vue'
import { VaCard } from 'vuestic-ui'
import HomeLeft from './cards/HomeLeft.vue'

const info = reactive({
  news: [],
  formed_news: '',
})
onMounted(async () => {
  console.log('Home page mounted')
  info.news = (await httpInstance.get('/nlp/news')).data
  console.log('info.news: ', info.news)
})
</script>

<template>
  <h1 class="page-title font-bold"></h1>
  <section class="flex flex-col gap-4">
    <div class="flex flex-col sm:flex-row gap-2">
      <HomeLeft class="w-full sm:w-[30%]" />
      <div class="flex flex-col gap-4 w-full sm:w-[70%]">
        <HomeMain class="h-full" />
      </div>
    </div>
    <div class="flex flex-col md:flex-row gap-52">
      <VaCard class="w-full sm:w-[100%]" style="height: 250px; overflow-y: auto">
        <VaCardTitle class="flex items-center justify-between">
          <h1 class="card-title text-secondary font-bold uppercase">今日资讯</h1>
        </VaCardTitle>
        <VaCardContent class="flex-1 flex overflow-hidden">
          <ElCard class="w-full md:w-4/5" style="margin-top: 10px">
            <template #header>
              <p>资讯</p>
            </template>
            <ElRow v-for="(item, index) in info.news"
                   :key="index"
                   style="margin-top: 20px">
              {{ index + 1 + '. ' + item }}<br />
            </ElRow>
          </ElCard>
        </VaCardContent>
      </VaCard>
    </div>
  </section>
</template>
