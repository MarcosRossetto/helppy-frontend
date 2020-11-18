import React, { ReactElement, useState, FormEvent } from 'react';
import { useHistory } from 'react-router-dom';
import PageHeader from '../../components/PageHeader';
import Input from '../../components/Input';

import './styles.css';
import apiCore from '../../services/apiCore';

function Login(): ReactElement {
  const history = useHistory();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


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
              value={email}
              onChange={(e) => { setEmail(e.target.value) }}
            />

            <Input
              name="senha"
              label="Senha"
              value={password}
              onChange={(e) => { setPassword(e.target.value) }}
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