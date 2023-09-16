<template>
    <div class="brand">
        <slot name ="logo"/>
        <h1 class = "title">
          <slot />  
        </h1>
        
        <slot name ="logo"/>
    </div>
</template>

<style lang ="postcss" scoped>
.brand {
  @apply flex items-center justify-center gap-4;

  & :slotted(img) {
    @apply h-20 w-20;
  }

  & .title {
    @apply text-6xl font-thin tracking-widest text-slate-700 uppercase;
  }
}


</style>