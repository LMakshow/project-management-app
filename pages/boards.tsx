import { Container } from '@nextui-org/react'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Layout from '../components/layout'
import { useGetBoardsQuery } from '../features/boards/boardsApi'
import { useAppSelector } from '../features/hooks'
import BoardCard from '../components/board-list-page/BoardCard';

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
      <Container display="flex" css={{
        gap: '32px',
        padding: '32px',
        justifyContent: 'flex-start',
        alignItems: 'center'
      }}>
        {boardList &&
          boardList.map((board) => (
            <BoardCard
              key={board._id}
              title={board.title}
              owner={board.owner}
              users={board.users}
             _id={board._id}/>
          ))}
      </Container>
    </Layout>
  )
}
