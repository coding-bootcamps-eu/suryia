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
      row-key="name"
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
          @click="exportTable"
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
import { defineComponent } from 'vue'
import axios from 'axios'
export default defineComponent({
  name: 'LinkList',

  props: {
    rows: { type: Array, default: () => [] }
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

      rows: []
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
    deleteRow(row) {
      console.log('Delete row', row)
    },
    editRow(row) {
      console.log('Edit row', row)
    },
    goToLink(url) {
      window.open(url, '_blank')
    }
  }
})
</script>

<style scoped></style>
