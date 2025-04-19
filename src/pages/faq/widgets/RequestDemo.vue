<template>
  <VaCard class="mb-5 pr-4 flex justify-between">
    <div>
      <VaCardContent>
        <h2 class="va-h5">Got questions?</h2>
        <p class="text-base leading-5">Request a free demo to have all your questions answered by an expert.</p>
      </VaCardContent>
      <VaCardActions align="left">
        <!--        <VaButton @click="showModal = !showModal">Request a demo</VaButton>-->
        <VaButton @click="showQ"></VaButton>
      </VaCardActions>
    </div>
    <img alt="Send a message" src="../request-demo.svg" />
  </VaCard>
  <VaModal v-model="showModal" :before-ok="submit" close-button ok-text="Request demo" size="small">
    <VaForm ref="form" @submit.prevent="submit">
      <h3 class="va-h3">Request free demo</h3>
      <p class="text-base mb-4 leading-5">
        Claim your spot now and ignite innovation with our exceptional software solution! 🔥
      </p>
      <VaInput
        v-model="email"
        :rules="[(v) => !!v || 'Email field is required', (v) => /.+@.+\..+/.test(v) || 'Email should be valid']"
        class="mb-4"
        label="Email"
        type="email"
      />
    </VaForm>
  </VaModal>
</template>

<script setup>
import { ref } from 'vue'

import { useForm, useToast } from 'vuestic-ui'
import { useRouter } from 'vue-router'

const showModal = ref(false)
const email = ref('')
const { validate } = useForm('form')
const { init } = useToast()
const router = useRouter()
function showQ() {
  // 注意：Vue Router 的 this.$router 在 setup 中不可用
  // 你需要使用 createRouter 或 useRouter 钩子来获取 router 实例
  // 假设你使用了 Vue Router 4
  router.push('src/pages/faq/questions.vue')
}
const submit = async () => {
  if (!validate()) {
    return
  }
  init({
    title: 'Demo Request Submitted!',
    message: 'An expert will get in touch soon',
    color: 'success',
  })
  showModal.value = false
}
</script>
