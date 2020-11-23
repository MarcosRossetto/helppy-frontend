function cepMask(value: string): string {
  return value
    .replace(/\D/g, '')
    .replace(/^([\d]{2})\.?([\d]{3})-?([\d]{3})/, '$1$2-$3')

}

export default cepMask