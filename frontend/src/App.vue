<template>
  <q-layout>
    <Header />
    <Footer />
    <router-view></router-view>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Header from '@/components/BasisHeader.vue'
import Footer from '@/components/Footer.vue'
export default defineComponent({
  components: {
    Header,
    Footer
  },
  data() {
    return {}
  }
})
</script>
