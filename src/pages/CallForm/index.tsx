import React, { ReactElement, useState, FormEvent , useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import PageHeader from '../../components/PageHeader';
import Input from '../../components/Input';
import Textarea from '../../components/Textarea';
import Select from '../../components/Select';

import warningIcon from '../../assets/images/icons/warning.svg';

import './styles.css';
import apiCore from '../../services/apiCore';
import apiCep from '../../services/apiCep'

// import cpfMask from '../../services/cpfMask'
import cepMask from '../../utils/masks/cepMask'
import phoneMask from '../../utils/masks/phoneMask'

import { testAddressNumber, testCategory, testCep, testDescription, testEmail, testName, testWeekday, testWhatsapp } from '../../utils/validations/validateInput'



function CallForm(): ReactElement {
  const history = useHistory();

  const [name, setName] = useState('');
  const [errorsName, setErrorsName] = useState({ type: false, msg: '' })

  const [email, setEmail] = useState('');
  const [errorsEmail, setErrorsEmail] = useState({ type: false, msg: '' })

  const [whatsapp, setWhatsapp] = useState('');
  const [errorsWhatsapp, setErrorsWhatsapp] = useState({ type: false, msg: '' })

  const [cep, setCep] = useState('');
  const [errorsCep, setErrorsCep] = useState({ type: false, msg: '' })

  const [address, setAddress] = useState('');
  const [addressDistrict, setAddressDistrict] = useState('');
  const [addressUf, setAddressUf] = useState('');

  const [addressNumber, setAddressNumber] = useState('');
  const [errorsAddressNumber, setErrorsAddressNumber] = useState({ type: false, msg: '' })


  // const [cpf, setCpf] = useState('');

  const [category, setCategory] = useState('')
  const [errorsCategory, setErrorsCategory] = useState({ type: false, msg: '' })

  const [listCategory, setListCategory] = useState([])

  const [description, setDescription] = useState('');
  const [errorsDescription, setErrorsDescription] = useState({ type: false, msg: '' })

  const [schedule, setSchedule] = useState('')
  const [errorsSchedule, setErrorsSchedule] = useState({ type: false, msg: '' })

  const [listSchedule, setListSchedule] = useState([])

  async function searchAddress(e) {
    setCep(cepMask(e.target.value))
    const cepUnmasked = e.target.value.replace(/\D/g, '')
    setErrorsCep(testCep(cepUnmasked))

    if(cepUnmasked.length < 8) return

    try {
      const response = await apiCep.get(`${cepUnmasked}/json`)
      if(response.data.erro) {
        setErrorsCep(testCep(cepUnmasked, true))
        setAddress('')
        setAddressDistrict('')
        setAddressUf('')
        return
      }
      setAddress(response.data.logradouro)
      setAddressDistrict(response.data.bairro)
      setAddressUf(response.data.uf)
    } catch(error) {
      alert('Erro ao buscar CEP')
    }
  }

  function validateWhatsapp(e) {
    setWhatsapp(phoneMask(e.target.value))
    setErrorsWhatsapp(testWhatsapp(e.target.value))
  }

  function validateName(e) {
    setName(e.target.value)
    setErrorsName(testName(e.target.value))
  }

  function validateEmail(e) {
    setEmail(e.target.value)
    setErrorsEmail(testEmail(e.target.value))
  }

  function validateAddressNumber(e) {
    setAddressNumber(e.target.value)
    setErrorsAddressNumber(testAddressNumber(e.target.value))
  }

  function validateCategory(e) {
    setCategory(e.target.value)
    setErrorsCategory(testCategory(e.target.value))
  }

  function validateDescription(e) {
    setDescription(e.target.value)
    setErrorsDescription(testDescription(e.target.value))
  }

  function validateWeekday(e) {
    setSchedule(e.target.value)
    setErrorsSchedule(testWeekday(e.target.value))
    }

  async function handleCreateClass(e: FormEvent) {
    e.preventDefault();
    const validForm = [name, email, whatsapp, cep, addressNumber, category, description, schedule]
    if(validForm.indexOf('') !== -1
      || testName(name).type === true
      || testEmail(email).type === true
      || testWhatsapp(whatsapp).type === true
      || testCep(cep).type === true
      || testAddressNumber(addressNumber).type === true
      || testCategory(category).type === true
      || testDescription(description).type === true
      || testWeekday(schedule).type === true) {
      setErrorsName(testName(name))
      setErrorsEmail(testEmail(email))
      setErrorsWhatsapp(testWhatsapp(whatsapp))
      setErrorsCep(testCep(cep))
      setErrorsAddressNumber(testAddressNumber(addressNumber))
      setErrorsCategory(testCategory(category))
      setErrorsDescription(testDescription(description))
      setErrorsSchedule(testWeekday(schedule))
      alert('Erro no formulário.')
      return
    }
    try {
      const response = await apiCore.post('/calls', {
        user: {
          name,
          email,
          whatsapp,
          address: {
            cep,
            address,
            district: addressDistrict,
            uf: addressUf,
            number: addressNumber,
          },
        },
        description,
        category,
        schedule,
      })
      if(response.status === 201) {
        alert('Cadastro realizado com sucesso. Um email de confirmação foi enviado. Obs: Verifique sua caixa de spam, caso necessário.')
        history.push('/')
      }
      else alert('Erro ao cadastrar usuário')
    } catch (error) {
      alert('Unexpected error.')
    }

  }

  useEffect(() => {
    apiCore.get('categories-calls').then(response => {
      const newCategory = response.data.category.map(item => {
        return { id: item.id, name: item.category }
      })
      setListCategory(newCategory)
    })
    apiCore.get('schedules/active').then(response => {
      const newSchedule = response.data.schedule.map(item => {
        return { id: item.id, name: item.schedule }
      })
      setListSchedule(newSchedule)
    })
  }, [])

  return (
    <div id="page-call-form" className="container">
      <PageHeader
        title="Precisamos saber mais sobre você."
        description="O primeiro passo é preencher esse formulário."
      />

      <main>
        <form onSubmit={handleCreateClass}>
          <fieldset>
            <legend>Seus dados</legend>
            <Input
              name="name"
              label="Nome Completo"
              error={errorsName}
              value={name}
              onChange={validateName}
            />

            <Input
              name="email"
              label="Email"
              error={errorsEmail}
              value={email}
              onChange={validateEmail}
            />

            {/* <Input
              name="cpf"
              label="CPF"
              value={cpf}
              onChange={(e) => { setCpf(cpfMask(e.target.value)) }}
              maxLength={14}
            /> */}

            <Input
              name="whatsapp"
              error={errorsWhatsapp}
              label="WhatsApp"
              value={whatsapp}
              onChange={validateWhatsapp}
              maxLength={15}
            />

            <Input
              name="cep1"
              label="CEP"
              value={cep}
              error={errorsCep}
              onChange={searchAddress}
              maxLength={9}
            />

            <Input
              name="address"
              label="Logradouro"
              error={{ type: false }}
              value={address}
              disabled
            />

            <div className="input-address">
              <Input 
                name="district"
                label="Bairro"
                error={{ type: false }}
                value={addressDistrict}
                disabled
              />

              <Input 
                name="uf"
                label="UF"
                error={{ type: false }}
                value={addressUf}
                disabled
              />
              
              <Input 
                name="number"
                label="Número"
                error={errorsAddressNumber}
                value={addressNumber}
                onChange={validateAddressNumber}
                maxLength={8}
              />
            </div>

          </fieldset>

          <fieldset>
            <legend>Sobre o chamado</legend>
            <Select
              name="category"
              label="Categoria"
              error={errorsCategory}
              value={category}
              onChange={validateCategory}
              options={listCategory}
            />
            
            <Textarea
              name="description"
              label="Descrição"
              error={errorsDescription}
              value={description}
              onChange={validateDescription}
            />
          </fieldset>

          <fieldset>
            <legend>
              Horários Disponíveis
            </legend>
            <Select
              name="schedule"
              label="Dia da Semana"
              error={errorsSchedule}
              value={schedule}
              onChange={validateWeekday}
              options={listSchedule}
            />
          </fieldset>

          <footer>
            <p>
              <img src={warningIcon} alt="Aviso importante" />
              Importante! 
              {' '}
              <br />
              Preencha todos os dados
            </p>
            <button type="submit">
              Salvar Chamado
            </button>
          </footer>
        </form>
      </main>
    </div>
  );
}

export default CallForm;