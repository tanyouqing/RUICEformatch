<template>
  <div>
    <h1 class="page-title">How can we help you?</h1>
    <Categories />
    <Questions />
    <div class="center-button">
      <button class="open-modal-button" @click="toggleModal">AI助手</button>
    </div>

    <div v-if="isModalVisible" class="modal-overlay">
      <div class="modal">
        <button class="close-modal-button" @click="toggleModal">X</button>
        <Kimi />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Categories from './widgets/Categories.vue'
import Questions from './widgets/Questions.vue'
import Kimi from './questions.vue'

const isModalVisible = ref(false)

function toggleModal() {
  isModalVisible.value = !isModalVisible.value
}
</script>

<style scoped>
.page-title {
  font-size: 2rem;
  margin-bottom: 20px;
}

.center-button {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  bottom: 20px;
  width: 100%;
}

.open-modal-button {
  padding: 12px 20px;
  background-color: #009aff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}

.open-modal-button:hover {
  /*  background-color: #45a049;*/
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal {
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  width: 80%;
  max-width: 600px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  position: relative;
}

.close-modal-button {
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: transparent;
  color: black;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
}

.close-modal-button:hover {
  color: #888;
}
</style>
