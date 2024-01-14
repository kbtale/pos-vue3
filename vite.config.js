import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from 'tailwindcss'
import vueform from '@vueform/vueform/vite'
import svgLoader from 'vite-svg-loader'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueform(), svgLoader()],
  css: {
    postcss: {
      plugins: [tailwindcss],
    },
  },
})
