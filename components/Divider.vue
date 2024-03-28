<template>
<div class="light-text flex items-center mb-6" v-bind:class="{ 'xl:-mt-12 mt-12': negativeMargin, 'mt-24': !negativeMargin }">
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="8" viewBox="0 0 14 8" fill="none">
    <path d="M1 1L7 7L13 1" stroke="#ECECEC" stroke-opacity="0.5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
  <span class="mx-4">{{content}}</span>
  <div class="divider-line"></div>
</div>
</template>

<script>
export default {
  name: "Divider",
  props: ['content', 'negativeMargin']
}
</script>

<style scoped>
.divider-line {
  background: linear-gradient(90deg, rgba(236, 236, 236, 0.50) 0%, rgba(236, 236, 236, 0.00) 99.98%, rgba(236, 236, 236, 0.00) 99.99%);
  width: 40%;
  height: 1px;
}
</style>
