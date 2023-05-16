<template>
  <v-row class="text-left px-15">
    <v-col cols="6" class="pl-7">
      <h1 class="display-2 textColor--text font-weight-bold">
        Calculadora de salário líquido
      </h1>
      <h1 class="title subText--text font-weight-medium pt-8">
        Facilitando informações que pode confundir o trabalhador.
      </h1>
      <h1 class="subtitle-1 subText--text font-weight-medium pt-6">
        Entenda o que é, como funciona os cálculo, quais os descontos e muito mais.
      </h1>
      <v-btn
        class="font-weight-bold mt-8 px-9"
        color="primary"
        large
        @click="handleFAQ">FAQ</v-btn>
    </v-col>

    <v-col cols="6">
      <v-col cols="12">
        <v-card
          color="cardColor"
        >
        <v-row class="px-4">
          <v-col cols="4">
            <VuetifyMoney
              v-model="model.salBruto"
              label="Salário bruto"
              :options="options"
            />
          </v-col>
          <v-col cols="4">
            <VuetifyMoney
              v-model="model.descFixo"
              label="Descontos Fixos"
              :options="options"
            />
          </v-col>
          <v-col cols="4">
            <v-text-field
              label="Número de Dependentes"
              prepend-icon="mdi mdi-account-group"
              variant="solo"
              type="number"
              v-mask="'##'"
              v-model="model.numDependentes" />
          </v-col>
        </v-row>
          <v-card-actions>
            <div class="flex-grow-1"></div>
            <v-btn
              class="font-weight-bold px-9"
              color="primary"
              outlined
              large
              @click="handleClear">Limpar</v-btn>
            <v-btn
              class="font-weight-bold px-9"
              color="primary"
              large>Calcular</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-col>
  </v-row>
</template>

<script>
import VuetifyMoney from '../components/VuetifyMoney.vue'

export default {
  name: 'Home',
  components: {
    VuetifyMoney
  },
  data () {
    return {
      model: {
        numDependentes: 0
      },
      options: {
        locale: 'pt-BR',
        prefix: 'R$',
        suffix: '',
        length: 9,
        precision: 0
      }
    }
  },
  methods: {
    handleFAQ () {
      this.$router.push('/faq')
    },
    handleClear () {
      this.$set(this, 'model', {})
    }
  }
}
</script>
