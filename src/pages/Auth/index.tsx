import React, { useState, FormEvent } from 'react';

import logoImg from '../../assets/img/logo.svg';

import { Title, Logo, Form, Input, Button, Error } from './styles';

import api from '../../services/api';

// tipando componente no formato de funcao
const Auth: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [inputError, setInputError] = useState('');

  async function handleAuth(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();

    if (!email || !password) {
      setInputError('E-mail e Senha são obrigatórios');
    } else {
      const params = { email, password };
      try {
        const response = await api.post('sessions', params);
        console.log('response', response.data);
      } catch (err) {
        setInputError('Falha na Autenticação');
      }
    }
  }

  return (
    <>
      <Logo src={logoImg} alt="Logo" />
      <Title>Autenticação</Title>
      <Form onSubmit={handleAuth}>
        {inputError && <Error>{inputError}</Error>}
        <Input
          hasError={!!inputError}
          placeholder="E-mail"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          hasError={!!inputError}
          placeholder="Senha"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit">Autenticar</Button>
      </Form>
    </>
  );
};

export default Auth;
