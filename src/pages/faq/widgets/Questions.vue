<template>
  <VaCard class="mb-4">
    <VaCardContent>
      <h2 class="va-h5">常见问题</h2>
      <VaAccordion v-model="accordionState" :style="{ '--va-collapse-padding': '1rem 0' }" class="mb-1">
        <VaCollapse header="什么是股票?">
          <article class="max-w-3xl leading-5">
            <p class="mb-2">
              在认识股票投资前，我想先让你用「一杯咖啡」快速了解股票入门知识。
              假设你的朋友想开设一间咖啡馆，资金尚有短缺，而你补足这份缺口，朋友给予相当比例的所有权作为回报。
              当咖啡馆获利，你也能享有一定报酬，这就是股票。
            </p>
            <ul class="list-disc list-inside leading-5 ml-4">
              <li>一句话理解股票：股票就是拥有企业的一部分。</li>
              <li>
                股票是帮公司募得资金的一项工具。
                在公司贩售股票时，会释出一定比例的所有权给股东，持有股票者享有公司的利润同时也需要承担风险，但对于公司运营没有实际的掌控权。
                在了解初步的股票入门知识后，让我们更近一步认识“股票市场”吧！
              </li>
            </ul>
          </article>
        </VaCollapse>

        <VaCollapse header="股票市场是什么">
          <article class="max-w-3xl text-sm">
            <p class="mb-4">股票市场分为“初级市场”以及“次级市场”：</p>
            <p class="mb-4">
              （1） 初级市场（又称为新发行市场，New Issue Market）：资金需求者首次出售有价证券的历程。
              股票IPO（首次公开发行）极为此类型。
            </p>
            <p class="mb-4">（2） 次级市场（After Market）：初级市场发行后的有价证券买卖的交易市场，也就是「股市」。</p>
            <!--            <a class="va-link font-semibold" href="#"
              >Find out more about Secure Keys
              <VaIcon :size="18" name="chevron_right" />
            </a>-->
          </article>
        </VaCollapse>

        <VaCollapse header="购买股票的花费">
          <article class="max-w-3xl text-sm">
            <p class="mb-3">
              台湾股票交易成本包含「股票交易手续费」和「股票交易税」，前者在买卖时都会收取，后者只有在卖出才会收取。
              股票新手请注意：台湾股票的「一张」是1000股，如果股票价格是150元，你购买一张股票就必须准备约15万的股票资金。
            </p>
            <p class="mb-3">股票手续费和交易税的计算公式如下：</p>
            <ul class="list-disc list-inside leading-6 ml-4 mb-4">
              <li>买进股票手续费：股价 x 张数 x 1,000（股） x 0.1425% x 折扣</li>
              <li>卖出股票手续费：股价 x 张数 x 1,000（股） x （0.1425% x 折扣 + 0.3%）</li>
            </ul>
          </article>
        </VaCollapse>

        <VaCollapse :style="{ '--va-background-border': 'transparent' }" header="如何筛选股票">
          <article class="max-w-3xl text-sm">
            <p class="mb-3">我们可以先从两个大方向去厘清：</p>
            <ul class="list-disc list-inside leading-6 ml-4 mb-4">
              <li>
                <span class="font-semibold">由上到下法（Top-Down）：</span
                >先从总体经济开始观察、选择产业，再进一步选择股票。
              </li>
              <li>
                <span class="font-semibold">由下到上法（Bottom-Up）：</span>
                先选择个别股票，再向上观察相关产业，比较股价经济数据、大盘指数风险是否影响投资。
              </li>
              <li>
                <span class="font-semibold">基本面：重视企业营运状况。</span>
                使用基本面分析法较不容易买到昂贵的股票，操作周期较长，可维持更稳定的心态。
              </li>
              <li>
                <span class="font-semibold">技术面：与价格变化相关。</span>
                技术面是透过股价变化观察市场行进方向，变动较大、进出较灵活，但也可能会发生过度交易（如，不愿意停损、停利）等问题。
              </li>
            </ul>
            <p>
              股票新手请注意：以上方式都有一定的风险与优势，需要长期的观察与操作经验，才可更有系统的观察股票的波动惯性与运作方式，并没有一定的最佳方式。
            </p>
          </article>
        </VaCollapse>
      </VaAccordion>
    </VaCardContent>
  </VaCard>
</template>

<script setup>
import { reactive } from 'vue'

const accordionState = reactive([false, true, false, false])
</script>
