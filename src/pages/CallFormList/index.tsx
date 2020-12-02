import React, { ReactElement, useState, FormEvent, useEffect } from 'react'
import apiCore from '../../services/apiCore'
import PageHeader from '../../components/PageHeader'
import CallItem, { Call } from '../../components/CallItem'

import Input from '../../components/Input'

import './styles.css'

function CallList(): ReactElement {
  const [name, setName] = useState('')
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')

  const [calls, setCalls] = useState([])

  async function searchCalls(e: FormEvent) {
    e.preventDefault()
    if(!name && !from && !to) {
      apiCore.get('calls').then(response => {
        setCalls(response.data.users)
      })
      return
    }
    if(from !== '' && to !== '') {
      const fromDate = Date.parse(from)
      const toDate = Date.parse(to)
      if(fromDate > toDate) {
        const x = from
        setFrom(to)
        setTo(x)
      }
    }
    if(name !== '' && !from && !to) {
      const response =  await apiCore.get(`calls/filter/user/${name}`)
      setCalls(response.data.calls)
      return
    }
    if(!name && (from !== '' || to !== '')) {
      const response = await apiCore.get(`calls/filter/date/?from=${from}&to=${to}`)
      setCalls(response.data.calls)
      return
    }
    if(name !== '' && (from !== '' || to !== '')){
      const response = await apiCore.get(`calls/date/user/?name=${name}&from=${from}&to=${to}`)
      setCalls(response.data.calls)
      
    }
  }

  useEffect(() => {
    apiCore.get('calls').then(response => {
    setCalls(response.data.users)
    })
  }, [])

  return (
    <div id="page-teacher-list" className="container">
      <PageHeader title="Área Administrativa.">
        <div className="teste">
          <button type="button" className="button-teste">
            <p>Chamados</p>
          </button>
          <button type="button" className="button-teste">
            <p>Agendamentos</p>
          </button>
          <button type="button" className="button-teste">
            <p>Categorias</p>
          </button>
        </div>
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
            value={from}
            onChange={e => { setFrom(e.target.value) }}
          />
          <Input 
            name="to" 
            label="Até"
            error={{ type: false, msg: '' }}
            type="date" 
            value={to}
            onChange={e => { setTo(e.target.value) }}
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
