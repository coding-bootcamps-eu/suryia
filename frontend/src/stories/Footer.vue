<template>
  <div>
    <q-footer reveal elevated>
      <q-toolbar>
        <div class="q-toolbar__title flex-center">
          <img :src="bootcamplogo" alt="Logo" class="footer-logo" />
          <span>Developed by Ferdinand Niemann, Joe Gregory and Jipson Minibhavan</span>
        </div>
      </q-toolbar>
    </q-footer>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import bootcamplogo from '@/assets/bootcamplogo.png'

export default defineComponent({
  data() {
    return {
      bootcamplogo: bootcamplogo
    }
  }
})
</script>

<style scoped>
.q-footer {
  display: flex;
  justify-content: center;
  align-items: center;
}

.flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}

.flex-center img {
  height: 40px;
}

.flex-center span {
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  margin-left: 1em;
}
</style>
