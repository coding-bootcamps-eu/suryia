<template>
  <div class="q-pa-md">
    <q-table title="LINK LIST" :rows="rows" :columns="columns" row-key="name" flat bordered>
      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <div class="flex flex-row no-wrap items-center">
            <q-btn flat label="Edit" color="primary" @click="editRow(props.row)" class="q-ma-xs" />
            <q-btn
              flat
              label="Delete"
              color="primary"
              @click="deleteRow(props.row)"
              class="q-ma-xs"
            />
          </div>
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

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
          align: 'center',
          field: (row) => row.name,
          sortable: false,
          style: 'width: 100px',
          headerStyle: 'width: 100px'
        }
      ]
    }
  },
  methods: {
    deleteRow(row) {
      console.log('Delete row', row)
    },
    editRow(row) {
      console.log('Edit row', row)
    }
  }
})
</script>
<style scoped></style>
