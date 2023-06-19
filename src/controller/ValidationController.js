export const validarDados = (salBruto, descFixo, pensaoAlimenticia, numDependentes) => {
  const res = {
    valido: false,
    msg: ''
  }
  if (salBruto === 0) {
    res.msg = 'Salário bruto não pode ser R$ 0,00'
  } else if (salBruto < 1302.00) {
    res.msg = 'O salário informado precisa ser acima de um salário mínimo'
  } else if (salBruto === null || salBruto === undefined || salBruto === '') {
    res.msg = 'Informe um valor para o salário bruto'
  } else if (descFixo === null || descFixo === undefined || descFixo === '') {
    res.msg = 'Informe um valor de descontos fixos (caso não haja, deixe 0)'
  } else if (pensaoAlimenticia === null || pensaoAlimenticia === undefined || pensaoAlimenticia === '') {
    res.msg = 'Informe um valor de pensão alimentícia paga (caso não haja, deixe 0)'
  } else if (numDependentes === null || numDependentes === undefined || numDependentes === '') {
    res.msg = 'Informe um número de dependentes (caso não haja, deixe 0)'
  } else {
    res.valido = true
  }

  return res
}

export default { validarDados }
