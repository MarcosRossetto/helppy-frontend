interface InputError {
  type: boolean,
  msg: string
}

export function testName(value: string): InputError {
  const errors = {
    type: false,
    msg: '',
  }
  if(!value || value.length <= 0){
    errors.type = true
    errors.msg = 'não pode ser vazio.'
    return errors
  }
  if(value.length > 0 && value.length < 3) {
    errors.type = true
    errors.msg = 'precisa de ao menos 3 caracteres.'
    return errors
  }
  return errors
}

export function testEmail(value: string): InputError {
  const errors = {
    type: false,
    msg: '',
  }
  const validEmail = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/gi
  if(!value || value.length <= 0){
    errors.type = true
    errors.msg = 'não pode ser vazio.'
    return errors
  }
  if(!validEmail.test(value)){
    errors.type = true
    errors.msg = 'inválido.'
    return errors
  }
  return errors
}

export function testWhatsapp(value: string): InputError {
  const errors = {
    type: false,
    msg: '',
  }
  const validPhone = /\d\d(\d)\1{7,8}/
  if(validPhone.test(value.replace(/\D/g, ''))){
    errors.type = true
    errors.msg = 'inválido.'
    return errors
  }
  if(!value || value.length <= 0) {
    errors.type = true
    errors.msg = 'não pode ser vazio.'
    return errors
  }
  if(value.length < 15) {
    errors.type = true
    errors.msg = 'precisa de 11 caracteres.'
    return errors
  }
  return errors
}

export function testCep(value?: string, failCep?: boolean): InputError {
  const errors = {
    type: false,
    msg: '',
  }
  if(!value || value.length <= 0) {
    errors.type = true
    errors.msg = 'não pode ser vazio.'
    return errors
  }
  if(value.length < 8) {
    errors.type = true
    errors.msg = 'precisa de ao menos 8 caracteres.'
    return errors
  }
  if(failCep) {
    errors.type = true
    errors.msg = 'inválido.'
    return errors
  }
  return errors
}

export function testAddressNumber(value: string): InputError {
  const errors = {
    type: false,
    msg: '',
  }
  if(!value || value.length <= 0) {
    errors.type = true
    errors.msg = 'não pode ser vazio.'
    return errors
  }
  return errors
}

export function testCategory(value: string): InputError {
  const errors = {
    type: false,
    msg: '',
  }
  if(!value || value.length <= 0) {
    errors.type = true
    errors.msg = 'não pode ser vazio.'
    return errors
  }
  return errors
}

export function testWeekday(value: string): InputError {
  const errors = {
    type: false,
    msg: '',
  }
  if(!value || value.length <= 0) {
    errors.type = true
    errors.msg = 'não pode ser vazio.'
    return errors
  }
  return errors
}