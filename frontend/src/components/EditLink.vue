<template>
  <q-page-container>
    <q-page class="flex flex-center">
      <div class="q-pa-md" style="max-width: 300px; width: 100%">
        <p v-if="success">Successfully created new link.</p>
        <form novalidate @submit.prevent="editLink" class="container">
          <q-input filled v-model="url" label="Destination URL" :rules="urlRules" />
          <q-input filled v-model="path" label="Slug" :rules="slugRules" />
          <div class="row justify-around q-mt-md">
            <q-btn class="q-mt-sm" type="submit" label="Save" color="secondary" />
          </div>
          <div class="row justify-center q-py-md">
            <q-btn icon="chevron_left" flat @click="goBack" class="q-mr-md" />
            <q-btn icon="chevron_right" flat @click="goBack" />
          </div>
        </form>
      </div>
    </q-page>
  </q-page-container>
</template>

<script lang="ts">
import axios from 'axios'
import { defineComponent } from 'vue'

interface Data {
  url: string
  _id: string
  success: boolean
  path: string
  urlRules: Array<(val: string) => boolean | string>
  slugRules: Array<(val: string) => boolean | string>
}

export default defineComponent({
  name: 'EditLink',
  props: {
    id: {
      type: String,
      required: true
    }
  },
  data(): Data {
    return {
      url: '',
      path: '',
      _id: '',
      success: false,
      urlRules: [(val: string) => !!val || 'URL is required'],
      slugRules: [(val: string) => !!val || 'Slug is required']
    }
  },
  methods: {
    async editLink() {
      try {
        if (!this.url || !this.path) {
          alert('URL and Path are required.')
          return
        }

        const payload = { url: this.url, path: this.path }
        const response = await axios.put(`http://localhost:8080/link/${this.id}`, payload)

        if (!response) {
          throw new Error('Network response was not ok')
        }
        console.log('Updated link:', response.data)
        this.success = true
        this.$router.push({ name: 'LinkList' })
      } catch (error) {
        console.error('Update failed:', error)
        this.success = false
      }
    },
    resetForm() {
      this.url = ''
      this.path = ''
      this.success = false
    },
    goBack() {
      this.$router.go(-1)
    }
  }
})
</script>
<style>
.q-page {
  min-height: 100vh;
}
</style>
