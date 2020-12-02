import React, { FormEvent, useEffect, useState } from 'react';

import './styles.css';

import { useHistory } from 'react-router-dom'
import whastappIcon from '../../assets/images/icons/whatsapp.svg';
import checkIcon from '../../assets/images/icons/check-mark-2.svg'

import Textarea from '../Textarea'
import apiCore from '../../services/apiCore'

export interface Call {
  description: string
  solution: string
  completed: number
  id: string
  created_at: string
  closing_date: string
  schedule: string
  category: string
  user: string
}
interface CallItemProps {
  call: Call
}

function formatDate(value: string): string {
  if(!value || value === '') return 'Em aberto'
  
  const date = value.substring(0,10)
                    .replaceAll('-', '/')
                    .split('/')
  return `${date[2]}/${date[1]}/${date[0]}`
}


const CallItem: React.FC<CallItemProps> = ({ call }: CallItemProps) => {
  const history = useHistory()
  const [user, setUser] = useState({name: '', whatsapp: '', email: '', cep: '', address: '', district: '', number: '', uf: ''})
  const [schedule, setSchedule] = useState('')
  const [category, setCategory] = useState('')
  const [solution, setSolution] = useState(call.solution)

  async function handleAlterCall(e: FormEvent) {
    e.preventDefault()
    try {
      const response = await apiCore.put(`calls/${call.id}`, {
        solution,
      })
      if(response.status === 204) {
        alert('Atualizado com sucesso')
        history.push('/call-list')
      }
      else alert('Erro ao atualizar')
    } catch (error) {
      alert('Unexpected error.')
    }
  }

  useEffect(() => {
    apiCore.get(`users/${call.user}`).then(response => {
      const newUser = response.data.user[0]
      setUser({name: newUser.name, whatsapp: newUser.whatsapp, email: newUser.email, cep: newUser.cep, address: newUser.address, district: newUser.district, number: newUser.number, uf: newUser.uf })
    })

    apiCore.get(`schedules/filter/id/${call.schedule}`).then(response => {
      const newSchedule = response.data.schedule[0]
      setSchedule(newSchedule.schedule)
    })

    apiCore.get(`categories-calls/${call.category}`).then(response => {
      const newCategory = response.data.category[0]
      setCategory(newCategory.category)
    })
  }, [])

  return (
    <article className="teacher-item">
      <header>
        <div>
          <p>
            <strong className="title">{`${user.name} - ${user.email}`}</strong>
          </p>
          <span>
            <strong>Categoria:</strong>
            <br />
            {category}
          </span>
          <br />
          <span>
            <strong>Dia da solicitação:</strong>
            <br />
            {formatDate(call.created_at)}
          </span>
          <span>
            <strong>Dia do agendamento:</strong>
            <br />
            {schedule}
          </span>
          <span>
            <strong>Dia da conclusão:</strong>
            <br />
            {formatDate(call.closing_date)}
          </span>
          <br />
          <p>
            <strong>Descrição:</strong>
            <br />
            {call.description}
          </p>
        </div>
      </header>  
      <div className="textarea">
        <p>
          <strong>Endereço: </strong>
          {`${user.address}, ${user.number}, ${user.district} - ${user.uf}`}
        </p>
        <p>
          <strong>CEP: </strong>
          {user.cep}
        </p>
      </div>

      <div className="textarea">
        <strong>Solução:</strong>
        <br />
        <Textarea 
          label=""
          value={solution || ''}
          onChange={e => setSolution(e.target.value)}
          name="solution"
          error={{type: false, msg: ''}}
        />
      </div>

      <footer>
        <button
          style={{width: '15rem'}}
          onClick={handleAlterCall}
          type="button"
        >
          <img src={checkIcon} alt="check" />
          Salvar
        </button>
        <a
          target="_blank"
          href={`https://wa.me/+55${user.whatsapp}`}
          type="button"
        >
          <img src={whastappIcon} alt="Whatsapp" />
          Entrar em contato
        </a>
      </footer>
    </article>
  )
}

export default CallItem;
