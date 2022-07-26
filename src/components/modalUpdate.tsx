import React, { Dispatch, SetStateAction, useState } from 'react';
import { CircularProgress, Dialog, DialogContent } from '@mui/material';
import { IoMdClose } from 'react-icons/io';
import { ButtonCloseModal, ContentModalUpdate, Form, Input, SubmitButton } from './styles';
import { updateUserData } from '../services/bankDataController';
import { useDispatch } from 'react-redux';
import { updateUser } from '../store/userSlice';

type User = {
  id: number
  name?: string
  document?: string
  bank?: {
    bankName?: string
    code?: string
    agency?: string
    account?: string
  }
}

type PropsType = {
  user: User
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}

const ModalUpdate: React.FC<PropsType> = ({ user, open, setOpen }) => {
  const dispatch = useDispatch();

  const [form, setForm] = useState<User>(user);
  const [loading, setLoading] = useState<boolean>(false);


  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleChangeBank(e) {
    setForm({ ...form, bank: { ...form.bank, [e.target.name]: e.target.value } });
  }

  const onSubmit: React.FormEventHandler<HTMLFormElement> = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    try {
      const { data: userUpdate } = await updateUserData(user.id, form)
      if (userUpdate) {
        dispatch(updateUser(userUpdate));
        setOpen(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  return (
    <>
      <Dialog open={open} fullWidth={true}>
        <DialogContent>
          <ButtonCloseModal onClick={() => setOpen(false)}>
            <IoMdClose
              style={{ background: '#256db1', borderRadius: '50%' }}
              color={'white'}
              size={25}
            />
          </ButtonCloseModal>
          <ContentModalUpdate>
            <h1>Editar Dados</h1>
            <Form onSubmit={onSubmit}>
              <Input
                label={'Nome do Usuário'}
                name='name'
                placeholder='Digite o nome do usuário'
                value={form.name}
                onChange={handleChange}
              />
              <Input
                label={'CPF'}
                name='document'
                placeholder='Digite o CPF do usuário'
                value={form.document}
                onChange={handleChange}
              />
              <Input
                label={'Banco'}
                name='bankName'
                placeholder='Digite o nome do banco'
                value={form.bank.bankName}
                onChange={handleChangeBank}
              />
              <Input
                label={'Código do Banco'}
                name='code'
                placeholder='Digite o código do banco'
                value={form.bank.code}
                onChange={handleChangeBank}
              />
              <Input
                label={'Agência'}
                name='agency'
                placeholder='Digite a agência'
                value={form.bank.agency}
                onChange={handleChangeBank}
              />
              <Input
                label={'Conta'}
                name='account'
                placeholder='Digite o número da conta'
                value={form.bank.account}
                onChange={handleChangeBank}
              />
              <SubmitButton variant="contained" type="submit">Atualizar
                {loading && <CircularProgress size={20} style={{ color: 'white', marginLeft: '10px' }} />}
              </SubmitButton>
            </Form>
          </ContentModalUpdate>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default ModalUpdate;
