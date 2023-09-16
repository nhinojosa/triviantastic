<script setup>


</script>

<template>
  <div class="brand">
    <img src="logo.svg" alt="" class="logo">
    <h1 class="title">Triviantastic</h1>
    <img src="logo.svg" alt="" class="logo">
  </div>
  <div class="categories">
    <RouterLink :to="`/question/category/${n}`" v-for="n in 24" :key="n" class="category">
      categories - {{ n }}
    </RouterLink>
  </div>
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
    @apply flex h-32 w-40 items-center justify-center rounded-lg border-4 border-slate-500 py-4 font-bold uppercase transition-colors duration-300;

      &:hover {
        @apply cursor-pointer border-red-500 bg-red-500 text-white;
      }
  }


}

</style>
