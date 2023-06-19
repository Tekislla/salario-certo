<template>
  <v-row class="text-left px-15">
    <v-col cols="6" class="pl-7">
      <h1 class="display-2 textColor--text font-weight-bold">
        Salário Certo
      </h1>
      <h1 class="title subText--text font-weight-bold pt-8">
        <a class="subtitulo">Calculadora de salário líquido do trabalhador CLT.</a>
      </h1>
      <h1 class="subtitle-1 subText--text font-weight-medium pt-6">
        Facilitando informações que podem confundir o trabalhador.
        <br />
        Preencha seus dados e calcule já o seu salário líquido!
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
        <v-row class="px-3">
          <v-col cols="3">
            <VuetifyMoney
              v-model="model.salBruto"
              label="Salário bruto"
              :options="options"
            />
          </v-col>
          <v-col cols="3">
            <VuetifyMoney
              v-model="model.descFixo"
              label="Descontos Fixos"
              :options="options"
            />
          </v-col>
          <v-col cols="3">
            <VuetifyMoney
              v-model="model.pensaoAlimenticia"
              label="Valor pago de pensão alimentícia"
              :options="options"
            />
          </v-col>
          <v-col cols="3">
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
              @click="validarDados"
              large>Calcular</v-btn>
          </v-card-actions>
        </v-card>
        <div class="alert-div">
            <v-alert
              density="compact"
              type="error"
              v-model="alert"
              transition="scale-transition"
              style="position: absolute;"
            >
            {{ mensagemErro }}
          </v-alert>
        </div>
      </v-col>
    </v-col>
  </v-row>
</template>

<script>
import VuetifyMoney from '../components/VuetifyMoney.vue'
import ValidationController from '../controller/ValidationController.js'
import CalculoController from '../controller/CalculoController.js'

export default {
  name: 'Home-view',
  components: {
    VuetifyMoney
  },
  data () {
    return {
      model: {
        salBruto: 0,
        descFixo: 0,
        pensaoAlimenticia: 0,
        numDependentes: 0
      },
      options: {
        locale: 'pt-BR',
        prefix: 'R$',
        suffix: '',
        length: 9,
        precision: 0
      },
      alert: false,
      mensagemErro: ''
    }
  },
  methods: {
    handleFAQ () {
      this.$router.push('/faq')
    },
    handleClear () {
      this.$set(this, 'model', {})
    },
    validarDados () {
      const validacao = ValidationController.validarDados(this.model.salBruto, this.model.descFixo, this.model.pensaoAlimenticia, this.model.numDependentes)
      if (validacao.valido === false) {
        this.mensagemErro = validacao.msg
        this.alert = true
        setTimeout(() => {
          this.alert = false
        }, 3000)
      } else {
        this.$router.push({
          name: 'result',
          params: {
            model: CalculoController.calcular(this.model.salBruto, this.model.descFixo, this.model.pensaoAlimenticia, this.model.numDependentes)
          }
        })
      }
    }
  },
  mounted () {
    document.title = 'Salário Certo'
  }
}
</script>
<style>
.subtitulo {
  color: #094c64;
}
.alert-div {
  margin-top: 15px;
}
</style>
