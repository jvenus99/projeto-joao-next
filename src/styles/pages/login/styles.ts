import { Button, TextField } from '@mui/material'
import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: row;
`

export const ContainerImage = styled.div`
  width: 35%;
  height: 100vh;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  h1 {
    color: #256db1;
    font-size: 8rem;
  }
  @media (max-width: 920px) {
    display: none;
  }
`

export const Section = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: 20px;
  color: #256db1;
  svg {
    margin: 20px;
  }
  b {
    text-align: left;
  }
`

export const ContainerLogin = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px;
  align-self: center;
  width: 65%;
  @media (max-width: 920px) {
    width: 100%;
    min-height: 100vh;
    flex-direction: row;
  }
`

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  background-color: white;
  justify-content: space-around;
  border-radius: 13px;
  min-width: 40%;
  min-height: 40vh;
  align-items: center;
  h1 {
    color: #256db1;
    font-size: 5rem;
  }
  span {
    color: #256db1;
    margin: 10px;
    a {
      cursor: pointer;
      text-decoration: underline;
    }
  }
  @media (max-width: 920px) {
    width: 100%;
    min-height: 50vh;
  }
`

export const Input = styled(TextField)`
  min-width: 80%;
  margin: 10px !important;
  fieldset {
    border-radius: 13px;
  }
  @media (max-width: 920px) {
    margin: 20px;
  }
`
export const SubmitButton = styled(Button)`
  width: 50%;
  height: 5vh;
  border-radius: 13px;
  font-size: 18px;
  @media (max-width: 920px) {
    width: 60%;
    height: 6vh;
    margin: 10px;
  }
`
export const Error = styled.b`
  color: red;
`
