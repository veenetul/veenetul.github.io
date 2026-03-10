import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  // This ensures assets load correctly on veenetul.github.io/
  base: '/', 
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        projects: resolve(__dirname, 'src/pages/projects.html'),
        skills: resolve(__dirname, 'src/pages/skills.html'),
        education: resolve(__dirname, 'src/pages/education.html'),
        experience: resolve(__dirname, 'src/pages/experience.html'),
        contacts: resolve(__dirname, 'src/pages/contacts.html'),
      },
    },
  },
})
