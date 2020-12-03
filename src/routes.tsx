import React, { ReactElement } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Landing from './pages/Landing'
import CallForm from './pages/CallForm'
import CallFormList from './pages/CallFormList'
import ScheduleList from './pages/ScheduleList'
import Login from './pages/Login'
import NotFound from './pages/NotFound'

function Routes(): ReactElement {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Landing} />
        <Route path="/call-form" exact component={CallForm} />
        <Route path="/login" exact component={Login} />
        <Route path="/call-list" exact component={CallFormList} />
        <Route path="/schedule-list" exact component={ScheduleList} />
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  )
}

export default Routes