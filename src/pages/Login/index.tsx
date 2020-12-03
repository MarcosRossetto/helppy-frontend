import React, { ReactElement, useState, FormEvent } from 'react'
import { useHistory } from 'react-router-dom'
import PageHeader from '../../components/PageHeader'
import Input from '../../components/Input'

import './styles.css'
import { testEmail, testPassword } from '../../utils/validations/validateInput'

function Login(): ReactElement {
  const history = useHistory();

  const [email, setEmail] = useState('');
  const [errorsEmail, setErrorsEmail] = useState({ type: false, msg: '' })

  const [password, setPassword] = useState('');
  const [errorsPassword, setErrorsPassword] = useState({ type: false, msg: '' })

  function handleCreateClass(e: FormEvent) {
    e.preventDefault();
    const validForm = [email, password]
    if(validForm.indexOf('') !== -1 || testPassword(password).type === true || testEmail(email).type === true) {
      setErrorsEmail(testEmail(email))
      setErrorsPassword(testPassword(password))
      alert('Login Inválido')
      return
    }

    history.push('/admin/call-list')


    // apiCore.post('classes', {
    //   email,
    //   password,
    // }).then(() => {
    //   alert('Login realizado com sucesso!')

    // }).catch(() => {
    //   alert('Erro no login.')
    // })
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function validateEmail(e: any) {
    setEmail(e.target.value)
    setErrorsEmail(testEmail(e.target.value))
  }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function validatePassword(e: any) {
      setPassword(e.target.value)
      setErrorsPassword(testPassword(e.target.value))
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