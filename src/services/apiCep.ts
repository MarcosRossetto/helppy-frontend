import axios from 'axios'

const apiCep = axios.create({
  baseURL: 'viacep.com.br/ws',
})

export default apiCep