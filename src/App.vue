<script setup>

</script>

<template>
  <main>
    <div class="card">
      <RouterView />      
    </div>

  </main>
  <p class="score">Score: 100</p>
</template>

<style lang="postcss" scoped>
  main {
    @apply flex justify-center items-center h-screen bg-gradient-to-r from-gray-700 via-gray-900 to-black;
    & .card {
      @apply flex h-5/6 min-h-fit w-11/12 flex-col items-center gap-16 overflow-auto rounded-lg bg-white shadow-lg;
    }
  }

  .score {
    @apply absolute  text-white bottom-8 right-8 text-2xl font-bold;
  }
</style>
