<template>
  <v-row class="text-left px-15">
    <v-col cols="10" class="pl-7">
      <h1 class="subtitle-1 subText--text font-weight-medium pt-6">
        <v-icon @click="voltar">ph ph-arrow-left</v-icon> Fazer outro cálculo
      </h1>
      <h1 class="titulo display-2 textColor--text font-weight-medium pt-8">
        Meu salário
      </h1>
      <v-row class="pt-4">
        <v-col cols="3">
          <v-card color="cardColor">
            <v-card-text class="d-flex justify-space-between pa-2">
              <span class="subtitle-2 textColor--text font-weight-medium">
                Salário bruto
              </span>
              <span class="text-value  subtitle-2 font-weight-medium">
                R$ {{ model.salBruto.toFixed(2) }}
              </span>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="3">
          <v-card color="cardColor">
            <v-card-text class="d-flex justify-space-between pa-2">
              <span class="subtitle-2 textColor--text font-weight-medium">
                Descontos
              </span>
              <span class="text-value subtitle-2 font-weight-medium">
                R$ {{ model.descFixo.toFixed(2) }}
              </span>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="3">
          <v-card color="cardColor">
            <v-card-text class="d-flex justify-space-between pa-2">
              <span class="subtitle-2 textColor--text font-weight-medium">
                Pensão alimentícia
              </span>
              <span class="text-value subtitle-2 font-weight-medium">
                R$ {{ model.pensaoAlimenticia.toFixed(2) }}
              </span>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="3">
          <v-card color="cardColor">
            <v-card-text class="d-flex justify-space-between pa-2">
              <span class="subtitle-2 textColor--text font-weight-medium">
                Número de dependentes
              </span>
              <span class="text-value subtitle-2 font-weight-medium">
                {{ model.numDependentes }}
              </span>
            </v-card-text>
          </v-card>
        </v-col>
        <v-divider inset />
      </v-row>
      <v-row class="d-flex justify-space-between pt-6 pl-3">
        <span class="text-value display-1 font-weight-medium">
          Detalhamento
        </span>
          <v-btn icon @click="exportar">
            <v-icon>ph ph-download-simple</v-icon>
          </v-btn>
      </v-row>
      <v-row class="pt-4">
        <v-col cols="12">
          <v-data-table
            color="cardColor"
            :headers="headers"
            :items="calculo"
            :items-per-page="6"
            hide-default-footer
            class="elevation-1"/>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import TableController from '../controller/TableController.js'
import CalculoController from '../controller/CalculoController'

export default {
  props: {
    model: {
      type: Object
    }
  },
  name: 'Result-view',
  data () {
    return {
      headers: [
        {
          text: 'Evento',
          align: 'start',
          sortable: false,
          value: 'name'
        },
        { text: 'Alíquota Real', value: 'aliquota' },
        { text: 'Proventos', value: 'efetiva' },
        { text: 'Descontos', value: 'descontos' }
      ],
      calculo: [
        {
          name: 'Salário bruto',
          aliquota: '-',
          efetiva: 'R$ ' + this.model.salBruto.toFixed(2),
          descontos: '-'
        },
        {
          name: 'Outros',
          aliquota: '-',
          efetiva: '-',
          descontos: 'R$ ' + (parseInt(this.model.pensaoAlimenticia) + parseInt(this.model.descFixo))
        },
        {
          name: 'INSS',
          aliquota: this.getFaixaINSS(this.model.salBruto),
          efetiva: '-',
          descontos: 'R$ ' + this.model.descontoINSS.toFixed(2)
        },
        {
          name: 'IRRF',
          aliquota: this.getFaixaIRRF(this.model.salBruto - this.model.descontoINSS),
          efetiva: '-',
          descontos: 'R$ ' + this.model.descontoIRRF.toFixed(2)
        },
        {
          name: 'Valor Salário líquido',
          aliquota: ' ',
          efetiva: 'R$ ' + this.model.salLiquido.toFixed(2),
          descontos: ' '
        }
      ],
      colPattern: '"R$ "#,##0.00_);\\("$"#,##0.00\\)',
      wscols: [
        { wch: 13 },
        { wch: 17 },
        { wch: 22 },
        { wch: 15 },
        { wch: 15 },
        { wch: 15 }
      ],
      tableHeaders: [
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
    voltar () {
      this.$router.push('/')
    },
    exportar () {
      TableController.downloadXLSX(this.tableHeaders, this.model, this.colPattern, this.wscols)
    },
    getFaixaINSS (val) {
      return CalculoController.getFaixaINSS(val)
    },
    getFaixaIRRF (val) {
      return CalculoController.getFaixaIRRF(val)
    }
  },
  mounted () {
    console.log(this.model)
  }
}
</script>
<style>
.titulo {
  padding-bottom: 40px;
}
.text-value {
  color: #094c64;
}
</style>
