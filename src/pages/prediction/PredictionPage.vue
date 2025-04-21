<template>
  <div v-if="divislive1" class="background1">
    <span class="page-title">股票预测</span>
    <ElCard class="card1-1" shadow="always">
      <ElTag class="select" effect="dark" size="large" type="success">请选择一支股票</ElTag>
      <ElSelect v-model="value" class="selectk" filterable placeholder="请选择" :class="{ 'is-invalid': gpxzError }">
        <ElOption v-for="item in gpxz" :key="item.value" :label="item.label" :value="item.value"> </ElOption>
      </ElSelect>
      <span v-if="gpxzError" class="gpxz-error">{{ gpxzError }}</span>
      <ElTag class="ptime" effect="dark" size="large" type="danger">预测时间选择</ElTag>
      <ElInput
        v-model="ptimevalue"
        class="ptimek"
        placeholder="请输入最多60天"
        clearable
        :class="{ 'is-invalid': ptimeError }"
      >
      </ElInput>
      <span v-if="ptimeError" class="ptime-error">{{ ptimeError }}</span>
      <ElTag class="model" effect="dark" size="large" type="warning">模型选择</ElTag>
      <ElSelect
        v-model="modelvalue"
        class="modelk"
        clearable
        placeholder="请选择"
        :class="{ 'is-invalid': modelError }"
      >
        <ElOption v-for="item in model" :key="item.value" :label="item.label" :value="item.value"> </ElOption>
      </ElSelect>
      <span v-if="modelError" class="model-error">{{ modelError }}</span>
      <ElTag class="bdlfx" effect="dark" size="large" type="pink">波动率分析</ElTag>
      <ElRadio v-model="radio" class="bdlfxk1" label="1">是</ElRadio>
      <ElRadio v-model="radio" class="bdlfxk2" label="2">否</ElRadio>
      <ElButton class="go" color="#FF0191" round @click="prediction1">开始预测</ElButton>
      <ElButton class="change" color="#FB9999" round @click="change1">商务版</ElButton>
    </ElCard>
    <ElCard class="card2-1" shadow="always">
      <img v-if="islive" src="../prediction/empty(1).png" width="400px" height="320px" class="empty1" />
      <div class="back">
        <div v-show="islive2" id="yuce" ref="charts" class="kuang"></div>
      </div>
    </ElCard>
  </div>
  <div v-if="divislive2" class="background2">
    <span class="page-title">股票预测</span>
    <ElCard class="card1-2" shadow="always">
      <ElTag class="select" effect="dark" size="large" type="success">请选择一支股票</ElTag>
      <ElSelect v-model="value" class="selectk" filterable placeholder="请选择" :class="{ 'is-invalid': gpxzError }">
        <ElOption v-for="item in gpxz" :key="item.value" :label="item.label" :value="item.value"> </ElOption>
      </ElSelect>
      <span v-if="gpxzError" class="gpxz-error">{{ gpxzError }}</span>
      <ElTag class="ptime" effect="dark" size="large" type="danger">预测时间选择</ElTag>
      <ElInput
        v-model="ptimevalue"
        class="ptimek"
        placeholder="请输入最多60天"
        clearable
        :class="{ 'is-invalid': ptimeError }"
      >
      </ElInput>
      <span v-if="ptimeError" class="ptime-error">{{ ptimeError }}</span>
      <ElTag class="model" effect="dark" size="large" type="warning">模型选择</ElTag>
      <ElSelect
        v-model="modelvalue"
        class="modelk"
        clearable
        placeholder="请选择"
        :class="{ 'is-invalid': modelError }"
      >
        <ElOption v-for="item in model" :key="item.value" :label="item.label" :value="item.value"> </ElOption>
      </ElSelect>
      <span v-if="modelError" class="model-error">{{ modelError }}</span>
      <ElTag class="bdlfx" effect="dark" size="large" type="dark">波动率分析</ElTag>
      <ElRadio v-model="radio" class="bdlfxk1" label="1">是</ElRadio>
      <ElRadio v-model="radio" class="bdlfxk2" label="2">否</ElRadio>
      <ElButton class="go" color="#6495ed" round @click="prediction1">开始预测</ElButton>
      <!-- <ElButton class="change" color="#3F5991" round @click="change2">Kitty版</ElButton> -->
    </ElCard>
    <ElCard class="card2-2" shadow="always">
      <img v-if="islive" src="../prediction/empty.png" width="600px" height="420px" class="empty2" />
      <div class="back">
        <div v-show="islive2" id="yuce" ref="charts" class="kuang"></div>
      </div>
    </ElCard>
  </div>
</template>

<script lang="ts" setup>
import * as echarts from 'echarts'
import { ElButton, ElSelect, ElOption, ElInput, ElRadio } from 'element-plus'
// import { prediction } from '../../api/prediction'
import { onMounted, ref } from 'vue'
// 定义接口，为项目类型添加显式类型定义
interface StockOption {
  value: string
  label: string
}

interface PredictionResult {
  close_price: number[]
  volatility: number[]
}
const gpxz = ref<StockOption[]>([
  {
    value: 'AAPL',
    label: '苹果公司（Apple Inc.）',
  },
  {
    value: 'MSFT',
    label: '微软（Microsoft）',
  },
  {
    value: 'AMZN',
    label: '亚马逊（Amazon）',
  },
  {
    value: 'GOOGL',
    label: '谷歌（Alphabet Inc.，原谷歌）',
  },
  {
    value: 'GOOG',
    label: '谷歌（Alphabet Inc.，原谷歌）',
  },
  {
    value: 'META',
    label: '元宇宙（Meta，原Facebook）',
  },
  {
    value: 'BRK-A',
    label: '伯克希尔哈撒韦（Berkshire Hathaway A类股）',
  },
  {
    value: 'BRK-B',
    label: '伯克希尔哈撒韦（Berkshire Hathaway B类股）',
  },
  {
    value: 'JNJ',
    label: '强生（Johnson & Johnson）',
  },
  {
    value: 'TSLA',
    label: '特斯拉（Tesla）',
  },
  {
    value: 'V',
    label: '维萨（Visa）',
  },
  {
    value: 'WMT',
    label: '沃尔玛（Walmart）',
  },
  {
    value: 'JPM',
    label: '摩根大通（JPMorgan Chase）',
  },
  {
    value: 'MA',
    label: '万事达卡（Mastercard）',
  },
  {
    value: 'PG',
    label: '宝洁（Procter & Gamble）',
  },
  {
    value: 'NVDA',
    label: '英伟达（NVIDIA）',
  },
  {
    value: 'HD',
    label: '家得宝（The Home Depot）',
  },
  {
    value: 'DIS',
    label: '迪士尼（Disney）',
  },
  {
    value: 'UNH',
    label: '联合健康集团（UnitedHealth Group）',
  },
  {
    value: 'PYPL',
    label: '贝宝（PayPal）',
  },
  {
    value: 'BAC',
    label: '美国银行（Bank of America）',
  },
  {
    value: 'INTC',
    label: '英特尔（Intel）',
  },
  {
    value: 'CMCSA',
    label: '康卡斯特（Comcast）',
  },
  {
    value: 'VZ',
    label: '威瑞森（Verizon）',
  },
  {
    value: 'NFLX',
    label: '奈飞（Netflix）',
  },
  {
    value: 'PFE',
    label: '辉瑞（Pfizer）',
  },
  {
    value: 'ADBE',
    label: '奥多比（Adobe）',
  },
  {
    value: 'T',
    label: '美国电话电报公司（AT&T）',
  },
  {
    value: 'PEP',
    label: '百事可乐（PepsiCo）',
  },
  {
    value: 'CRM',
    label: '赛富时（Salesforce）',
  },
  {
    value: 'ABT',
    label: '雅培（Abbott Laboratories）',
  },
  {
    value: 'CSCO',
    label: '思科（Cisco）',
  },
  {
    value: 'ABBV',
    label: '艾伯维（AbbVie）',
  },
  {
    value: 'XOM',
    label: '埃克森美孚（Exxon Mobil）',
  },
  {
    value: 'AVGO',
    label: '博通（Broadcom）',
  },
  {
    value: 'KO',
    label: '可口可乐（Coca-Cola）',
  },
  {
    value: 'CMG',
    label: '墨式烧烤（Chipotle Mexican Grill）',
  },
  {
    value: 'AMD',
    label: '超微半导体（Advanced Micro Devices）',
  },
  {
    value: 'DUK',
    label: '杜克能源（Duke Energy）',
  },
  {
    value: 'QCOM',
    label: '高通（Qualcomm）',
  },
  {
    value: 'TMO',
    label: '赛默飞世尔科技（Thermo Fisher Scientific）',
  },
  {
    value: 'COST',
    label: '好市多（Costco）',
  },
  {
    value: 'LLY',
    label: '礼来（Eli Lilly and Company）',
  },
  {
    value: 'NEE',
    label: 'NextEra Energy',
  },
  {
    value: 'MRK',
    label: '默克（Merck & Co., Inc.）',
  },
  {
    value: 'MDT',
    label: '美敦力（Medtronic）',
  },
  {
    value: 'TMUS',
    label: 'T-Mobile US',
  },
  {
    value: 'ORCL',
    label: '甲骨文（Oracle）',
  },
  {
    value: 'ACN',
    label: '埃森哲（Accenture）',
  },
  {
    value: 'NKE',
    label: '耐克（Nike）',
  },
  {
    value: 'CL',
    label: '高露洁棕榄（Colgate-Palmolive）',
  },
])
const value = ref<string>('') /* 记录股票选择 */
//记录div是否存活

const divislive1 = ref<boolean>(false)

const divislive2 = ref<boolean>(true)
// 记录预测时间
const ptimevalue = ref<string>('')
// 模型数据
const model = ref<StockOption[]>([
  {
    value: 'XGBoost',
    label: 'XGBoost',
  },
  {
    value: 'lightGBM',
    label: 'lightGBM',
  },
  {
    value: 'ARIMA',
    label: 'ARIMA',
  },
])
// 记录模型选择
const modelvalue = ref<string>('')
// 波动率分析选择
const radio = ref<string>('1')

// 预测结果数据
const predictionres = ref<PredictionResult>({
  close_price: [],
  volatility: [],
})
// 预测相关信息列表
// const predictionlist = ref({
//   name: '',
//   time: '',
//   typename: '',
//   var: '',
// })
//
// 无数据图表是否存活
const islive = ref<boolean>(true)
// 预测的图标是否显示
const islive2 = ref<boolean>(false)
// 股票选择框错误信息
const gpxzError = ref<string>('')
// 预测时间框错误信息
const ptimeError = ref<string>('')
// 模型选择框错误信息
const modelError = ref<string>('')
//切换为商务版
const change1 = () => {
  divislive1.value = false
  divislive2.value = true
  islive.value = true
}
//切换为Kitty版
// const change2 = () => {
//   divislive2.value = false
//   divislive1.value = true
//   islive.value = true
// }
// 验证表单的方法
const validateForm = () => {
  // 清空之前可能存在的错误信息
  gpxzError.value = ''
  ptimeError.value = ''
  modelError.value = ''

  // 验证股票选择框
  if (!value.value) {
    gpxzError.value = '请选择一支股票'
  }

  // 验证预测时间框
  if (!ptimevalue.value) {
    ptimeError.value = '请输入预测时间'
  } else {
    const ptimeNum = parseFloat(ptimevalue.value)
    if (Number.isInteger(ptimeNum) === false) {
      ptimeError.value = '预测时间必须是整数'
    } else if (ptimeNum <= 0) {
      ptimeError.value = '预测时间不可小于1天'
    } else if (ptimeNum > 60) {
      ptimeError.value = '预测时间不可大于60天'
    }
  }
  // 验证模型选择框
  if (!modelvalue.value) {
    modelError.value = '请选择模型'
  }

  // 返回验证结果
  return !gpxzError.value && !ptimeError.value && !modelError.value
}
const prediction1 = async () => {
  if (validateForm()) {
    // 构造请求数据
    const requestData = {
      ticker: value.value, // 股票代码或名称
      forecast_days: parseInt(ptimevalue.value), // 预测天数（确保是整数）
      model_type: modelvalue.value, // 模型类型
      var: radio.value, // 是否预测波动率
    }

    // 调用 Flask 后端接口
    const response = await fetch('http://47.239.17.192:80/forecast', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData),
    })

    // 检查响应状态
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const result = await response.json()

    console.log(2)
    predictionres.value.close_price = result[0]['close_price']
    predictionres.value.volatility = result[1]['volatility']
    predictionres.value.volatility[0] = 0
    // 初始化其他逻辑
    initdiv()
    islive.value = false
    islive2.value = true
  }
}
const initdiv = () => {
  const colors = ['#f56c6c', '#32CD32']
  const obj = echarts.init(document.getElementById('yuce'))

  // 修正此处，使用ptimevalue.value获取预测时间来生成xData
  const xData = []
  const ptimeNum = parseInt(ptimevalue.value)
  for (let i = 0; i < ptimeNum; i++) {
    xData.push(i)
  }

  // 修正此处，先判断predictionres.value.close_price是否为空数组，再进行赋值操作
  let minValue, maxValue
  if (predictionres.value.close_price.length > 0) {
    minValue = predictionres.value.close_price[0]
    maxValue = predictionres.value.close_price[0]
  } else {
    minValue = null
    maxValue = null
  }

  for (const value of predictionres.value.close_price) {
    if (value !== null) {
      if (minValue === null || value < minValue) {
        minValue = value
      }
      if (maxValue === null || value > maxValue) {
        maxValue = value
      }
    }
  }

  if (minValue !== null && maxValue !== null) {
    const chazhi = maxValue - minValue + 1
    maxValue = maxValue + chazhi
    minValue = minValue - chazhi
  }
  maxValue = parseInt(maxValue?.toString() || '0')
  minValue = parseInt(minValue?.toString() || '0')
  const option = {
    color: colors,
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
      },
    },
    grid: {
      right: '20%',
    },
    toolbox: {
      feature: {
        dataView: { show: true, readOnly: false },
        restore: { show: true },
        saveAsImage: { show: true },
      },
    },
    legend: {
      data: ['股价预测', '波动率'],
    },
    xAxis: [
      {
        type: 'category',
        axisTick: {
          alignWithLabel: true,
        },
        data: xData,
      },
    ],
    yAxis: [
      {
        type: 'value',
        name: '波动率',
        position: 'right',
        alignTicks: true,
        axisLine: {
          show: true,
          lineStyle: {
            color: colors[1],
          },
        },
        axisLabel: {
          formatter: '{value} ',
        },
      },
      {
        type: 'value',
        max: maxValue,
        min: minValue,
        name: '股价预测',
        position: 'left',
        alignTicks: true,
        axisLine: {
          show: true,
          lineStyle: {
            color: colors[0],
          },
        },
        axisLabel: {
          // 原来的formatter可能是"{value}"，修改如下
          formatter: (value: number) => value.toFixed(2),
        },
      },
    ],
    series: [
      {
        name: '股价预测',
        type: 'line',
        yAxisIndex: 1,
        data: predictionres.value.close_price,
      },
      {
        name: '波动率',
        type: 'line',
        yAxisIndex: 0,
        data: predictionres.value.volatility,
      },
    ],
  }

  obj.setOption(option)
}
onMounted(() => {
  initdiv()
})
</script>

<style scoped>
.page-title {
  position: absolute;
  left: 19px;
  top: 125px;
  font-size: 50px;
}
/*背景板的定位*/
.background1 {
  position: absolute;
  width: 1427px;
  height: 905px;
  top: 0px;
  left: 280px;
  background-image: linear-gradient(to bottom, #ffb6c1 40%, pink 70%, #d8bfd8 100%);
}
/*预测选择卡片*/
.card1-1 {
  position: absolute;
  left: 50px;
  top: 200px;
  height: 670px;
  width: 360px;
  /* 设置从顶部到底部的浅紫色线性渐变 */
  background-image: linear-gradient(to bottom, #ffe4e1, #dcd0f0);
}
/*预测结果卡片*/
.card2-1 {
  position: absolute;
  left: 480px;
  top: 200px;
  height: 670px;
  width: 860px;

  background-image: linear-gradient(to bottom, #ffe4e1 20%, #ffb6c1 100%);
}
/*股票选择和股票选择框*/
.select {
  position: absolute;
  left: 70px;
  top: 60px;
  width: 210px;
  height: 35px;
  font-size: math;
}
/*背景板的定位*/
.background2 {
  position: absolute;
  width: 1427px;
  height: 905px;
  top: 0px;
  left: 280px;
  /* 设置从顶部到底部的蓝色系线性渐变，颜色可根据需要微调 */
  /* background-image: linear-gradient(to bottom, #b3d9ff 30%, #add8e6 70%, #b0c4de 100%);*/
}

/*预测选择卡片*/
.card1-2 {
  position: absolute;
  left: 50px;
  top: 200px;
  height: 670px;
  width: 360px;
  /* 设置从顶部到底部的浅蓝色线性渐变，颜色可根据需要微调 */
  /* background-image: linear-gradient(to bottom, #e6f2ff, #b3d9ff);*/
}

/*预测结果卡片*/
.card2-2 {
  position: absolute;
  left: 480px;
  top: 200px;
  height: 670px;
  width: 860px;
  /* 设置从顶部到底部的蓝色系线性渐变，颜色可根据需要微调 */
  /* background-image: linear-gradient(to bottom, #e6f2ff 20%, #6495ed 100%);*/
}
.selectk {
  position: absolute;
  width: 210px;
  left: 70px;
  top: 105px;
}
/*股票选择验证*/
.gpxz-error {
  position: absolute;
  left: 70px;
  top: 136px;
  color: red;
  font-size: 12px;
}
/*预测时间选择*/
.ptime {
  position: absolute;
  left: 70px;
  top: 170px;
  width: 210px;
  height: 35px;
  font-size: math;
}
.ptimek {
  position: absolute;
  left: 70px;
  top: 215px;
  width: 210px;
}
/*预测时间验证*/
.ptime-error {
  position: absolute;
  left: 70px;
  top: 246px;
  color: red;
  font-size: 12px;
}
/*模型选择*/
.model {
  position: absolute;
  left: 70px;
  top: 280px;
  width: 210px;
  height: 35px;
  font-size: math;
}
.modelk {
  position: absolute;
  width: 210px;
  left: 70px;
  top: 325px;
}
/*股票选择验证*/
.model-error {
  position: absolute;
  left: 70px;
  top: 356px;
  color: red;
  font-size: 12px;
}
/*波动率分析选择*/
.bdlfx {
  position: absolute;
  left: 75px;
  top: 390px;
  width: 80px;
  height: 25px;
}
.bdlfxk1 {
  position: absolute;
  left: 180px;
  top: 387px;
}
.bdlfxk2 {
  position: absolute;
  left: 225px;
  top: 387px;
}
/*开始预测按钮*/
.go {
  position: absolute;
  left: 70px;
  top: 455px;
  width: 210px;
  color: white;
}
/*切换按钮*/
.change {
  position: absolute;
  left: 58px;
  top: 520px;
  width: 210px;
  color: white;
}
/*暂无数据图*/
.empty1 {
  position: absolute;
  left: 225px;
  top: 105px;
}
/*暂无数据图*/
.empty2 {
  position: absolute;
  left: 125px;
  top: 155px;
}
/*预测折线图背景板*/
.back {
  position: absolute;
  width: 700px;
  height: 700px;
  top: 60px;
  left: 50px;
}
/*折线图*/
.kuang {
  width: 830px;
  height: 610px;
}
.el-input {
  --el-input-focus-border-color: green;
}
</style>
