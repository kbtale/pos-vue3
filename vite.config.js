import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from 'tailwindcss'
import vueform from '@vueform/vueform/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueform()],
  css: {
    postcss: {
      plugins: [tailwindcss],
    },
  },
})