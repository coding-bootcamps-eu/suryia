<template>
  <div class="q-pa-md">
    <q-table
      color="primary"
      card-class="bg-5 text-brown"
      table-class="text-grey-8"
      table-header-class="text-brown"
      flat
      borderedtitle="LINK LIST"
      :rows="rows"
      :columns="columns"
      row-key="id"
    >
      <template v-slot:top="props">
        <div style="font-size: 20px; font-weight: bold; color: #027be3">LINK LIST</div>
        <q-space />
        <q-input borderless dense debounce="300" v-model="filter" placeholder="Search">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
        <q-space />
        <q-btn
          color="secondary"
          icon-right="edit"
          label="Create Link"
          no-caps
          @click="navigateToCreateLinkPage"
        />
      </template>

      <template v-slot:body-cell-path="props">
        <q-td :props="props">
          <div
            style="cursor: pointer; color: blue; text-decoration: underline"
            @click="goToLink(props.row.url)"
          >
            {{ props.row.path }}
          </div>
        </q-td>
      </template>
      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <div class="flex flex-row inline no-wrap items-center">
            <q-btn
              icon="edit"
              outline
              round
              color="primary"
              @click="editRow(props.row)"
              no-caps
              flat
              dense
            />
            <q-btn
              icon="delete"
              outline
              round
              color="primary"
              @click="deleteRow(props.row)"
              no-caps
              flat
              dense
            />
          </div>
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

interface LinkRow {
  _id: string
  url: string
  path: string
  modified: Date
}
export default defineComponent({
  name: 'LinkList',

  props: {
    rows: { type: Array as PropType<LinkRow[]>, default: () => [] }
  },
  data() {
    return {
      columns: [
        /*{
          name: 'url',
          align: 'left',
          label: 'Destination URL',
          field: 'url'
        },*/
        {
          name: 'path',
          align: 'left',
          label: 'SLUG',
          field: 'path'
        },
        {
          name: 'modified',
          align: 'left',
          label: 'LAST UPDATE',
          field: 'modified'
        },
        {
          name: 'actions',
          align: 'left',
          label: 'ACTION',
          field: 'action'
        }
      ],

      rows: [] as LinkRow[]
    }
  },

  created() {
    this.fetchLinks()
  },
  methods: {
    async fetchLinks() {
      console.log('Stored token:', localStorage.getItem('access_token'))
      try {
        const response = await axios.get('http://localhost:8080/link')

        console.log('Response data:', response.data)
        this.rows = response.data
      } catch (err) {
        console.error('Failed to update links:', err)
      }
    },
    async deleteRow(rowToDelete: LinkRow) {
      if (confirm('Are you sure you want to delete this link?'))
        try {
          const response = await axios.delete(`http://localhost:8080/link/${rowToDelete._id}`)
          console.log(this.rows)
          if (response.status === 200) {
            this.rows = this.rows.filter((row) => row._id !== rowToDelete._id)
            //this.rows = JSON.parse(JSON.stringify(this.rows.filter((row) => row._id !== row._id)))
          }
        } catch (error) {
          console.error('Failed to delete link', error)
        }
    },
    navigateToCreateLinkPage() {
      this.$router.push({ name: 'CreateLink' })
    },

    editRow(row) {},
    goToLink(url) {
      window.open(url, '_blank')
    }
  }
})
</script>

<style scoped></style>
