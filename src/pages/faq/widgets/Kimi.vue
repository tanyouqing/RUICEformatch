<template>
  <div class="search-container">
    <input v-model="searchQuery" type="text" placeholder="输入你的问题" class="search-input" @input="clearAnswers" />
    <button class="search-button" @click="search">搜索</button>
    <div v-if="loading" class="loading">加载中...</div>
    <div v-if="error" class="error">抱歉，搜索出错。</div>
    <div v-if="isEmptyMessage" class="empty-message">请输入内容后搜索</div>
    <div v-if="answers.length > 0" class="answers-container">
      <div v-for="(answer, index) in displayedAnswers" :key="index" class="answer">
        <!-- eslint-disable vue/no-v-html -->
        <div v-html="parseMarkdown(answer)"></div>
      </div>
      <button v-if="hasMore" class="load-more-button" @click="loadMore">加载更多</button>
    </div>
  </div>
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
      const parser = new DOMParser()
      const doc = parser.parseFromString(markdownText, 'text/html')
      return doc.body.innerHTML
    },
  },
}
</script>

<style scoped>
.search-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

.search-input {
  width: 100%;
  padding: 12px;
  margin-bottom: 10px;
  border: 2px solid #007bff;
  border-radius: 8px;
  font-size: 16px;
  transition: border-color 0.3s;
}

.search-input:focus {
  outline: none;
  border-color: #0056b3;
}

.search-button {
  width: 100%;
  padding: 12px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.search-button:hover {
  background-color: #0056b3;
}

.loading {
  text-align: center;
  margin-top: 10px;
  color: #555;
}

.error {
  text-align: center;
  margin-top: 10px;
  color: red;
}

.empty-message {
  text-align: center;
  margin-top: 10px;
  color: orange;
}

.answers-container {
  margin-top: 10px;
}

.answer {
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #f9f9f9;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.load-more-button {
  width: 100%;
  padding: 10px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.load-more-button:hover {
  background-color: #218838;
}
</style>
