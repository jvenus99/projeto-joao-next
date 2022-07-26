import React, { useContext, useState } from 'react'
import Head from 'next/head'
import { SiSpringsecurity } from 'react-icons/si'
import { FaUserCog } from 'react-icons/fa'
import { MdSettingsSuggest } from 'react-icons/md'
import { SiStylelint } from 'react-icons/si'
import { CircularProgress } from '@mui/material'
import Router from "next/router";

import { AuthContext } from '../../context/AuthContext'
import { Container, ContainerImage, ContainerLogin, Error, Form, Input, Section, SubmitButton } from '../../styles/pages/login/styles'



type Register = {
  name: string
  email: string
  password: string
  confirmPassword: string
}

const Register: React.FC = () => {
  const { signup } = useContext(AuthContext);

  const [form, setForm] = useState<Register>({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);


  const onChange: React.ChangeEventHandler<HTMLInputElement> = (event: React.FormEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [event.currentTarget.name]: event.currentTarget.value,
    });
    if (form.password !== form.confirmPassword) {
      setError(true);
      setErrorMessage('As senhas não são as mesmas')
    }
  }

  const onSubmit: React.FormEventHandler<HTMLFormElement> = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    Object.keys(form).forEach(key => {
      if (form[key] === '') {
        setLoading(false);
        setError(true);
        setErrorMessage('Preencha todos os campos')
      } else {
        setError(false);
      }
    })
    try {
      await signup({ name: form.name, email: form.email, password: form.password })
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  return (
    <div >
      <Head>
        <title>Register</title>
        <meta content={`Q2 Bank`} property="title" />
        <meta content={`Q2 Bank`} property="og:title" />
        <meta
          name="description"
          content="Faça seu cadastro na plataforma Q2 Bank e aproveite nossos serviços"
        />
        <meta
          property="og:description"
          content="Faça seu cadastro na plataforma Q2 Bank e aproveite nossos serviços"
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
              <h1>Cadastro</h1>
              {error && <Error>{errorMessage}</Error>}
              <Input id="name" name={'name'} type='text' value={form.name} onChange={onChange} label="Name" variant="outlined" />
              <Input id="email" name={'email'} type='email' value={form.email} onChange={onChange} label="Email" variant="outlined" />
              <Input id="password" label="Senha" type='password' name={'password'} onChange={onChange} value={form.password} variant="outlined" />
              <Input id="confirmPassword" label="Confirmar Senha" type='password' name={'confirmPassword'} onChange={onChange} value={form.confirmPassword} variant="outlined" />
              <SubmitButton variant="contained" type="submit">Cadastrar
                {loading && <CircularProgress size={20} style={{ color: 'white', marginLeft: '10px' }} />}
              </SubmitButton>
              <span>Já possui conta, <a onClick={() => Router.push('/')}>Fazer Login</a></span>
            </Form>
          </ContainerLogin>
        </Container>

      </main>


    </div>
  )
}

export default Register
