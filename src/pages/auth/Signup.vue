<template>
  <VaForm ref="form" @submit.prevent="submit">
    <h1 class="font-semibold text-4xl mb-4">注册</h1>
    <p class="text-base mb-4 leading-5">
      已有帐号?
      <RouterLink :to="{ name: 'login' }" class="font-semibold text-primary">登录</RouterLink>
    </p>
    <VaInput
      v-model="formData.email"
      :rules="[(v) => !!v || 'Email field is required', (v) => /.+@.+\..+/.test(v) || 'Email should be valid']"
      class="mb-4"
      label="邮箱"
      type="email"
    />
    <VaValue v-slot="isPasswordVisible" :default-value="false">
      <VaInput
        ref="password1"
        v-model="formData.password"
        :rules="passwordRules"
        :type="isPasswordVisible.value ? 'text' : 'password'"
        class="mb-4"
        label="密码"
        messages="密码至少为8位且包含: 字母, 数字, 特殊字符."
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
      <VaInput
        ref="password2"
        v-model="formData.repeatPassword"
        :rules="[
          (v) => !!v || 'Repeat Password field is required',
          (v) => v === formData.password || 'Passwords don\'t match',
        ]"
        :type="isPasswordVisible.value ? 'text' : 'password'"
        class="mb-4"
        label="再次输入密码"
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

    <div class="flex justify-center mt-4">
      <VaButton class="w-full" @click="submit"> 创建账号</VaButton>
    </div>
  </VaForm>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useForm, useToast } from 'vuestic-ui'
import axios from 'axios'

const { validate } = useForm('form')
const { push } = useRouter()
const { init } = useToast()

const formData = reactive({
  email: '',
  password: '',
  repeatPassword: '',
})

const submit = async () => {
  if (validate()) {
    try {
      const response = await axios.post('http://127.0.0.1:5000/auth/register', {
        email: formData.email,
        password: formData.password,
      })

      if (response.status === 201) {
        init({
          message: '你已经成功注册',
          color: 'success',
        })
        push({ name: 'dashboard' })
      }
    } catch (error) {
      const errorMessage = (error as any).response?.data?.error || '注册失败'
      init({ message: errorMessage, color: 'danger' })
    }
  }
}

const passwordRules: ((v: string) => boolean | string)[] = [
  (v) => !!v || 'Password field is required',
  (v) => (v && v.length >= 8) || '密码只有有8个字符',
  (v) => (v && /[A-Za-z]/.test(v)) || '密码至少包含一个字母',
  (v) => (v && /\d/.test(v)) || '密码至少包含一个数字',
  (v) => (v && /[!@#$%^&*(),.?":{}|<>]/.test(v)) || '密码至少包含一个特殊字符',
]
</script>
