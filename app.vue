
<template>
  <div class="overflow-x-hidden overflow-y-hidden">
    <ToggleTheme class="absolute z-50 top-8 right-4" />

    <Calculator />
  </div>
</template>
<script setup>
useHead({
  title: 'CriCASSIO',
  meta: [
    { name: 'description', content: "The ultimate calculator bee yourself with this pleasingly and functional calculator." }
  ],
})
</script>