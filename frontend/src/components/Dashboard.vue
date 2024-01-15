<template>
  <LinkList />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { userSessionStore } from '@/store/session'
import LinkList from '@/components/LinkList.vue'

export default defineComponent({
  name: 'Dashboard',
  components: {
    LinkList
  },
  setup() {
    const sessionStore = userSessionStore()
    return { sessionStore }
  }
})
</script>

<style scoped></style>
