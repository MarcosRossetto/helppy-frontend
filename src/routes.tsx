import React, { ReactElement } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

import Landing from './pages/Landing'
import CallForm from './pages/CallForm'
import Login from './pages/Login'

function Routes(): ReactElement {
  return (
    <BrowserRouter>
      <Route path="/" exact component={Landing} />
      <Route path="/call-form" exact component={CallForm} />
      <Route path="/login" exact component={Login} />
    </BrowserRouter>
  )
}

export default Routes