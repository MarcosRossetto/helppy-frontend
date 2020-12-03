import React, { FormEvent } from 'react';

import './styles.css';

import { useHistory } from 'react-router-dom'
import deleteIcon from '../../assets/images/icons/delete.svg'

import apiCore from '../../services/apiCore'

export interface Category {
  id: string
  category: string
}
interface CategoryItemProps {
  category: Category
}


const CategoryItem: React.FC<CategoryItemProps> = ({ category }: CategoryItemProps) => {
  const history = useHistory()

  async function handleAlterCategory(e: FormEvent) {
    e.preventDefault()
    try {
      const response = await apiCore.delete(`categories-calls/${category.id}`)
      if(response.status === 204) {
        history.push('/admin/categories-list')
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
            <strong className="title">{`${category.category}`}</strong>
          </p>
        </div>
      </header>
      <footer>
        <button
          style={{width: '15rem'}}
          onClick={handleAlterCategory}
          type="button"
        >
          <img src={deleteIcon} alt="delete" />
          Excluir
        </button>
      </footer>
    </article>
  )
}

export default CategoryItem;
