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
import cepMask from '../../services/masks/cepMask'
import phoneMask from '../../services/masks/phoneMask'

function CallForm(): ReactElement {
  const history = useHistory();

  const [name, setName] = useState('');
  const [errorsName, setErrorsName] = useState({ type: false, msg: '' })

  const [email, setEmail] = useState('');
  const[errorsEmail, setErrorsEmail] = useState({ type: false, msg: '' })

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
  const [category, setSubject] = useState('');

  const [scheduleItems, setScheduleItems] = useState([
    { week_day: 0, from: '', to: '' },
  ]);


  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function searchAddress(e: any) {
    const cep1 = cepMask(e.target.value)
    setCep(cep1)
    const validCep = /^[0-9]{8}$/
    if(!cep1 || cep1.length < 8) {
      setErrorsCep({ type: true, msg: 'não pode ser vazio e deve conter 8 números.' })
    }
    const cepUnmask = cep1.replace(/\D/g, '')
    if(validCep.test(cepUnmask)){
      apiCep.get(`${cepUnmask}/json`).then((data) => {
        const addressData = data.data
        if(addressData.erro === true) setErrorsCep({ type: true, msg: 'inválido.' })
        else {
        setErrorsCep({ type: false, msg: '' })
        setAddress(addressData.logradouro)
        setAddressDistrict(addressData.bairro)
        setAddressUf(addressData.uf)
        }
      }).catch(() => {
        alert('Erro ao buscar CEP')
      })
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function validateWhatsapp(e: any) {
    setWhatsapp(phoneMask(e.target.value))
    if(e.target.value.length < 15) {
      setErrorsWhatsapp({ type: true, msg: 'não pode ser vazio e deve conter 11 números.' })
    }
    else {
    setErrorsWhatsapp({ type: false, msg: '' })
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function validateName(e: any) {
    setName(e.target.value)
    if(e.target.value.length < 3) {
      setErrorsName({ type: true, msg: 'não pode ser vazio e deve conter ao menos 3 letras.' })
    }
    else {
    setErrorsName({ type: false, msg: '' })
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function validateEmail(e: any) {
    setEmail(e.target.value)
    if(e.target.value.length < 5){
      setErrorsEmail({ type: true, msg: 'não pode ser vazio e deve conter ao menos 5 caracteres.' })
    }
    else {
      setErrorsEmail({ type: false, msg: '' })
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function validateAddressNumber(e: any) {
    setAddressNumber(e.target.value)
    if(e.target.value.length < 1){
      setErrorsAddressNumber({ type: true, msg: 'não pode ser vazio.' })
    }
    else {
      setErrorsAddressNumber({ type: false, msg: '' })
    }
  }

  function handleCreateClass(e: FormEvent) {
    e.preventDefault();

    apiCore.post('classes', {
      name,
      email,
      whatsapp,
      desc,
      category,
      schedule: scheduleItems,
    }).then(() => {
      alert('Cadastro realizado com sucesso!');

      history.push('/');
    }).catch(() => {
      alert('Erro no cadastro.');
    });
  }

  function setScheduleItemValue(position: number, field: string, value: string) {
    const updateScheduleItems = scheduleItems.map((scheduleItem, index) => {
      if (index === position) {
        return { ...scheduleItem, [field]: value };
      }

      return scheduleItem;
    });

    setScheduleItems(updateScheduleItems);
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
              />
            </div>

          </fieldset>

          <fieldset>
            <legend>Sobre o chamado</legend>
            <Select
              name="category"
              label="Categoria"
              value={category}
              onChange={(e) => { setSubject(e.target.value) }}
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
            {scheduleItems.map((scheduleItem, index) => {
              return (
                <div key={index} className="schedule-item">
                  <Select
                    name="week_day"
                    label="Dia da Semana"
                    value={scheduleItem.week_day}
                    onChange={e => setScheduleItemValue(index, 'week_day', e.target.value)}
                    options={[
                      { value: '0', label: '18/11/2020, 08:00' },
                      { value: '1', label: '18/11/2020, 13:30' },
                      { value: '2', label: '20/11/2020, 08:00' },
                      { value: '3', label: '21/11/2020, 13:30' },
                      { value: '4', label: '22/11/2020, 08:00' },
                      { value: '5', label: '22/11/2020, 13:30' },
                    ]}
                  />
                </div>
              );
            })}
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