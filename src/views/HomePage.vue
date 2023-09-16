<script setup>
import { onMounted, ref } from 'vue';
import useAPI from '@/composables/useAPI'
import BaseTitle from '@/components/BaseTitle.vue'
const api = useAPI()
const categories = ref([])
onMounted(async () => {
  categories.value = await api.getCategories()
})
</script>

<template>
  <BaseTitle>
    <template #logo>
      <img src="logo.svg" alt="" />
    </template>
    Triviantastic
    
  </BaseTitle>
  <div class="categories">
    <RouterLink :to="`/question/category/${category.id}`" v-for="category in categories" :key="category.id" class="category">
      {{ category.name }}
    </RouterLink>
  </div>
  <p class="score">Score: 100</p>
</template>

<style lang ="postcss" scoped>
.brand {
  @apply flex items-center justify-center gap-4;

  & .logo {
    @apply h-16 w-16;
  }

  & .title {
    @apply text-6xl font-thin tracking-widest text-slate-700 uppercase;
  }
}

.categories {
  @apply grid flex-grow grid-cols-4 gap-12;

  & .category {
    @apply text-center flex h-32 items-center justify-center rounded-lg border-4 border-slate-500 py-4 font-bold uppercase transition-colors duration-300;

      &:hover {
        @apply cursor-pointer border-red-500 bg-red-500 text-white;
      }
  }


}

</style>
