<template>
  <v-app :style="{background: $vuetify.theme.themes[theme].background}">
    <v-app-bar flat app class="pt-4 pl-15 pr-11" color="background">
      <v-spacer></v-spacer>
      <v-switch
          class="pt-3"
          inset
          :prepend-icon="$vuetify.theme.dark ? 'ph ph-moon-stars' : 'ph ph-sun-dim'"
          :value="darkMode"
          @change="toggleDarkMode"
        ></v-switch>
    </v-app-bar>
    <v-main class="d-flex justify-center align-center">
      <router-view/>
    </v-main>
     <v-footer
      v-bind="localAttrs"
      :padless="padless"
      class="pa-0"
    >
      <v-card
        flat
        tile
        color="background"
        width="100%"
        class="text-center"
      >

        <v-divider></v-divider>
          <v-card-text >
            {{ new Date().getFullYear() }} — <strong>Developed by Devbar</strong>
          </v-card-text>
      </v-card>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data: () => ({
    padless: false,
    darkMode: false
  }),
  methods: {
    toggleDarkMode: function () {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark
      this.darkMode = !this.darkMode
    }
  },
  computed: {
    localAttrs () {
      const attrs = {}

      if (this.variant === 'default') {
        attrs.absolute = false
        attrs.fixed = false
      } else {
        attrs[this.variant] = true
      }
      return attrs
    },
    theme () {
      return (this.$vuetify.theme.dark) ? 'dark' : 'light'
    },
    switchLabel: function () {
      return this.darkMode ? 'light' : 'dark'
    }
  }
}
</script>
