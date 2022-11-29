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
import {
  useGetBoardsQuery,
  useGetBoardsSetMutation,
  useGetSingleBoardQuery,
  useSearchTaskMutation,
} from '../features/boards/boardsApi'
import { useAppSelector } from '../features/hooks'
import BoardCard from '../components/board-list-page/BoardCard'
import Head from 'next/head'
import { useTranslation } from 'next-i18next'
import { IconKanbanAdd } from '../components/icons/icon_kanban_add'
import PopoverAddBoard from '../components/Popover-add-board'
import { useEffect, useState } from 'react'
import Search from '../components/Search'
import { BoardResponse, CustomError, TaskResponse } from '../utils/interfaces'
import { useDebounce } from '../features/hooks'
import { IconSearch } from '../components/icons/boardCard/icon_search'
import { useRouter } from 'next/router'

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

  const [searchTask] = useSearchTaskMutation()
  const [getBoardsSet] = useGetBoardsSetMutation()

  const [filterText, setFilterText] = useState('')
  const [searchSpinner, setSearchSpinner] = useState(false)
  const [filteredBoards, setFilteredBoards] = useState<{
    boards?: BoardResponse[]
    tasks?: TaskResponse[]
  }>({})

  const [searchTerm, setSearchTerm] = useState('')

  const debouncedSearchTerm = useDebounce(searchTerm, 500)

  const router = useRouter()

  const onSearchChange = (value: string) => {
    setSearchSpinner(true)
    setSearchTerm(value)
  }

  useEffect(() => {
    if (!isSigned) router.push('/')

    if (debouncedSearchTerm) {
      const doSearch = async () => {
        const searchResult = await searchTask(debouncedSearchTerm).unwrap()

        // Extracting unique boardIds from the search results
        const boardIds = new Set()
        for (const task of searchResult) {
          boardIds.add(task.boardId)
        }
        const boardIdsString = Array.from(boardIds).join(',')
        const boards = await getBoardsSet(boardIdsString).unwrap()

        setFilterText(debouncedSearchTerm)
        setFilteredBoards({ boards, tasks: searchResult })
        setSearchSpinner(false)
      }
      doSearch()
    } else {
      setFilterText('')
      setFilteredBoards({})
      setSearchSpinner(false)
    }
  }, [
    boardList,
    debouncedSearchTerm,
    getBoardsSet,
    isSigned,
    router,
    searchTask,
  ])
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
          alignItems: 'flex-start',
        }}>
        <Row wrap='wrap' css={{ display: 'flex', alignItems: 'center' }}>
          {boardList ? (
            <>
              <Text h2>{t('Boards of', { user: userName })}</Text>
              <Spacer x={1} css={{ mr: 'auto' }} />
              <Search
                filterText={filterText}
                setSearchTerm={onSearchChange}
                searchSpinner={searchSpinner}
              />
              <Spacer x={2} />
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
          ) : isLoading ? (
            <Loading size='lg'>{t('Loading')}</Loading>
          ) : error ? (
            <Loading size='lg' color='error'>
              {(error as CustomError).data.message}
            </Loading>
          ) : null}
        </Row>
        {boardList &&
          !filterText &&
          boardList.map((board) => <BoardCard key={board._id} board={board} />)}
        {filterText &&
          (filteredBoards.boards?.length ? (
            filteredBoards.boards.map((board) => (
              <BoardCard
                key={board._id}
                board={board}
                tasks={filteredBoards?.tasks?.filter(
                  (task) => task.boardId === board._id
                )}
              />
            ))
          ) : (
            <Text size='$xl'>{t('No boards')}</Text>
          ))}
      </Container>
    </Layout>
  )
}
