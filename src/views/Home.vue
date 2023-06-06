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
import * as XLSX from 'xlsx'

export default {
  name: 'Home',
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
      mensagemErro: 'testee',
      // DAQUI PRA BAIXO PASSAR PARA A TELA DE DETALHAMENTO
      colPattern: '"R$ "#,##0.00_);\\("$"#,##0.00\\)',
      wscols: [
        { wch: 13 },
        { wch: 17 },
        { wch: 22 },
        { wch: 15 },
        { wch: 15 },
        { wch: 15 }
      ],
      headers: [
        'Salário Bruto',
        'Pensão Alimentícia',
        'Número de Dependentes',
        'Desconto INSS',
        'Desconto IRRF',
        'Salário Líquido'
      ]
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
      if (this.model.salBruto === 0) {
        this.mensagemErro = 'Salário bruto não pode ser 0'
        this.alert = true
        setTimeout(() => {
          this.alert = false
        }, 3000)
      } else if (this.model.salBruto < 1302.00) {
        this.mensagemErro = 'O salário informado precisa ser acima de um salário mínimo'
        this.alert = true
        setTimeout(() => {
          this.alert = false
        }, 3000)
      } else if (this.model.salBruto === null || this.model.salBruto === undefined || this.model.salBruto === '') {
        this.mensagemErro = 'Informe um valor para o salário bruto'
        this.alert = true
        setTimeout(() => {
          this.alert = false
        }, 3000)
      } else if (this.model.descFixo === null || this.model.descFixo === undefined || this.model.descFixo === '') {
        this.mensagemErro = 'Informe um valor de descontos fixos (caso não haja, deixe 0)'
        this.alert = true
        setTimeout(() => {
          this.alert = false
        }, 3000)
      } else if (this.model.pensaoAlimenticia === null || this.model.pensaoAlimenticia === undefined || this.model.pensaoAlimenticia === '') {
        this.mensagemErro = 'Informe um valor de pensão alimentícia paga (caso não haja, deixe 0)'
        this.alert = true
        setTimeout(() => {
          this.alert = false
        }, 3000)
      } else if (this.model.numDependentes === null || this.model.numDependentes === undefined || this.model.numDependentes === '') {
        this.mensagemErro = 'Informe um número de dependentes (caso não haja, deixe 0)'
        this.alert = true
        setTimeout(() => {
          this.alert = false
        }, 3000)
      } else {
        this.$router.push({
          name: 'result',
          params: {
            model: this.calcular()
          }
        })
      }
    },
    calcular () {
      const salBruto = this.model.salBruto - this.model.descFixo
      const pensaoAlimenticia = this.model.pensaoAlimenticia
      const numDependentes = this.model.numDependentes
      const descontoINSS = this.getDescontoINSS(salBruto)
      const salDescINSS = salBruto - descontoINSS
      const descontoIRRF = this.getDescontoIRRF(salDescINSS, numDependentes, pensaoAlimenticia)
      const salLiquido = salBruto - descontoINSS - descontoIRRF

      return {
        salBruto,
        pensaoAlimenticia,
        numDependentes,
        descontoINSS,
        descontoIRRF,
        salLiquido
      }
    },
    getDescontoINSS (salBruto) {
      if (salBruto === 1302.00) {
        return salBruto * 0.075
      } else if (salBruto > 1302.01 && salBruto < 2571.29) {
        return (1302.00 * 0.075) + ((salBruto - 1302.00) * 0.09)
      } else if (salBruto > 2571.30 && salBruto < 3856.94) {
        return (1302.00 * 0.075) + ((2571.29 - 1302.00) * 0.09) + ((salBruto - 2571.29) * 0.12)
      } else if (salBruto > 3856.95 && salBruto < 7507.49) {
        return (1302.00 * 0.075) + ((2571.29 - 1302.00) * 0.09) + ((3856.94 - 2571.29) * 0.12) + ((salBruto - 3856.94) * 0.14)
      } else {
        return (1302.00 * 0.075) + ((2571.29 - 1302.00) * 0.09) + ((3856.94 - 2571.29) * 0.12) + ((7507.49 - 3856.94) * 0.14)
      }
    },
    getDescontoIRRF (salBruto, numDependentes, pensaoAlimenticia) {
      const descDependentes = numDependentes * 189.59
      if (salBruto < 1903.98) {
        return 0
      } else if (salBruto > 1903.99 && salBruto < 2826.65) {
        return (salBruto * 0.075) - 142.8 - descDependentes - pensaoAlimenticia
      } else if (salBruto > 2826.66 && salBruto < 3751.05) {
        return (salBruto * 0.15) - 354.8 - descDependentes - pensaoAlimenticia
      } else if (salBruto > 3751.06 && salBruto < 4664.68) {
        return (salBruto * 0.225) - 636.13 - descDependentes - pensaoAlimenticia
      } else {
        return (salBruto * 0.275) - 869.36 - descDependentes - pensaoAlimenticia
      }
    },
    // PASSAR FUNÇÃO PARA TELA DE DETALHAMENTO
    getDadosTabela () {
      const dadosBrutos = this.calcular()

      const dadosTabela = [
        dadosBrutos.salBruto,
        dadosBrutos.pensaoAlimenticia,
        dadosBrutos.numDependentes,
        dadosBrutos.descontoINSS,
        dadosBrutos.descontoIRRF,
        dadosBrutos.salLiquido
      ]

      return [
        this.headers,
        dadosTabela
      ]
    },
    // PASSAR FUNÇÃO PARA TELA DE DETALHAMENTO
    formatTabela (ws) {
      ws.A2.z = this.colPattern
      ws.B2.z = this.colPattern
      ws.D2.z = this.colPattern
      ws.E2.z = this.colPattern
      ws.F2.z = this.colPattern
      ws['!cols'] = this.wscols

      return ws
    },
    // PASSAR FUNÇÃO PARA TELA DE DETALHAMENTO
    downloadXLSX () {
      const wb = XLSX.utils.book_new()
      wb.Props = {
        Title: 'Salário certo',
        Subject: 'Salário certo',
        Author: 'Devbar',
        CreatedDate: new Date()
      }

      wb.SheetNames.push('Salário certo')

      const data = this.getDadosTabela()
      const ws = XLSX.utils.aoa_to_sheet(data)

      wb.Sheets['Salário certo'] = this.formatTabela(ws)
      XLSX.writeFile(wb, 'salario_certo.xlsx')
    }
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
