<template>
  <VaNavbar class="app-layout-navbar py-2 px-0">
    <template #left>
      <img src="../../photo/ruice.jpg" width="100px" height="50px" class="ruicetu" />
      <div class="ruice">睿测股票预测推荐平台</div>
      <img src="../../photo/ruice.jpg" width="100px" height="50px" class="you2" />
    </template>
  </VaNavbar>
</template>

<script setup lang="ts">
defineProps({
  isMobile: { type: Boolean, default: false },
})
</script>

<style lang="scss" scoped>
.ruicetu {
  font-size: 35px;
  position: absolute;
  left: 10px;
  top: 15px;
  font-family: 'Pacifico', cursive;
  font-weight: 700;
}
.ruice {
  font-size: 35px;
  position: absolute;
  left: 120px;
  top: 25px;
  font-family: 'Pacifico', cursive;
  font-weight: 700;
}
.app-layout-navbar {
  height: 70px;
}

.you2 {
  font-size: 30px;
  position: absolute;
  left: 1580px;
  top: 15px;
  font-family: 'Lobster', cursive;
  font-weight: 700;
}
</style>
