<template>
  <VaInput v-model="searchValue" class="mb-4" placeholder="Search">
    <template #appendInner>
      <VaIcon color="secondary" name="mso-search" />
    </template>
  </VaInput>
  <section v-if="filteredCategories.length" class="grid grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-5">
    <template v-for="category in filteredCategories" :key="category.id">
      <VaCard class="col-span-3 md:col-span-1 min-h-[146px]" href="#">
        <VaCardContent class="leading-5 text-sm">
          <VaIcon :name="`mso-${category.icon}`" class="font-light mb-2" color="primary" size="2rem" />
          <h2 class="text-primary mb-2 text-primary text-lg leading-7 font-bold">{{ category.name }}</h2>
          <p>{{ category.intro }}</p>
        </VaCardContent>
      </VaCard>
    </template>
  </section>
  <VaAlert v-else class="mb-4 leading-5" color="info" outline>
    No matches found. Try refining your search or browse through the categories to find the help you need.
  </VaAlert>
  <button class="btn" @click="shuffleCategories" style="margin-bottom: 1rem;">换一批</button>

</template>

<script lang="ts" setup>
import categories from '../data/popularCategories.json'
import { ref, computed, onMounted } from 'vue'

const searchValue = ref('')
const allCategories = ref(categories)
const displayedCategories = ref([])

// 随机选取九个术语显示
onMounted(() => {
  shuffleCategories()
})

const shuffleCategories = () => {
  const shuffled = allCategories.value.sort(() => Math.random() - 0.5).slice(0, 9)
  displayedCategories.value = shuffled
}

// 计算属性，根据搜索值过滤所有术语
const filteredCategories = computed(() => {
  const value = searchValue.value.trim().toLowerCase()
  if (value.length === 0) {
    return displayedCategories.value
  }
  return allCategories.value.filter((category) => {
    return category.intro.toLowerCase().includes(value) || category.name.toLowerCase().includes(value)
  })
})
</script>

<style>
.btn {
  display: block;
  margin: 1rem auto;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: 500;
  line-height: 1.5;
  color: #fff;
  background-color: #007bff;
  border: 1px solid #007bff;
  border-radius: 0.25rem;
  cursor: pointer;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out;
}

.btn:hover {
  color: #fff;
  background-color: #0056b3;
  border-color: #0056b3;
}

.btn:focus {
  outline: none;
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
}

.btn:active {
  background-color: #0056b3;
  border-color: #0056b3;
}
</style>
