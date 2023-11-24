<template>
  <p v-if="success">Successfully created new link.</p>
  <form novalidate @submit.prevent="createLink" class="container">
    <div class="q-pa-md" style="max-width: 300px">
      <!-- Destination URL -->
      <q-input filled v-model="url" label="Destination URL" :rules="urlRules" />
      <!-- Slug -->
      <q-input filled v-model="path" label="Slug" :rules="slugRules" />
      <q-btn class="q-mt-sm" type="submit" label="Save" color="secondary" />
      <q-btn class="q-mt-sm" label="Reset Validation" @click="resetForm" color="secondary" />
    </div>
  </form>
</template>

<script lang="ts">
import axios from 'axios'
import { defineComponent } from 'vue'

interface Data {
  url: string
  success: boolean
  path: string
  urlRules: Array<(val: string) => boolean | string>
  slugRules: Array<(val: string) => boolean | string>
}

export default defineComponent({
  name: 'CreateLink',
  data(): Data {
    return {
      url: '',
      path: '',
      success: false,
      urlRules: [(val: string) => !!val || 'URL is required'],
      slugRules: [(val: string) => !!val || 'Slug is required']
    }
  },
  methods: {
    async createLink() {
      try {
        if (!this.url || !this.path) {
          alert('URL and Path are required.')
          return
        }
        const payload = { url: this.url, path: this.path }
        const response = await axios.post('http://localhost:8080/link', payload)

        if (!response) {
          throw new Error('Network response was not ok')
        }
        const newLink = response.data
        console.log(newLink)
        this.success = true
        this.$router.push({ name: 'LinkList' })
      } catch (error) {
        console.error(error)
        this.success = false
      }
    },
    resetForm() {
      this.url = ''
      this.path = ''
      this.success = false
    }
  }
})
</script>
