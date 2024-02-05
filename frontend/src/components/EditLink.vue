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
import { API_URL } from '@/utils/config'

interface Data {
  url: string
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
      success: false,
      urlRules: [(val: string) => !!val || 'URL is required'],
      slugRules: [(val: string) => !!val || 'Slug is required']
    }
  },
  created() {
    if (this.id) {
      this.loadLinkData()
    }
  },
  methods: {
    async loadLinkData() {
      console.log(`Loading data for ID: ${this.id}`)
      try {
        const response = await axios.get(API_URL + `/link/${this.id}`)
        console.log(response)
        if (response.data) {
          this.url = response.data.url
          this.path = response.data.path
        } else {
          console.error('No data returned from the server')
        }
      } catch (error) {
        console.error('Failed to load link data:', error)
      }
    },
    async editLink() {
      if (!this.url || !this.path) {
        alert('URL and Path are required.')
        return
      }
      const payload = {
        url: this.url,
        path: this.path
      }
      try {
        const response = await axios.put(API_URL + `/link/${this.id}`, payload)

        if (response && response.data) {
          alert('Link updated succesfully')
          console.log('Updated link:', response.data)
          this.success = true

          this.$router.push({ name: 'LinkList' })
        } else {
          throw new Error('Network response was not ok')
        }
      } catch (error) {
        console.error('Update failed:', error)
        this.success = false
      }
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
</style>
