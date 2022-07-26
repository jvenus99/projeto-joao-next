import React, { useContext, useState } from 'react'
import Head from 'next/head'
import { Container, ContainerImage, ContainerLogin, Error, Form, Input, Section, SubmitButton } from '../styles/pages/login/styles'
import { SiSpringsecurity } from 'react-icons/si'
import { FaUserCog } from 'react-icons/fa'
import { MdSettingsSuggest } from 'react-icons/md'
import { SiStylelint } from 'react-icons/si'
import { CircularProgress } from '@mui/material'

import { AuthContext } from '../context/AuthContext'
import Router from 'next/router'


type Login = {
  email: string,
  password: string
}

const Login: React.FC = () => {
  const { login } = useContext(AuthContext);

  const [form, setForm] = useState<Login>({
    email: '',
    password: '',
  });
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);


  const onChange: React.ChangeEventHandler<HTMLInputElement> = (event: React.FormEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [event.currentTarget.name]: event.currentTarget.value,
    });

  }

  const onSubmit: React.FormEventHandler<HTMLFormElement> = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    Object.keys(form).forEach(key => {
      if (form[key] === '') {
        setLoading(false);
        setError(true);
      } else {
        setError(false);
      }
    })
    try {
      await login(form)
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  return (
    <div >
      <Head>
        <title>Login</title>
        <meta content={`Q2 Bank`} property="title" />
        <meta content={`Q2 Bank`} property="og:title" />
        <meta
          name="description"
          content="Faça login na plataforma Q2 Bank e aproveite nossos serviços"
        />
        <meta
          property="og:description"
          content="Faça login na plataforma Q2 Bank e aproveite nossos serviços"
        />
        <meta name="robots" content="index, follow" />
      </Head>

      <main>
        <Container>
          <ContainerImage>
            <h1>Q2</h1>
            <h1>Bank</h1>
            <Section>
              <SiSpringsecurity size={50} />
              <b>SEGURANÇA</b>
            </Section>
            <Section>
              <FaUserCog size={50} />
              <b>ATENDIMENTO</b>
            </Section>
            <Section>
              <MdSettingsSuggest size={50} />
              <b>FACILIDADE</b>
            </Section>
            <Section>
              <SiStylelint size={50} />
              <b>ELEGÂNCIA</b>
            </Section>
          </ContainerImage>
          <ContainerLogin>
            <Form onSubmit={onSubmit}>
              <h1>Login</h1>
              {error && <Error>Necessário preencher todos os campos!</Error>}
              <Input id="email" name={'email'} type='email' value={form.email} onChange={onChange} label="Email" variant="outlined" />
              <Input id="password" label="Senha" type='password' name={'password'} onChange={onChange} value={form.password} variant="outlined" />
              <SubmitButton variant="contained" type="submit">Login
                {loading && <CircularProgress size={20} style={{ color: 'white', marginLeft: '10px' }} />}
              </SubmitButton>
              <span>Não possui conta, <a onClick={() => Router.push('/register')}>Cadastre-se</a></span>
            </Form>
          </ContainerLogin>
        </Container>

      </main>


    </div>
  )
}

export default Login
