<template>
  <VaForm ref="form" @submit.prevent="submit">
    <h1 class="font-semibold text-4xl mb-4">登录</h1>
    <p class="text-base mb-4 leading-5">
      没有账号?
      <RouterLink :to="{ name: 'signup' }" class="font-semibold text-primary">注册</RouterLink>
    </p>
    <VaInput
      v-model="formData.email"
      :rules="[validators.required, validators.email]"
      class="mb-4"
      label="用户名"
      type="email"
    />
    <VaValue v-slot="isPasswordVisible" :default-value="false">
      <VaInput
        v-model="formData.password"
        :rules="[validators.required]"
        :type="isPasswordVisible.value ? 'text' : 'password'"
        class="mb-4"
        label="密码"
        @clickAppendInner.stop="isPasswordVisible.value = !isPasswordVisible.value"
      >
        <template #appendInner>
          <VaIcon
            :name="isPasswordVisible.value ? 'mso-visibility_off' : 'mso-visibility'"
            class="cursor-pointer"
            color="secondary"
          />
        </template>
      </VaInput>
    </VaValue>

    <div class="auth-layout__options flex flex-col sm:flex-row items-start sm:items-center justify-between">
      <VaCheckbox v-model="formData.keepLoggedIn" class="mb-2 sm:mb-0" label="记住密码" />
      <RouterLink :to="{ name: 'recover-password' }" class="mt-2 sm:mt-0 sm:ml-1 font-semibold text-primary">
        忘记密码?
      </RouterLink>
    </div>

    <div class="flex justify-center mt-4">
      <VaButton class="w-full" @click="submit"> 登录</VaButton>
    </div>
  </VaForm>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useForm, useToast } from 'vuestic-ui'
import { validators } from '../../services/utils'
import axios from 'axios'

const { validate } = useForm('form')
const { push } = useRouter()
const { init } = useToast()

const formData = reactive({
  email: '',
  password: '',
  keepLoggedIn: false,
})

// const submit = () => {
//   if (validate()) {
//     init({ message: "You've successfully logged in", color: 'success' })
//     push({ name: 'dashboard' })
//   }
// }
const submit = async () => {
  if (validate()) {
    try {
      // 向后端发送登录请求
      const response = await axios.post('http://47.239.17.192:80/auth/login', {
        email: formData.email,
        password: formData.password,
      })

      if (response.status === 200) {
        init({ message: '你已成功登录', color: 'success' })
        push({ name: 'dashboard' })
      }
    } catch (error) {
      const errorMessage = (error as any).response?.data?.error || '登录失败'
      init({ message: errorMessage, color: 'danger' })
    }
  }
}
</script>
