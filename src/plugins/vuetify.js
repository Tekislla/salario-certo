import Vue from 'vue'
import Vuetify from 'vuetify/lib/framework'

const vuetify = new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#094C64',
        secondary: '#b0bec5',
        accent: '#8c9eff',
        error: '#b71c1c',
        subText: '#979797',
        cardColor: '#FAFAFA',
        textColor: '#111111',
        background: '#FFFEFC'
      },
      dark: {
        primary: '#E9EBF2',
        secondary: '#b0bec5',
        accent: '#8c9eff',
        error: '#B80606',
        subText: '#979797',
        cardColor: '#1E293B',
        textColor: '#FFFEFC',
        background: '#111827'

      }
    }
  }
})

Vue.use(Vuetify)
export default vuetify
