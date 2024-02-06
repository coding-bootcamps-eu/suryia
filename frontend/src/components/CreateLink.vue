<template>
  <q-page-container>
    <q-page class="flex flex-center">
      <div class="q-pa-md" style="max-width: 300px; width: 100%">
        <form novalidate @submit.prevent="createLink" class="container">
          <q-input filled v-model="url" label="Destination URL" :rules="urlRules" />
          <q-input filled v-model="path" label="Slug" :rules="slugRules" />
          <div class="row justify-around q-mt-md">
            <q-btn class="q-mt-sm" type="submit" label="Save" color="secondary" />
            <q-btn
              class="q-mt-sm"
              type="button"
              @click="resetForm"
              label="Reset"
              color="secondary"
            />
          </div>
          <div class="row justify-center q-py-md">
            <q-btn icon="chevron_left" flat @click="goBack" class="q-mr-md" />
            <q-btn icon="chevron_right" flat @click="goBack" />
          </div>
        </form>
        <p v-if="success" class="success-message">Successfully created new link.</p>
      </div>
    </q-page>
  </q-page-container>
</template>

<script lang="ts">
import axios from 'axios'
import { defineComponent } from 'vue'
import { API_URL } from '@/utils/config.ts'
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
        const response = await axios.post(API_URL + '/link', payload)

        if (!response) {
          throw new Error('Network response was not ok')
        }
        if (response && response.data) {
          const newLink = response.data
          console.log(newLink)
          this.success = true
          setTimeout(() => this.$router.push({ name: 'LinkList' }), 2000)
        }
        /*const newLink = response.data
        console.log(newLink)
        this.success = true
        this.$router.push({ name: 'LinkList' })*/
      } catch (error) {
        console.error(error)
        this.success = false
      }
    },
    resetForm() {
      this.url = ''
      this.path = ''
      this.success = false
    },
    goBack() {
      this.$router.push({ name: 'LinkList' })
    }
  }
})
</script>
<style>
.q-page {
  min-height: 100vh;
}
.success-message {
  color: #28a745;
  background-color: #dff0d8;
  border-color: #d4edda;
  padding: 0.75rem 1.25rem;
  margin-bottom: 1rem;
  border: 1px solid transparent;
  border-radius: 0.25rem;
}
</style>
