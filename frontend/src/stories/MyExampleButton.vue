<template>
  <button :class="`btn btn-${type}`">{{ label }}</button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    label: {
      type: String,
      default: 'Login'
    },
    type: {
      type: String,
      default: 'primary', // primary oder secondary
      validator: (value: string) => ['primary', 'secondary'].includes(value)
    }
  }
})
</script>

<style scoped>
.btn {
  padding: 10px 20px;
  border: none;
  cursor: pointer;
}

.btn-primary {
  background-color: blue;
  color: white;
}

.btn-secondary {
  background-color: gray;
  color: white;
}
</style>
