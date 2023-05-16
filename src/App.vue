<template>
  <v-app :style="{background: $vuetify.theme.themes[theme].background}">
    <v-toolbar dense flat class="px-4 pt-2">

      <v-toolbar-title>Salário Certo</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon class="ml-4">
        <v-icon>ph ph-moon</v-icon>
      </v-btn>
    </v-toolbar>

    <v-main>
      <router-view/>
    </v-main>
     <v-footer
      v-bind="localAttrs"
      :padless="padless"
      class="pa-0"
      color="background"
    >
      <v-card
        flat
        tile
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
    padless: false
    //
  }),
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
    }
  }
}
</script>
