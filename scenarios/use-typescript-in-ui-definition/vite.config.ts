import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import compileDceUi from './compileDceUi.js'

compileDceUi();

// https://vite.dev/config/
export default defineConfig({
  base: './',
  plugins: [react()],
})
