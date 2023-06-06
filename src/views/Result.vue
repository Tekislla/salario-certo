<template>
  <v-row class="text-left px-15">
    <v-col cols="9" class="pl-7">
      <h1 class="title textColor--text font-weight-bold">
        <v-icon @click="voltar">ph ph-arrow-left</v-icon> Fazer outro cálculo
      </h1>
      <h1 class="display-2 textColor--text font-weight-medium pt-8">
        Meu cálcu
      </h1>
      <v-row class="pt-4">
        <v-col cols="4">
          <v-card color="cardColor">
            <v-card-text class="d-flex justify-space-between pa-2">
              <span class="subtitle-2 textColor--text font-weight-medium">
                Salário bruto
              </span>
              <span class="subtitle-2 textColor--text font-weight-medium">
                R$ {{ model.salBruto }}
              </span>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="4">
          <v-card color="cardColor">
            <v-card-text class="d-flex justify-space-between pa-2">
              <span class="subtitle-2 textColor--text font-weight-medium">
                Descontos
              </span>
              <span class="subtitle-2 textColor--text font-weight-medium">
                R$ {{ model.descFixo }}
              </span>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="4">
          <v-card color="cardColor">
            <v-card-text class="d-flex justify-space-between pa-2">
              <span class="subtitle-2 textColor--text font-weight-medium">
                Número de dependentes
              </span>
              <span class="subtitle-2 textColor--text font-weight-medium">
                {{ model.numDependentes }}
              </span>
            </v-card-text>
          </v-card>
        </v-col>
        <v-divider inset />
      </v-row>
      <v-row class="d-flex justify-space-between pt-5 pl-3">
        <span class="display-1 textColor--text font-weight-medium">
          Resultado
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
            :items="desserts"
            :items-per-page="5"
            class="elevation-1"/>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import TableController from '../controller/TableController.js'

export default {
  props: {
    model: {
      type: Object
    }
  },
  name: 'Result',
  data () {
    return {
      headers: [
        {
          text: 'Evento',
          align: 'start',
          sortable: false,
          value: 'name'
        },
        { text: 'Base', value: 'base' },
        { text: 'Efetiva', value: 'efetiva' },
        { text: 'Proventos', value: 'proventos' },
        { text: 'Descontos', value: 'descontos' }
      ],
      desserts: [
        {
          name: 'Frozen Yogurt',
          base: 159,
          efetiva: 6.0,
          proventos: 24,
          descontos: 4.0
        },
        {
          name: 'Ice cream sandwich',
          base: 237,
          efetiva: 9.0,
          proventos: 37,
          descontos: 4.3
        },
        {
          name: 'Eclair',
          base: 262,
          efetiva: 16.0,
          proventos: 23,
          descontos: 6.0
        },
        {
          name: 'Cupcake',
          base: 305,
          efetiva: 3.7,
          proventos: 67,
          descontos: 4.3
        },
        {
          name: 'Gingerbread',
          base: 356,
          efetiva: 16.0,
          proventos: 49,
          descontos: 3.96
        },
        {
          name: 'Jelly bean',
          base: 375,
          efetiva: 0.0,
          proventos: 94,
          descontos: 0.0
        },
        {
          name: 'Lollipop',
          base: 392,
          efetiva: 0.2,
          proventos: 98,
          descontos: 0
        },
        {
          name: 'Honeycomb',
          base: 408,
          efetiva: 3.2,
          proventos: 87,
          descontos: 6.55
        },
        {
          name: 'Donut',
          base: 452,
          efetiva: 25.0,
          proventos: 51,
          descontos: 4.92
        },
        {
          name: 'KitKat',
          base: 518,
          efetiva: 26.0,
          proventos: 65,
          descontos: 7
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
  // computed: {
  //   model: {
  //     get () {
  //       return this.$store.state.calculadora.model
  //     },
  //     set (value) {
  //       return this.$store.commit('calculadora/model', value)
  //     }
  //   }
  // },
  methods: {
    voltar () {
      this.$router.push('/')
    },
    exportar () {
      TableController.downloadXLSX(this.tableHeaders, this.model, this.colPattern, this.wscols)
    }
  },
  mounted () {
    console.log(this.model)
  }
}
</script>
