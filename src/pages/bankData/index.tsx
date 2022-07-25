import React from 'react'
import Head from 'next/head'
import { parseCookies } from 'nookies'

const BankData: React.FC = () => {
  return (
    <div >
      <Head>
        <title>Dados Bancários</title>

      </Head>

      <main>
        <h1>List</h1>
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
