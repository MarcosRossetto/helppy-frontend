import React, { ReactElement, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import apiCore from '../../services/apiCore'

import landingImg from '../../assets/images/landing.svg'

import studyIcon from '../../assets/images/icons/study.svg'
import admIcon from '../../assets/images/icons/warning.svg'
import whiteHeartIcon from '../../assets/images/icons/white-heart.svg'

import './styles.css'

function Landing(): ReactElement {
  const logoImg = 'https://fontmeme.com/permalink/201116/ccf8651217956c62bc599c5559f05080.png'
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
          <img src={logoImg} alt="Helppy" className="logo-image" />
          <h2>Sua plataforma de Help Desk.</h2>
        </div>
        <img src={landingImg} alt="Plataforma de help desk" className="hero-image" />

        <div className="buttons-container">
          <Link to="/call-form" className="call">
            <img src={studyIcon} alt="Abrir Chamado" />
            Abrir Chamado
          </Link>
          <Link to="/login" className="login">
            Login
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