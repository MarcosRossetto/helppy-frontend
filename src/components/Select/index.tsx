import React, { SelectHTMLAttributes } from 'react'

import './styles.css'

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string
  name: string
  options: Array<{
    id: string
    name: string
  }>
  error: {
    type: boolean
    msg: string
  }
}

const Select: React.FC<SelectProps> = ({ label, name, error, options, ...rest }: SelectProps) => {
  return (
    <div className="select-block">
      <label className={`${ error.type ? 'error-label' : 'success-label' }`} htmlFor={name}>{`${label} ${error.type ? error.msg : ''}`}</label>
      <select value="" id={name} {...rest}>
        <option value="" disabled hidden>Selecione uma opção</option>
        {options.map(option => {
          return <option key={option.id} value={option.id}>{option.name}</option>
        })}
      </select>
    </div>
  )
}

export default Select