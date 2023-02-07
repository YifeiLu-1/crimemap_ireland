<template>
  <footer
    id="footer"
    class="colored-section"
  >
    <div class="container-fluid">
      <a href="https://twitter.com/yifeilu_"><i class="fab footer-icon fa-twitter" /></a>
      <p>© Copyright {{ state.year }} Crimemap</p>
    </div>
  </footer>
</template>

<script setup>
import { reactive } from 'vue'

// default location and year
const state = reactive({
  year: 2023
})

state.year = new Date().getFullYear()
</script>
