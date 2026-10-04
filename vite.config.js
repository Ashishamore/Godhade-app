import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: true,          // expose on LAN so phones/tablets can connect
    port: 5173,
    strictPort: false,
    allowedHosts: true,  // required for cloudflared / ngrok tunnel hostnames
  },
  preview: { host: true, port: 4173, allowedHosts: true },
})
