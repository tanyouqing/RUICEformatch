<template>
  <section class="search-container">
    <div class="search-box">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="请输入您的问题..."
        class="search-input"
        :disabled="loading"
        @input="clearAnswers"
      />
      <button class="search-button" :disabled="loading || !searchQuery.trim()" @click="search">搜索</button>
    </div>

    <!-- 显示加载中的提示 -->
    <div v-if="loading" class="loading">
      <div class="spinner"></div>
      正在搜索...
    </div>

    <!-- 显示错误信息 -->
    <div v-if="error" class="error">抱歉，搜索出错，请稍后再试。</div>

    <!-- 显示空输入提示 -->
    <div v-if="isEmptyMessage" class="empty-message">请输入内容后再进行搜索</div>

    <!-- 显示答案 -->
    <div v-if="answers.length > 0" class="answers-container">
      <article v-for="(answer, index) in displayedAnswers" :key="index" class="answer">
        <!-- eslint-disable vue/no-v-html -->
        <div v-html="parseMarkdown(answer)"></div>
      </article>

      <!-- 加载更多按钮 -->
      <button v-if="hasMore" class="load-more-button" @click="loadMore">加载更多</button>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      searchQuery: '',
      answers: [],
      displayedAnswers: [],
      loading: false,
      error: false,
      isEmptyMessage: false,
      hasMore: true,
      page: 1,
      pageSize: 5,
      cache: {},
      stream: true,
    }
  },
  methods: {
    async search() {
      this.error = false
      this.isEmptyMessage = false
      this.loading = true
      this.answers = [] // 清空上一次的回答

      const trimmedQuery = this.searchQuery.trim()

      if (trimmedQuery === '') {
        this.isEmptyMessage = true
        this.loading = false
        return
      }

      if (this.cache[trimmedQuery]) {
        this.answers = this.cache[trimmedQuery]
        this.updateDisplayedAnswers()
        this.loading = false
        return
      }

      try {
        const response = await this.fetchAnswer(trimmedQuery)
        if (response && response.choices) {
          const choiceContents = response.choices.map((choice) => choice.message.content)
          this.answers = this.answers.concat(choiceContents)
          this.cache[trimmedQuery] = this.answers
          this.updateDisplayedAnswers()
        } else {
          this.answers = []
        }
      } catch (error) {
        this.error = true
        console.error('Error fetching answer:', error)
      }
      this.loading = false
    },
    async fetchAnswer(query) {
      const apiKey = 'sk-RqoBIoExUi2dHOHK0Fv7kyQofalZwKWzi29Dk95F4dZNANCN' // 替换为你的 API Key
      const url = 'https://api.moonshot.cn/v1/chat/completions'
      const headers = {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      }

      const data = {
        model: 'moonshot-v1-8k',
        messages: [
          { role: 'system', content: '你是 Kimi，由 Moonshot AI 提供的人工智能助手，你更擅长中文和英文的对话。' },
          { role: 'user', content: query },
        ],
        temperature: 0.3,
      }

      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: headers,
          body: JSON.stringify(data),
        })
        if (!response.ok) throw new Error('Network response was not ok')
        const result = await response.json()
        return result
      } catch (error) {
        console.error('Error fetching answer:', error)
        return { choices: [] }
      }
    },
    updateDisplayedAnswers() {
      this.displayedAnswers = this.answers.slice(0, this.pageSize * this.page)
    },
    loadMore() {
      if (this.answers.length <= this.displayedAnswers.length) {
        this.hasMore = false
        return
      }
      this.updateDisplayedAnswers()
    },
    clearAnswers() {
      this.answers = []
      this.displayedAnswers = []
    },
    parseMarkdown(markdownText) {
      const boldRegex = /\*\*(.*?)\*\*/g
      const html = markdownText.replace(boldRegex, '<strong>\\$1</strong>')
      const parser = new DOMParser()
      const doc = parser.parseFromString(html, 'text/html')
      return doc.body.innerHTML
    },
  },
}
</script>

<style scoped>
/* 基础颜色变量 */
:root {
  --primary-color: #007bff;
  --secondary-color: #0056b3;
  --success-color: #28a745;
  --warning-color: orange;
  --error-color: red;
  --background-color: #f7f7f7;
}

/* 页面容器 */
.search-container {
  max-width: 700px;
  margin: 0 auto;
  padding: 20px;
  background-color: var(--background-color);
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

/* 输入框容器 */
.search-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.search-input {
  width: 80%;
  padding: 12px;
  margin-right: 10px;
  border: 2px solid var(--primary-color);
  border-radius: 8px;
  font-size: 16px;
  transition: border-color 0.3s;
}

.search-input:focus {
  outline: none;
  border-color: var(--secondary-color);
}

.search-button {
  width: 18%;
  padding: 12px;
  background-color: var(--primary-color);
  color: #154ec1;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.search-button:disabled {
  background-color: #dcdcdc;
  cursor: not-allowed;
}

.search-button:hover:enabled {
  background-color: var(--secondary-color);
}

.loading {
  text-align: center;
  margin-top: 20px;
  color: #007bff;
  font-size: 18px;
}

.spinner {
  display: inline-block;
  width: 24px;
  height: 24px;
  border: 4px solid transparent;
  border-top: 4px solid #007bff;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.error {
  text-align: center;
  margin-top: 20px;
  color: var(--error-color);
  font-size: 18px;
}

.empty-message {
  text-align: center;
  margin-top: 20px;
  color: var(--warning-color);
  font-size: 18px;
}

/* 回答区样式 */
.answers-container {
  margin-top: 20px;
}

.answer {
  margin-bottom: 15px;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  font-size: 16px;
  line-height: 1.6;
}

.load-more-button {
  width: 100%;
  padding: 12px;
  background-color: var(--success-color);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.load-more-button:hover {
  background-color: #218838;
}

@media (max-width: 600px) {
  .search-input {
    width: 70%;
  }

  .search-button {
    width: 28%;
  }
}
</style>
