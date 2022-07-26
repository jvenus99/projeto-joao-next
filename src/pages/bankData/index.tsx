import React, { useContext, useEffect, useState } from 'react'
import Head from 'next/head'
import { parseCookies } from 'nookies'
import { FaUserAlt } from 'react-icons/fa'
import { CircularProgress, Menu, MenuItem } from '@mui/material'
import { selectUserState, fetchUsers, updateUser } from '../../store/userSlice'
import { useSelector, useDispatch } from 'react-redux'
import { Pagination, Stack } from '@mui/material';

import { getUsersData } from '../../services/bankDataController'
import { Card, Container, Header } from '../../styles/pages/bankData/styles'
import { AuthContext } from '../../context/AuthContext'
import ModalUpdate from '../../components/modalUpdate'

type User = {
  id: number,
  name?: string,
  document?: string,
  bank?: {
    bankName?: string
    code?: string
    agency?: string
    account?: string
  }
}

const BankData: React.FC = () => {
  const { logout } = useContext(AuthContext);
  const userState = useSelector(selectUserState);
  const dispatch = useDispatch();

  const [userUpdate, setUserUpdate] = useState<User>({} as User);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false)
  const [page, setPage] = useState<number>(1)
  const [total, setTotal] = useState<number>(0)
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  function handlePage(event, value) {
    setPage(value);
  }

  useEffect(() => {
    (async () => {
      setLoading(true)
      try {
        const { data: dataUsers, headers } = await getUsersData(page);
        if (headers['x-total-count']) {
          setTotal(parseInt(headers['x-total-count']))
        }
        if (dataUsers.length > 0) {
          dispatch(fetchUsers(dataUsers));
        }
        setLoading(false)
      } catch (error) {
        console.log(error)
      }
    })
      ();
  }, [page]);

  return (
    <div >
      <Head>
        <title>Dados Bancários</title>

      </Head>

      <main>
        <Header >
          <h1>Q2 BANK</h1>
          <i aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}><FaUserAlt size={30} /></i>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <MenuItem onClick={logout}>Sair</MenuItem>
          </Menu>
        </Header>
        <Container >
          <h1>Dados Bancários</h1>
          {loading && <span><CircularProgress size={80} /></span>}
          {userState && !loading && userState.map((user) => {
            return (
              <Card key={user?.id} onClick={() => {
                setUserUpdate(user)
                setShowModal(!showModal)
              }}>
                <div>
                  <h2>{user?.name}</h2>
                  <p>{user?.document}</p>
                </div>
                <div>
                  <p>Banco: {user?.bank?.bankName}</p>
                  <p>Conta: {user?.bank?.account}</p>
                  <p>Agência: {user?.bank?.agency}</p>
                </div>
              </Card>
            )
          })}
          {!loading && <Stack style={{ margin: '10px', alignSelf: 'center' }} spacing={2}>
            <Pagination count={Math.ceil(total / 8)} page={page} onChange={handlePage} />
          </Stack>}
          {showModal && <ModalUpdate user={userUpdate} open={showModal} setOpen={setShowModal} />}

        </Container>
      </main>


    </div>
  )
}

export default BankData

export const getServerSideProps = async (ctx: any) => {

  const { ['q2bank.accessToken']: accessToken } = parseCookies(ctx);
  if (!accessToken) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      }
    }
  }


  return { props: { accessToken } }
}
