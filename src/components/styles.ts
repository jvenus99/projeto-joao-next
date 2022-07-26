import styled from 'styled-components'
import { Button, TextField } from '@mui/material'

export const ContentModalUpdate = styled.div`
  border-radius: 8px;
  min-height: 40vh;
  width: 100%;
  margin-top: 38px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  h1 {
    font-size: 32px;
    text-align: left;
    margin-bottom: 30px;
  }
  form input {
  }
`

export const ButtonCloseModal = styled(Button)`
  position: absolute !important;
  top: 2px;
  right: 0px;
  padding: 20px;
  color: white;
`

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  background-color: white;
  justify-content: space-around;
  border-radius: 13px;
  width: 100%;
  min-height: 40vh;
  align-items: center;
  h1 {
    color: #256db1;
    font-size: 5rem;
  }
`

export const Input = styled(TextField)`
  width: 100%;
  margin: 10px;
  fieldset {
    border-radius: 13px;
  }
  @media (max-width: 920px) {
    width: 100%;
  }
`
export const SubmitButton = styled(Button)`
  width: 50%;
  margin: 10px;
  height: 5vh;
  border-radius: 13px;
  font-size: 18px;
  @media (max-width: 920px) {
    width: 60%;
    height: 6vh;
  }
`
