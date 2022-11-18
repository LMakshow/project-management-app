import { Container } from '@nextui-org/react'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Layout from '../../components/layout'
import { useSignInMutation } from '../../features/auth/authApi'
import { useGetColumnsQuery } from '../../features/boards/boardsApi'
import { useAppDispatch, useAppSelector } from '../../features/hooks'
import { setUser } from '../../features/auth/userSlice'
import { BoardResponse } from '../../utils/interfaces'
import { skipToken } from '@reduxjs/toolkit/dist/query'

export default function Board() {
  const router = useRouter()
  const boardId = String(router.query.id)
  const [login, { isSuccess: isSigned }] = useSignInMutation()

  useEffect(() => {
    const fetch = async () => {
      await login({
        login: 'TestUser',
        password: 'TestUserPwd',
      })
    }
    fetch()
  }, [])

  const { data: columnsList } = useGetColumnsQuery(
    isSigned ? boardId : skipToken
  )
  console.log(columnsList)
  const userId = useAppSelector((state) => state.user._id) as string

  return (
    <Layout>
      <Container
        display='flex'
        css={{
          gap: '32px',
          padding: '32px',
          justifyContent: 'flex-start',
          alignItems: 'center',
        }}>
        {columnsList &&
          columnsList.map((column) => (
            <div
              key={column._id}>Title: {column.title} </div>
          ))}
      </Container>
    </Layout>
  )
}
