import { defineConfig } from 'umi'

export default defineConfig({
  title: 'app-example',
  theme: {
    'primary-color': '#00a870',
  },
  routes: [
    {
      path: '/',
      component: '@/layouts/index',
      layout: false,
      routes: [
        { path: '/', component: 'index', },
        { path: '/*', component: '404', },
      ],
    },
  ],
  antd: {
    import: true
  },
  layout: false,
  history: { type: 'hash' },
  publicPath: '/public/',
  outputPath: 'dist'
})
