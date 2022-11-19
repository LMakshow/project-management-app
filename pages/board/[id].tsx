import { Container, Grid, Row, Spacer, Text, useTheme } from '@nextui-org/react'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Layout, { siteTitle } from '../../components/layout'
import { useSignInMutation } from '../../features/auth/authApi'
import {
  useGetColumnsQuery,
  useGetSingleBoardQuery,
} from '../../features/boards/boardsApi'
import { useAppDispatch, useAppSelector } from '../../features/hooks'
import { setUser } from '../../features/auth/userSlice'
import { BoardResponse } from '../../utils/interfaces'
import { skipToken } from '@reduxjs/toolkit/dist/query'
import ColumnTitle from '../../components/BoardTasks/ColumnTitle'
import Column from '../../components/BoardTasks/Column'
import Head from 'next/head'
import { wrap } from 'module'

export default function Board() {
  const router = useRouter()
  const { theme } = useTheme()
  console.log(theme)
  const boardId = String(router.query.id)
  const { data: boardData } = useGetSingleBoardQuery(boardId)
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
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <Container lg
        css={{
          gap: '$10',
          py: '$8',
          alignItems: 'center',
        }}>
        <Row align='flex-end' wrap='wrap'>
          <Text h2 css={{ mb: '$4' }}>{boardData?.title}</Text>
          <Spacer x={1} />
          <Text h3 css={{ mb: '$5' }} color={theme?.colors?.gray800?.value}>
            {boardData?.description}
          </Text>
        </Row>
        <Spacer y={1} />
        <Grid.Container justify='flex-start' gap={1} wrap='nowrap' css={{ overflowX: 'auto', oy: 'visible', m: '-50px', p: '40px', w: 'auto' }}>
          {columnsList &&
            columnsList.map((column) => (
              <Grid key={column._id} sm={3}>
                <Column {...column} />
              </Grid>
            ))}
        </Grid.Container>
      </Container>
    </Layout>
  )
}
