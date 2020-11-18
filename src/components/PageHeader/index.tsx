import React, { ReactNode } from 'react'
import { Link } from 'react-router-dom'

import backIcon from '../../assets/images/icons/back.svg'

import './styles.css'

const logoImg = 'https://fontmeme.com/permalink/201116/ccf8651217956c62bc599c5559f05080.png'

interface PageHeaderProps {
  title: string
  description?: string
  children?: ReactNode
}

const PageHeader: React.FC<PageHeaderProps> =
  ({ title, description, children }: PageHeaderProps) => (
    <header className="page-header">
      <div className="top-bar-container">
        <Link to="/">
          <img src={backIcon} alt="Voltar" />
        </Link>
        <img src={logoImg} alt="Proffy" />
      </div>

      <div className="header-content">
        <strong>{title}</strong>
        {description && <p>{description}</p>}

        {children}
      </div>
    </header>
  )

export default PageHeader
