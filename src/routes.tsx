import React, { ReactElement } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

import Landing from './pages/Landing'
import CallForm from './pages/CallForm'

function Routes(): ReactElement {
  return (
    <BrowserRouter>
      <Route path="/" exact component={Landing} />
      <Route path="/call-form" exact component={CallForm} />
    </BrowserRouter>
  )
}

export default Routes