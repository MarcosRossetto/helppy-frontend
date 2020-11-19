import React, { ReactElement, useState, FormEvent } from 'react';
import { useHistory } from 'react-router-dom';
import PageHeader from '../../components/PageHeader';
import Input from '../../components/Input';

import './styles.css';
import apiCore from '../../services/apiCore';

function Login(): ReactElement {
  const history = useHistory();

  const [email, setEmail] = useState('');
  const[errorsEmail, setErrorsEmail] = useState({ type: false, msg: '' })

  const [password, setPassword] = useState('');
  const[errorsPassword, setErrorsPassword] = useState({ type: false, msg: '' })

  function handleCreateClass(e: FormEvent) {
    e.preventDefault();

    apiCore.post('classes', {
      email,
      password,
    }).then(() => {
      alert('Cadastro realizado com sucesso!');

      history.push('/');
    }).catch(() => {
      alert('Erro no cadastro.');
    });
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
    function validatePassword(e: any) {
      setPassword(e.target.value)
      if(e.target.value.length < 6){
        setErrorsPassword({ type: true, msg: 'não pode ser vazio e deve conter ao menos 6 caracteres.' })
      }
      else {
        setErrorsPassword({ type: false, msg: '' })
      }
    }

  return (
    <div id="page-login-form" className="container">
      <PageHeader
        title="Login Administrativo."
      />

      <main>
        <form onSubmit={handleCreateClass}>
          <fieldset>
            <legend>Login</legend>
            <Input
              name="email"
              label="Email"
              error={errorsEmail}
              value={email}
              onChange={validateEmail}
            />

            <Input
              name="senha"
              label="Senha"
              error={errorsPassword}
              value={password}
              onChange={validatePassword}
              type="password"
            />
          </fieldset>
          <footer>
            <button type="submit" className="login-button">
              Login
            </button>
          </footer>
        </form>
      </main>
    </div>
  );
}

export default Login;