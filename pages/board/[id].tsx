import {
  Button,
  Container,
  Grid,
  Loading,
  Popover,
  Row,
  Spacer,
} from '@nextui-org/react'
import { skipToken } from '@reduxjs/toolkit/dist/query'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import BoardDescription from '../../components/BoardTasks/BoardDescription'
import BoardTitle from '../../components/BoardTasks/BoardTitle'
import Column from '../../components/BoardTasks/Column'
import PopoverAddColumn from '../../components/BoardTasks/PopoverAddColumn'
import { IconBack } from '../../components/icons/boardCard/icon_back'
import { IconPlus } from '../../components/icons/boardCard/icon_plus'
import Layout, { siteTitle } from '../../components/layout'
import PopoverDeleteElement from '../../components/PopoverDeleteElement'
import {
  useDeleteBoardMutation,
  useGetColumnsQuery,
  useGetSingleBoardQuery,
  useGetTasksQuery,
  useChangeColumnOrderMutation,
  useChangeTaskOrderMutation,
} from '../../features/boards/boardsApi'
import { useAppSelector } from '../../features/hooks'
import { CustomError } from '../../utils/interfaces'

import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from 'react-beautiful-dnd'
import { ColumnResponse, TaskResponse } from '../../utils/interfaces'
import onDragEnd from '../../utils/onDragEnd'

export const getServerSideProps = async ({
  locale,
}: {
  locale: 'en' | 'ru'
}) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'en', [
      'common',
      'home-page',
      'modal-window',
    ])),
  },
})

export default function Board() {
  const router = useRouter()
  const { t } = useTranslation('common')
  const boardId = String(router.query.id)

  const [deleteBoard] = useDeleteBoardMutation()
  const [
    changeColumnOrder,
    { isLoading: isColumnLoading, isError: isColumnError },
  ] = useChangeColumnOrderMutation()
  const [changeTaskOrder, { isLoading: isTaskLoading, isError: isTaskError }] =
    useChangeTaskOrderMutation()

  const [columns, setColumns] = useState<ColumnResponse[]>([])
  const [tasks, setTasks] = useState<TaskResponse[]>([])
  const [isDeleteColumn, setDeleteColumn] = useState<boolean>(false)

  const [isCreateColumnOpen, setIsCreateColumnOpen] = useState(false)
  const userId = useAppSelector((state) => state.user._id) as string
  const usertoken = useAppSelector((state) => state.user.token) as string

  const {
    data: columnsList,
    error,
    isFetching: isBoardFetching,
    isLoading: isBoardLoading,
  } = useGetColumnsQuery(userId ? boardId : skipToken)
  const { data: boardData } = useGetSingleBoardQuery(
    userId ? boardId : skipToken
  )
  const { data: tasksList } = useGetTasksQuery(userId ? boardId : skipToken)
  const nextColumnOrder = columnsList?.length
    ? 1 + columnsList?.reduce((a, b) => Math.max(a, b.order), 0)
    : 0

  useEffect(() => {
    if (!(isColumnLoading || isTaskLoading)) {
      const columnArray: ColumnResponse[] = columnsList
        ? [...columnsList].sort((a, b) => a.order - b.order)
        : []
      const taskArray: TaskResponse[] = tasksList
        ? [...tasksList].sort((a, b) => a.order - b.order)
        : []

      setColumns(columnArray)
      setTasks(taskArray)
    }
    // We don't use isColumnLoading and isTaskLoading as deps here to prevent extra refetching
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [columnsList, tasksList])

  useEffect(() => {
    if (!usertoken) router.push('/')
  })

  const handleDeleteElement = async () => {
    await deleteBoard(boardId)
  }

  const handleOnDragEnd = async (result: DropResult) => {
    await onDragEnd(
      result,
      columns,
      tasks,
      setColumns,
      changeColumnOrder,
      setTasks,
      changeTaskOrder
    )
  }

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
              <BoardDescription boardData={boardData} />
            </>
          ) : error ? (
            <Loading size='lg' color='error'>
              {t('ErrorText')}
              {(error as CustomError).data.message}
            </Loading>
          ) : (
            <Loading size='lg'> {t('Loading')} </Loading>
          )}

          <div
            style={{
              display: 'flex',
              flexGrow: '1',
              maxWidth: '100%',
              alignItems: 'center',
            }}>
            <Spacer x={1} css={{ mr: 'auto' }} />
            {isBoardFetching ||
            isBoardLoading ||
            isTaskLoading ||
            isColumnLoading ||
            isDeleteColumn ? (
              <Loading size='sm' css={{ pl: '2px', pr: '2px' }} />
            ) : isColumnError || isTaskError ? (
              <Loading size='sm' css={{ pl: '2px', pr: '2px' }} color='error'>
                {t('Connection error')}
              </Loading>
            ) : (
              <Container css={{ p: 0, width: '121px' }} />
            )}
            <Spacer x={1} />
            <Button
              color='secondary'
              css={{ my: '6px' }}
              onClick={() => router.push('/boards')}
              auto
              flat
              icon={<IconBack fill='currentColor' />}>
              {t('Back')}
            </Button>
            <Spacer x={1} />

            <Popover
              isBordered
              isOpen={isCreateColumnOpen}
              onOpenChange={setIsCreateColumnOpen}>
              <Popover.Trigger>
                <Button
                  color='primary'
                  css={{ my: '6px' }}
                  auto
                  flat
                  icon={<IconPlus fill='currentColor' />}>
                  {t('Add New Column')}
                </Button>
              </Popover.Trigger>
              <Popover.Content>
                <PopoverAddColumn
                  boardId={boardId}
                  nextOrder={nextColumnOrder}
                  isOpen={isCreateColumnOpen}
                  setIsOpen={setIsCreateColumnOpen}
                />
              </Popover.Content>
            </Popover>

            <Spacer x={1} />
            <div style={{ margin: '6px 0' }}>
              <PopoverDeleteElement
                action={handleDeleteElement}
                localeKeys={{
                  text: 'Popover delete board',
                }}
              />
            </div>
          </div>
        </Row>

        <Spacer y={1} />
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable
            droppableId={boardId}
            direction='horizontal'
            type='columns'>
            {(provided) => (
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
                }}
                {...provided.droppableProps}
                ref={provided.innerRef}>
                {columns &&
                  columns.map((column, index) => (
                    <Draggable
                      key={column._id}
                      draggableId={column._id}
                      index={index}>
                      {(provided) => (
                        <Grid
                          sm={3}
                          css={{ display: 'inherit' }}
                          {...provided.draggableProps}
                          ref={provided.innerRef}>
                          <Column
                            tasks={tasks?.filter(
                              (task) => task.columnId === column._id
                            )}
                            column={column}
                            dragHandleProps={provided.dragHandleProps}
                            setDeleteColumn={setDeleteColumn}
                          />
                        </Grid>
                      )}
                    </Draggable>
                  ))}
                {provided.placeholder}
              </Grid.Container>
            )}
          </Droppable>
        </DragDropContext>
      </Container>
    </Layout>
  )
}
