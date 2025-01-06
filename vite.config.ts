import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // HACK: fix link path because endpoint of GitHub pages is https://syuparn.github.io/cholc/ (not root)
  base: process.env.GITHUB_PAGES
    ? ''
    : './'
})
