import React, { ReactElement, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import apiCore from '../../services/apiCore'

import './styles.css'

import logoImg from '../../assets/images/logo.svg'
import landingImg from '../../assets/images/landing.svg'

import studyIcon from '../../assets/images/icons/study.svg'
import whiteHeartIcon from '../../assets/images/icons/white-heart.svg'

function Landing(): ReactElement {
  const [totalConnections, settotalConnections] = useState(0)

  useEffect(() => {
    apiCore.get('connections').then(response => {
      const { total } = response.data

      settotalConnections(total)
    })
  }, [])

  return (
    <div id="page-landing">
      <div id="page-landing-content" className="container">
        <div className="logo-container">
          <img src={logoImg} alt="Helppy" />
          <h2>Sua plataforma de Help Desk.</h2>
        </div>
        <img src={landingImg} alt="Plataforma de help desk" className="hero-image" />

        <div className="buttons-container">
          <Link to="/study" className="study">
            <img src={studyIcon} alt="Estudar" />
            Abrir Chamado
          </Link>
        </div>

        <span className="total-connections">
          Total de
          {' '}
          {totalConnections}
          {' '}
          conexões já realizadas
          <img src={whiteHeartIcon} alt="Coração branco" />
        </span>
      </div>
    </div>
  )
}

export default Landing