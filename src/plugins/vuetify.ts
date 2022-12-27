/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Composables
import { createVuetify } from 'vuetify'

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    defaultTheme: 'dark',
    themes: {
      dark:{
        colors: {
          background: '#3F3B6C',
          primary: '#9F73AB',
          secondary: '#624F82',
          accent: '#A3C7D6',
          info: '#2196F3',
          success: '#4CAF50',
          warning: '#FFC107',
          destructive: '#EB455F'
        }
      },
      light: {
        colors: {
          primary: '#1867C0',
          secondary: '#5CBBF6',
        },
      },
    },
  },
})
