import React, { ReactElement, useState, FormEvent } from 'react';
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

import { testAddressNumber, testCategory, testCep, testEmail, testName, testWeekday, testWhatsapp } from '../../utils/validations/validateInput'

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

  const [desc, setDesc] = useState('');

  const [category, setCategory] = useState('');
  const [errorsCategory, setErrorsCategory] = useState({ type: false, msg: '' })

  const [weekday, setWeekday] = useState('')
  const [errorsWeekday, setErrorsWeekday] = useState({ type: false, msg: '' })

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async function searchAddress(e: any) {
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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function validateWhatsapp(e: any) {
    setWhatsapp(phoneMask(e.target.value))
    setErrorsWhatsapp(testWhatsapp(e.target.value))
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function validateName(e: any) {
    setName(e.target.value)
    setErrorsName(testName(e.target.value))
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function validateEmail(e: any) {
    setEmail(e.target.value)
    setErrorsEmail(testEmail(e.target.value))
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function validateAddressNumber(e: any) {
    setAddressNumber(e.target.value)
    setErrorsAddressNumber(testAddressNumber(e.target.value))
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function validateCategory(e: any) {
    setCategory(e.target.value)
    setErrorsCategory(testCategory(e.target.value))
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function validateWeekday(e: any) {
    setWeekday(e.target.value)
      setErrorsWeekday(testWeekday(e.target.value))
    }

  function handleCreateClass(e: FormEvent) {
    e.preventDefault();
    const validForm = [name, email, whatsapp, cep, addressNumber, category, weekday]
    if(validForm.indexOf('') !== -1) {
      setErrorsName(testName(name))
      setErrorsEmail(testEmail(email))
      setErrorsWhatsapp(testWhatsapp(whatsapp))
      setErrorsCep(testCep(cep))
      setErrorsAddressNumber(testAddressNumber(addressNumber))
      setErrorsCategory(testCategory(category))
      setErrorsWeekday(testWeekday(weekday))
      return
    }

    apiCore.post('classes', {
      name,
      email,
      whatsapp,
      desc,
      category,
      weekday,
    }).then(() => {
      alert('Cadastro realizado com sucesso!');

      history.push('/');
    }).catch(() => {
      alert('Erro no cadastro.');
    });
  }

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
              options={[
                { value: 'Categoria1', label: 'Categoria1' },
                { value: 'Categoria2', label: 'Categoria2' },
                { value: 'Categoria3', label: 'Categoria3' },
                { value: 'Categoria4', label: 'Categoria4' },
              ]}
            />
            
            <Textarea
              name="desc"
              label="Descrição"
              value={desc}
              onChange={(e) => { setDesc(e.target.value) }}
            />
          </fieldset>

          <fieldset>
            <legend>
              Horários Disponíveis
            </legend>
            <Select
              name="weekday"
              label="Dia da Semana"
              error={errorsWeekday}
              value={weekday}
              onChange={validateWeekday}
              options={[
                { value: '0', label: '25/11/2020, 08:00' },
                { value: '1', label: '26/11/2020, 13:30' },
                { value: '2', label: '30/11/2020, 16:00' },
                { value: '3', label: '25/12/2020, 18:00' },
              ]}
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