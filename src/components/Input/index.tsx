import React, { InputHTMLAttributes } from 'react'

import './styles.css'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  name: string
  error: {
    type: boolean,
    msg?: string
  }
}

const Input: React.FC<InputProps> = ({ label, name, error, ...rest }: InputProps) => (
  <div className={`input-block ${ error.type ? 'error' : '' }`}>
    <label className={`${ error.type ? 'error-label' : 'success-label' }`} htmlFor={name}>{`${label} ${error.type ? error.msg : ''}`}</label>
    <br />
    <input type="text" id={name} {...rest} />
  </div>
)

export default Input
