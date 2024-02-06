import { defineStore } from 'pinia'
import router from '@/router/index'
import axios from 'axios'
import { API_URL } from '@/utils/config'
interface LinkRow {
  _id: string
  url: string
  path: string
  modified: Date
}

interface Column {
  name: string
  align: string
  label: string
  field: string | ((row: any) => string)
}

export const useLinkStore = defineStore({
  id: 'link',
  state: () => ({
    rows: [] as LinkRow[],
    columns: [] as Column[]
  }),
  getters: {},
  actions: {
    async fetchLinks() {
      console.log('Stored token:', localStorage.getItem('access_token'))
      try {
        const response = await axios.get(API_URL + '/link')

        console.log('Response data:', response.data)
        this.rows = response.data
      } catch (err) {
        console.error('Failed to update links:', err)
      }
    },

    async deleteRow(rowToDelete: LinkRow) {
      if (confirm('Are you sure you want to delete this link?'))
        try {
          const response = await axios.delete(API_URL + `/link/${rowToDelete._id}`)
          console.log(this.rows)
          if (response.status === 200) {
            this.rows = this.rows.filter((row) => row._id !== rowToDelete._id)
          }
        } catch (error) {
          console.error('Failed to delete link', error)
        }
    },
    navigateToCreateLinkPage() {
      router.push({ name: 'CreateLink' })
    },

    editLink(row) {
      router.push({ name: 'EditLink', params: { id: row._id } })
    },

    goToLink(url: string) {
      window.open(url, '_blank')
    }
  }
})
