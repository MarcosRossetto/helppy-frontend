import React, { ReactElement, useState, FormEvent, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import apiCore from '../../services/apiCore'
import PageHeader from '../../components/PageHeader'
import ScheduleItem, { Schedule } from '../../components/ScheduleItem'


import Input from '../../components/Input'

import './styles.css'

function ScheduleList(): ReactElement {
  const history = useHistory()
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')

  const [schedules, setSchedule] = useState([])

  function formatDate(value: string): string | void {
    if(!value || value === '') return alert('Digite a data corretamente!')
    
    const date = value.substring(0,10)
                      .replaceAll('-', '/')
                      .split('/')
    return `${date[2]}/${date[1]}/${date[0]}`
  }

  async function searchCalls(e: FormEvent) {
    e.preventDefault()
    const schedule = `${formatDate(from)}, ${to}`
    if(!from || !to) return
    
    try {
      const response = await apiCore.post('schedules', { schedule })
      if(response.status === 201) {
        history.push('/admin/schedule-list')
        alert('Agendamento criado com sucesso')
        window.location.reload()    
    }
    } catch (error) {
      alert('Data incorreta ou já cadastrada!')
    }
  }

  useEffect(() => {
    apiCore.get('schedules/active').then(response => {
    setSchedule(response.data.schedule)
    })
  }, [])



  return (
    <div id="page-teacher-list" className="container">
      <PageHeader title="Área Administrativa.">
        <div className="link">
          <Link to="/admin/call-list" className="button-link">
            <p>Chamados</p>
          </Link>
          <Link to="/admin/schedule-list" className="button-link current-page">
            <p>Agendamentos</p>
          </Link>
          <Link to="/admin/categories-list" className="button-link">
            <p>Categorias</p>
          </Link>
        </div>
        <form id="search-teachers" onSubmit={searchCalls}>
          <Input
            name="week_day"
            label="Dia"
            error={{ type: false, msg: '' }}
            type="date"
            value={from}
            onChange={e => { setFrom(e.target.value) }}
          />
          <Input 
            name="to" 
            label="Às"
            error={{ type: false, msg: '' }}
            type="time" 
            value={to}
            onChange={e => { setTo(e.target.value) }}
          />

          <button type="submit">Salvar</button>
        </form>
      </PageHeader>

      <main>
        {schedules.map((schedule: Schedule) => {
          return <ScheduleItem key={schedule.id} schedule={schedule} />
        })}
      </main>
    </div>
  )
}

export default ScheduleList
