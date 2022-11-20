import {
  Button,
  Container,
  Loading,
  Popover,
  Row,
  Spacer,
  Text,
} from '@nextui-org/react'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Layout, { siteTitle } from '../components/layout'
import { useGetBoardsQuery } from '../features/boards/boardsApi'
import { useAppSelector } from '../features/hooks'
import BoardCard from '../components/board-list-page/BoardCard'
import Head from 'next/head'
import { t } from 'i18next'
import { useTranslation } from 'next-i18next'
import { IconKanbanAdd } from '../components/icons/icon_kanban_add'
import PopoverAddBoard from '../components/Popover-add-board'
import { useState } from 'react'

export const getStaticProps = async ({ locale }: { locale: 'en' | 'ru' }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'en', [
      'common',
      'modal-window',
    ])),
  },
})

export default function Boards() {
  const { t } = useTranslation('common')
  const isSigned = useAppSelector((state) => state.user.token)
  const userId = useAppSelector((state) => state.user._id) as string
  const userName = useAppSelector((state) => state.user.name) as string
  const { data: boardList, error, isLoading } = useGetBoardsQuery(userId)
  const [isCreateBoardOpen, setIsCreateBoardOpen] = useState(false)

  return (
    <Layout>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <Container
        display='flex'
        css={{
          gap: '32px',
          padding: '32px',
          justifyContent: 'flex-start',
          alignItems: 'center',
        }}>
        <Row wrap='wrap'>
          {boardList ? (
            <>
              <Text h2>{t('Boards of', { user: userName })}</Text>
              <Spacer x={1} css={{ mr: 'auto' }} />
              <Popover
                isBordered
                isOpen={isCreateBoardOpen}
                onOpenChange={setIsCreateBoardOpen}>
                <Popover.Trigger>
                  <Button
                    color='primary'
                    css={{ my: '6px' }}
                    auto
                    flat
                    icon={<IconKanbanAdd fill='currentColor' />}>
                    {t('Create Board')}
                  </Button>
                </Popover.Trigger>
                <Popover.Content>
                  <PopoverAddBoard
                    isOpen={isCreateBoardOpen}
                    setIsOpen={setIsCreateBoardOpen}
                  />
                </Popover.Content>
              </Popover>
            </>
          ) : (
            <Loading size='lg'> Loading </Loading>
          )}
        </Row>

        {boardList &&
          boardList.map((board) => (
            <BoardCard
              key={board._id}
              description={board.description}
              title={board.title}
              owner={board.owner}
              users={board.users}
              _id={board._id}
            />
          ))}
      </Container>
    </Layout>
  )
}
