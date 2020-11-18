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

function TeacherForm(): ReactElement {
  const history = useHistory();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [desc, setDesc] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [address, setAddress] = useState('');
  const [addressNumber, setAddressNumber] = useState('');
  const [addressDistrict, setAddressDistrict] = useState('');
  const [addressUf, setAddressUf] = useState('');

  const [category, setSubject] = useState('');

  const [scheduleItems, setScheduleItems] = useState([
    { week_day: 0, from: '', to: '' },
  ]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function searchAddress(e: any) {
    const cep = e.target.value
    const validCep = /^[0-9]{8}$/
    if(!cep || cep.length < 8) return
    
    if(validCep.test(cep)){
      apiCep.get(`${cep}/json`).then((data) => {
        const addressData = data.data
        setAddress(addressData.logradouro)
        setAddressDistrict(addressData.bairro)
        setAddressUf(addressData.uf)
      }).catch(() => {
        alert('Erro ao buscar CEP')
      })
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
              value={name}
              onChange={(e) => { setName(e.target.value) }}
            />

            <Input
              name="email"
              label="Email"
              value={email}
              onChange={(e) => { setEmail(e.target.value) }}
            />

            <Input
              name="whatsapp"
              label="WhatsApp"
              value={whatsapp}
              onChange={(e) => { setWhatsapp(e.target.value) }}
            />

            <Input
              name="cep"
              label="CEP"
              onChange={searchAddress}
              maxLength={8}
            />

            <Input
              name="address"
              label="Logradouro"
              value={address}
              disabled
            />

            <div className="input-address">
              <Input 
                name="district"
                label="Bairro"
                value={addressDistrict}
                disabled
              />

              <Input 
                name="uf"
                label="UF"
                value={addressUf}
                disabled
              />
              
              <Input 
                name="number"
                label="Número"
                value={addressNumber}
                onChange={(e) => { setAddressNumber(e.target.value) }}
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
              Salvar Cadastro
            </button>
          </footer>
        </form>
      </main>
    </div>
  );
}

export default TeacherForm;