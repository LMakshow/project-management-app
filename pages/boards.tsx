import { Container } from '@nextui-org/react'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { Card, Text } from '@nextui-org/react'
import Layout from '../components/layout'
import { useGetBoardsQuery } from '../features/boards/boardsApi'
import { useAppSelector } from '../features/hooks'

export const getStaticProps = async ({ locale }: { locale: 'en' | 'ru' }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'en', [
      'common',
      'modal-window',
    ])),
  },
})

export default function Boards() {
  const isSigned = useAppSelector((state) => state.user.token)
  const userId = useAppSelector((state) => state.user._id) as string
  const { data: boardList, error, isLoading } = useGetBoardsQuery(userId)

  return (
    <Layout>
      <Container>
        {boardList &&
          boardList.map((board) => (
            <Card key={board._id} css={{ mw: '400px' }}>
              <Card.Body>
                <Text>Title: {board.title}</Text>
                <Text>Owner: {board.owner}</Text>
                <Text>Users: {board.users}</Text>
              </Card.Body>
            </Card>
          ))}
      </Container>
    </Layout>
  )
}
