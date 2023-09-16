<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

import useAPI from '@/composables/useAPI'
import useColor from '@/composables/useColor'

import BaseTitle from '@/components/BaseTitle.vue'

const route = useRoute()
const colors = useColor()
const api = useAPI()
const question = ref(null)
const answers = ref([])
onMounted(async () => {
  question.value = await api.getQuestion(route.params.id)
  answers.value.push({
    id: answers.value.length,
    correct: true,
    answer: question.value.correct_answer,
  })
  question.value.incorrect_answers.map((answer) => {
    answers.value.push({
      id: answers.value.length,
      correct: false,
      answer,
    })
  })
})
</script>

<template>
  <div v-if="question" class="question-container">
    <BaseTitle> {{ question.category }}</BaseTitle>
    <div v-html="question.question" class="question"></div>
    <div class="answers">
      <div v-for="answer in answers" :key="answer.id" :class="colors.getColor(answer.id)" class="answer">
        {{ answer.answer }}
      </div>
    </div>
  </div>
  <div v-else class="loading">Loading...</div>
</template>

<style lang="postcss" scoped>
.question-container {
  @apply flex h-full w-full flex-col items-center gap-8;

  & .question {
    @apply text-center text-2xl font-bold;
  }

  & .answers {
    @apply grid w-full flex-grow grid-cols-2 gap-8;

    & .answer {
      @apply flex items-center justify-center rounded-lg text-center text-4xl text-white;
    }
  }
}

.loading {
  @apply flex h-full w-full items-center justify-center text-7xl;
}
</style>