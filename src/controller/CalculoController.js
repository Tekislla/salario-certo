export const calcular = (modelSalBruto, modelDescFixo, modelPensaoAlimenticia, modelNumDependentes) => {
  const salBruto = modelSalBruto - modelDescFixo
  const descFixo = modelDescFixo
  const pensaoAlimenticia = modelPensaoAlimenticia
  const numDependentes = modelNumDependentes
  const descontoINSS = getDescontoINSS(salBruto)
  const salDescINSS = salBruto - descontoINSS
  const descontoIRRF = getDescontoIRRF(salDescINSS, numDependentes, pensaoAlimenticia)
  const salLiquido = salBruto - descontoINSS - descontoIRRF

  return {
    salBruto,
    descFixo,
    pensaoAlimenticia,
    numDependentes,
    descontoINSS,
    descontoIRRF,
    salLiquido
  }
}

export const getDescontoINSS = (salBruto) => {
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
}

export const getFaixaINSS = (salBruto) => {
  if (salBruto === 1302.00) {
    return '7.5%'
  } else if (salBruto > 1302.01 && salBruto < 2571.29) {
    return '9%'
  } else if (salBruto > 2571.30 && salBruto < 3856.94) {
    return '12%'
  } else if (salBruto > 3856.95 && salBruto < 7507.49) {
    return '14%'
  } else {
    return 'Teto'
  }
}

export const getDescontoIRRF = (salBruto, numDependentes, pensaoAlimenticia) => {
  let val = 0
  const descDependentes = numDependentes * 189.59
  if (salBruto < 1903.98) {
    return val
  } else if (salBruto > 1903.99 && salBruto < 2826.65) {
    val = (salBruto * 0.075) - 142.8 - descDependentes - pensaoAlimenticia
  } else if (salBruto > 2826.66 && salBruto < 3751.05) {
    val = (salBruto * 0.15) - 354.8 - descDependentes - pensaoAlimenticia
  } else if (salBruto > 3751.06 && salBruto < 4664.68) {
    val = (salBruto * 0.225) - 636.13 - descDependentes - pensaoAlimenticia
  } else {
    val = (salBruto * 0.275) - 869.36 - descDependentes - pensaoAlimenticia
  }
  if (val > 0) {
    return val
  } else {
    return 0
  }
}

export const getFaixaIRRF = (salBruto) => {
  if (salBruto < 1903.98) {
    return '0%'
  } else if (salBruto > 1903.99 && salBruto < 2826.65) {
    return '7.5%'
  } else if (salBruto > 2826.66 && salBruto < 3751.05) {
    return '15%'
  } else if (salBruto > 3751.06 && salBruto < 4664.68) {
    return '22.5%'
  } else {
    return '27.5%'
  }
}

export default { calcular, getDescontoINSS, getFaixaINSS, getDescontoIRRF, getFaixaIRRF }
