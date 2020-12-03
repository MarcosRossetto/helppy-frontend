import React, { ReactElement, useState, FormEvent, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import apiCore from '../../services/apiCore'
import PageHeader from '../../components/PageHeader'
import CategoryItem, { Category } from '../../components/CategoryItem'


import Input from '../../components/Input'

import './styles.css'

function CategoriesList(): ReactElement {
  const history = useHistory()
  const [category, setCategory] = useState('')

  const [categories, setCategories] = useState([])

  async function searchCalls(e: FormEvent) {
    e.preventDefault()
    
    try {
      const response = await apiCore.post('categories-calls', { category })
      if(response.status === 201) {
        history.push('/admin/categories-list')
        alert('Categoria criada com sucesso')
        window.location.reload()    
    }
    } catch (error) {
      alert('Categoria já cadastrada!')
    }
  }

  useEffect(() => {
    apiCore.get('categories-calls').then(response => {
    setCategories(response.data.category)
    })
  }, [])



  return (
    <div id="page-teacher-list" className="container">
      <PageHeader title="Área Administrativa.">
        <div className="link">
          <Link to="/admin/call-list" className="button-link">
            <p>Chamados</p>
          </Link>
          <Link to="/admin/schedule-list" className="button-link">
            <p>Agendamentos</p>
          </Link>
          <Link to="/admin/categories-list" className="button-link current-page">
            <p>Categorias</p>
          </Link>
        </div>
        <form id="search-teachers" onSubmit={searchCalls}>
          <Input
            name="category"
            label="Categoria"
            error={{ type: false, msg: '' }}
            value={category}
            onChange={e => { setCategory(e.target.value) }}
          />

          <button type="submit">Salvar</button>
        </form>
      </PageHeader>

      <main>
        {categories.map((categoryItem: Category) => {
          return <CategoryItem key={categoryItem.id} category={categoryItem} />
        })}
      </main>
    </div>
  )
}

export default CategoriesList
