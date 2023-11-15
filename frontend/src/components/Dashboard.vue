<template>
  <q-layout> </q-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { userSessionStore } from '@/store/session'

export default defineComponent({
  name: 'Dashboard',
  components: {},
  setup() {
    const sessionStore = userSessionStore()
    return { sessionStore }
  }
})
</script>

<style scoped></style>
