import {
  Button,
  Container,
  Grid,
  Row,
  Spacer, useTheme
} from '@nextui-org/react'
import { skipToken } from '@reduxjs/toolkit/dist/query'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import BoardDescription from '../../components/BoardTasks/BoardDescription'
import BoardTitle from '../../components/BoardTasks/BoardTitle'
import Column from '../../components/BoardTasks/Column'
import { IconDelete } from '../../components/icons/boardCard/icon_delete'
import { IconPlus } from '../../components/icons/boardCard/icon_plus'
import Layout, { siteTitle } from '../../components/layout'
import { useSignInMutation } from '../../features/auth/authApi'
import {
  useGetColumnsQuery,
  useGetSingleBoardQuery,
  useGetTasksQuery
} from '../../features/boards/boardsApi'
import { useAppSelector } from '../../features/hooks'

export const getServerSideProps = async ({ locale }: { locale: 'en' | 'ru' }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'en', [
      'common',
      'home-page',
      'modal-window'
    ])),
  },
})

export default function Board() {
  const router = useRouter()
  const { theme } = useTheme()
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
  }, [login])

  const userId = useAppSelector((state) => state.user._id) as string
  const { data: columnsList, isSuccess: isColumnFetched } = useGetColumnsQuery(
    userId ? boardId : skipToken
  )
  const { data: boardData } = useGetSingleBoardQuery(
    userId ? boardId : skipToken
  )
  const { data: tasksList } = useGetTasksQuery(userId ? boardId : skipToken)
  console.log('taskList: ', tasksList)

  return (
    <Layout>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <Container
        lg
        css={{
          gap: '$10',
          py: '$8',
          alignItems: 'center',
        }}>
        
        <Row align='flex-end' wrap='wrap'>
          {boardData ? (
            <>
              <BoardTitle boardData={boardData} />
              <Spacer x={1} />
              <BoardDescription description={boardData.description} />
            </>
          ) : (
            'Loading'
          )}
          
          <Spacer x={1} css={{ mr: 'auto' }} />
         
          <Button
            color='primary'
            css={{ my: '6px' }}
            auto
            flat
            icon={<IconPlus fill='currentColor' />}>
            Add New Column
          </Button>
          
          <Spacer x={1} />
          
          <Button
            color='error'
            css={{ my: '6px' }}
            auto
            flat
            icon={<IconDelete fill='currentColor' />}></Button>
        </Row>
        
        <Spacer y={1} />
        
        <Grid.Container
          justify='flex-start'
          gap={1}
          wrap='nowrap'
          css={{
            overflowX: 'auto',
            maxHeight: 'calc(-175px + 100vh)',
            oy: 'visible',
            m: '-50px',
            p: '40px',
            w: 'auto',
          }}>
          {columnsList &&
            columnsList.map((column) => (
              <Grid key={column._id} sm={3} css={{ display: 'inherit' }}>
                <Column
                  tasks={tasksList?.filter(
                    (task) => task.columnId === column._id
                  )}
                  {...column}
                />
              </Grid>
            ))}
        </Grid.Container>
      </Container>
    </Layout>
  )
}
