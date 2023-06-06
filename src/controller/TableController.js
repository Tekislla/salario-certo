import * as XLSX from 'xlsx'

export const getDadosTabela = (headers, dadosBrutos) => {
  const dadosTabela = [
    dadosBrutos.salBruto,
    dadosBrutos.pensaoAlimenticia,
    dadosBrutos.numDependentes,
    dadosBrutos.descontoINSS,
    dadosBrutos.descontoIRRF,
    dadosBrutos.salLiquido
  ]

  return [
    headers,
    dadosTabela
  ]
}

export const formatTabela = (ws, colPattern, wsCols) => {
  ws.A2.z = colPattern
  ws.B2.z = colPattern
  ws.D2.z = colPattern
  ws.E2.z = colPattern
  ws.F2.z = colPattern
  ws['!cols'] = wsCols

  return ws
}

export const downloadXLSX = (headers, dadosBrutos, colPattern, wsCols) => {
  const wb = XLSX.utils.book_new()
  wb.Props = {
    Title: 'Salário certo',
    Subject: 'Salário certo',
    Author: 'Devbar',
    CreatedDate: new Date()
  }

  wb.SheetNames.push('Salário certo')

  const data = getDadosTabela(headers, dadosBrutos)
  const ws = XLSX.utils.aoa_to_sheet(data)

  wb.Sheets['Salário certo'] = formatTabela(ws, colPattern, wsCols)
  XLSX.writeFile(wb, 'salario_certo.xlsx')
}

export default { getDadosTabela, formatTabela, downloadXLSX }
