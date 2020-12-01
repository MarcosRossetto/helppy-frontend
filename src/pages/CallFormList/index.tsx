import React, { ReactElement, useState, FormEvent, useEffect } from 'react'
import apiCore from '../../services/apiCore'
import PageHeader from '../../components/PageHeader'
import CallItem, { Call } from '../../components/CallItem'

import Input from '../../components/Input'

import './styles.css'

function CallList(): ReactElement {
  const [name, setName] = useState('')
  const [weekDay, setWeekDay] = useState('')
  const [time, setTime] = useState('')

  const [calls, setCalls] = useState([])

  async function searchCalls(e: FormEvent) {
    e.preventDefault()
    // const response = await apiCore.get('calls')
  }

  useEffect(() => {
    apiCore.get('calls').then(response => {
    setCalls(response.data.users)
    })
  }, [])

  return (
    <div id="page-teacher-list" className="container">
      <PageHeader title="Área Administrativa - Chamados.">
        <form id="search-teachers" onSubmit={searchCalls}>
          <Input
            name="name"
            label="Nome"
            error={{ type: false, msg: '' }}
            value={name}
            onChange={e => { setName(e.target.value) }}
          />
          <Input
            name="week_day"
            label="De"
            error={{ type: false, msg: '' }}
            type="date"
            value={weekDay}
            onChange={e => { setWeekDay(e.target.value) }}
          />
          <Input 
            name="time" 
            label="Até"
            error={{ type: false, msg: '' }}
            type="date" 
            value={time}
            onChange={e => { setTime(e.target.value) }}
          />

          <button type="submit">Buscar</button>
        </form>
      </PageHeader>

      <main>
        {calls.map((call: Call) => {
          return <CallItem key={call.id} call={call} />
        })}
      </main>
    </div>
  )
}

export default CallList
