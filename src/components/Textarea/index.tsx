import React, { TextareaHTMLAttributes } from 'react'

import './styles.css'

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string
  name: string
  error: {
    type: boolean,
    msg: string
  }
}

const Textarea: React.FC<TextareaProps> = ({ label, error, name, ...rest }: TextareaProps) => {
  return (
    <div className="textarea-block">
      <label className={`${ error.type ? 'error-label' : 'success-label' }`} htmlFor={name}>{`${label} ${error.type ? error.msg : ''}`}</label>
      <textarea id={name} {...rest} />
    </div>
  )
}

export default Textarea