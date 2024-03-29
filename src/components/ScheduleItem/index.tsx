import React, { FormEvent } from 'react';

import './styles.css';

import { useHistory } from 'react-router-dom'
import deleteIcon from '../../assets/images/icons/delete.svg'

import apiCore from '../../services/apiCore'

export interface Schedule {
  id: string
  schedule: string
  active: boolean
}
interface ScheduleItemProps {
  schedule: Schedule
}


const ScheduleItem: React.FC<ScheduleItemProps> = ({ schedule }: ScheduleItemProps) => {
  const history = useHistory()

  async function handleAlterSchedule(e: FormEvent) {
    e.preventDefault()
    try {
      const response = await apiCore.delete(`schedules/${schedule.id}`)
      if(response.status === 204) {
        history.push('/admin/schedule-list')
        alert('Deletado com sucesso')
        window.location.reload()
      }
      else alert('Erro ao deletar')
    } catch (error) {
      alert('Unexpected error.')
    }
  }

  return (
    <article className="teacher-item">
      <header>
        <div>
          <p>
            <strong className="title">{`${schedule.schedule}`}</strong>
          </p>
        </div>
      </header>
      <footer>
        <button
          style={{width: '15rem'}}
          onClick={handleAlterSchedule}
          type="button"
        >
          <img src={deleteIcon} alt="check" />
          Excluir
        </button>
      </footer>
    </article>
  )
}

export default ScheduleItem;
