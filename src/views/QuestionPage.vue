<script setup>
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { shuffle } from 'lodash-es'

import useAPI from '@/composables/useAPI'
import useColor from '@/composables/useColor'
import useScore from '@/composables/useScore';
import BaseTitle from '@/components/BaseTitle.vue'
import DifficultyChip from '@/components/DifficultyChip.vue'
import NotificationAnswers from '@/components/NotificationAnswers.vue'


const route = useRoute()
const router = useRouter()
const colors = useColor()
const api = useAPI()
const question = ref(null)
const answers = ref([])

const showNotification = ref(false)
const isCorrect = ref(false)

const {changeScore} = useScore()

const handleAnswer = (points) => {
  isCorrect.value = points > 0
  showNotification.value = true
  setTimeout(() => {
    changeScore(points)
    router.push('/triviantastic/')
  }, 1000)

}

onMounted(async () => {
  question.value = await api.getQuestion(route.params.id)
  answers.value.push({
    id: answers.value.length,
    correct: true,
    answer: question.value.correct_answer,
    points: question.value.difficulty === 'easy' ? 10 : question.value.difficulty === 'medium' ? 20 : 30,
  })
  question.value.incorrect_answers.map((answer) => {
    answers.value.push({
      id: answers.value.length,
      correct: false,
      answer,
      points: -5,
    })
  })

  answers.value = shuffle(answers.value)

})
</script>

<template>
  <div v-if="question" class="question-container">
    <BaseTitle> {{ question.category }}</BaseTitle>
    <div v-html="question.question" class="question"></div>
    <div class="answers">
      <div v-html="answer.answer" v-for="answer in answers" :key="answer.id" :class="colors.getColor(answer.id)" class="answer" @click="handleAnswer(answer.points)">
      </div>
    </div>
    <DifficultyChip :difficulty="question.difficulty"/>
  </div>
  <div v-else class="loading">Loading...</div>
  <NotificationAnswers :correct="isCorrect" v-if="showNotification"/>
</template>

<style lang="postcss" scoped>
.question-container {
  @apply flex h-full w-full flex-col items-center gap-8 p-10;

  & .question {
    @apply text-center text-2xl font-bold;
  }

  & .answers {
    @apply grid w-full flex-grow grid-cols-2 gap-8;
    &:hover {
      @apply cursor-pointer;
    }

    & .answer {
      @apply flex items-center justify-center rounded-lg text-center text-4xl text-white;
    }
  }
}

.loading {
  @apply flex h-full w-full items-center justify-center text-7xl;
}
</style>