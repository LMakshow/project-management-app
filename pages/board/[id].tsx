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
import { useSignInMutation } from '../../features/auth/authApi'
import {
  useDeleteBoardMutation,
  useGetColumnsQuery,
  useGetSingleBoardQuery,
  useGetTasksQuery,
  useChangeColumnOrderMutation, useChangeTaskOrderMutation,
} from '../../features/boards/boardsApi'
import { useAppSelector } from '../../features/hooks'
import { CustomError } from '../../utils/interfaces'

import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import {
  ColumnOrderRequest, ColumnOrderRequestData,
  ColumnResponse,
  TaskOrderRequest,
  TaskResponse,
} from '../../utils/interfaces';

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
  const [login, { isSuccess: isSigned }] = useSignInMutation()
  const [deleteBoard] = useDeleteBoardMutation()
  const [changeColumnOrder] = useChangeColumnOrderMutation()
  const [changeTaskOrder] = useChangeTaskOrderMutation()

  // //autologin for testing purposes
  // useEffect(() => {
  //   const fetch = async () => {
  //     await login({
  //       login: 'TestUser',
  //       password: 'TestUserPwd',
  //     })
  //   }
  //   fetch()
  // }, [login])
  const [columns, setColumns] = useState<ColumnResponse[]>([]);
  const [tasks, setTasks] = useState<TaskResponse[]>([]);

  const [isCreateColumnOpen, setIsCreateColumnOpen] = useState(false)
  const userId = useAppSelector((state) => state.user._id) as string
  const usertoken = useAppSelector((state) => state.user.token) as string

  const {
    data: columnsList,
    error,
    isSuccess: isColumnFetched,
  } = useGetColumnsQuery(userId ? boardId : skipToken)
  const { data: boardData } = useGetSingleBoardQuery(
    userId ? boardId : skipToken,
  )
  const { data: tasksList } = useGetTasksQuery(userId ? boardId : skipToken)
  const nextColumnOrder = columnsList?.length
    ? 1 + columnsList?.reduce((a, b) => Math.max(a, b.order), 0)
    : 0

  useEffect(() => {
    const columnArray: ColumnResponse[] = columnsList ? [...columnsList].sort((a, b) => a.order - b.order) : [];
    const taskArray: TaskResponse[] = tasksList ? [...tasksList].sort((a, b) => a.order - b.order) : [];

    setColumns(columnArray);
    setTasks(taskArray);
  }, [columnsList, tasksList]);

  useEffect(() => {
    if (!usertoken) router.push('/')
  })

  const handleDeleteElement = async () => {
    await deleteBoard(boardId)
  }

  console.log(tasks);

  const handleOnDragEnd = async (result: DropResult) => {
    console.log(result)
    const { destination, source, type } = result;
    if (!destination || source.index === destination.index && source.droppableId === destination.droppableId) {
      return;
    }

    const spliceArray = (array: ColumnResponse[] | TaskResponse[], element: ColumnResponse | TaskResponse) => {
      array.splice(source.index, 1);
      array.splice(destination.index, 0, element);
    }

    const mapSortArray: (array: ColumnResponse[] | TaskResponse[]) => ColumnResponse[] | TaskResponse[] = (array) => {
      return array
        .map((item, index) => ({...item, order: index}))
        .sort((a, b) => a.order - b.order);
    }

    const mapArray: (array: ColumnResponse[] | TaskResponse[]) => ColumnResponse[] | TaskResponse[] = (array) => {
      return array.map((item, index) => ({...item, order: index}));
    }

    const sortArray: (array: ColumnResponse[] | TaskResponse[]) => ColumnResponse[] | TaskResponse[] = (array) => {
      return array.sort((a, b) => a.order - b.order);
    }

    const setTasksArrayForRequest: (array: TaskResponse[]) => TaskOrderRequest[] = (array) => {
      return array.map((task) => ({
        _id: task._id,
        order: task.order,
        columnId: task.columnId,
      }));
    }

    if (type === 'columns') {
      const items: ColumnResponse[] = [...columns];
      const element = items.find((item) => item._id === result.draggableId);

      if (!columns || !element || source.index === destination.index) {
        return;
      }

      spliceArray(items, element);
      const array: ColumnResponse[] = mapSortArray(items);
      const arrayRequest: ColumnOrderRequest[] = array.map((column) => ({_id: column._id, order: column.order}));

      setColumns(array);
      await changeColumnOrder(arrayRequest);
    }

    if (type === 'tasks' && tasks?.length) {
      if (source.droppableId === destination.droppableId) {
        const currentColumnTasksArray: TaskResponse[] = [...tasks].filter((task) => task.columnId === destination.droppableId);
        const otherColumnsTasksArray: TaskResponse[] = [...tasks].filter((task) => task.columnId !== destination.droppableId) || [];

        const element = currentColumnTasksArray.find((item) => item._id === result.draggableId);

        if (!element) {
          return;
        }
        spliceArray(currentColumnTasksArray, element);


        const array: TaskResponse[] = sortArray([...(mapArray(currentColumnTasksArray) as TaskResponse[]), ...otherColumnsTasksArray]) as TaskResponse[];

        setTasks(array);
        await changeTaskOrder(setTasksArrayForRequest(array));
      } else {
        const startColumnTasksArray: TaskResponse[] = [...tasks].filter((task) => task.columnId === source.droppableId);
        const finishColumnTasksArray: TaskResponse[] = [...tasks].filter((task) => task.columnId === destination.droppableId);
        const otherColumnTasksArray: TaskResponse[] = [...tasks].filter((task) => (task.columnId !== destination.droppableId) && (task.columnId !== source.droppableId)) || [];

        const element = startColumnTasksArray.find((item) => item._id === result.draggableId);

        if (!element) {
          return;
        }

        startColumnTasksArray.splice(source.index, 1);

        finishColumnTasksArray.splice(destination.index, 0, { ...element, columnId: destination.droppableId });

        const array: TaskResponse[] = sortArray([...mapArray(startColumnTasksArray) || [], ...mapArray(finishColumnTasksArray), ...otherColumnTasksArray]) as TaskResponse[];

        console.log(array);

        setTasks(array);
        await changeTaskOrder(setTasksArrayForRequest(array));
      }
    }
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
        <Row align="flex-end" wrap="wrap">
          {boardData ? (
            <>
              <BoardTitle boardData={boardData}/>
              <Spacer x={1}/>
              <BoardDescription boardData={boardData}/>
            </>
          ) : error ? (
            <Loading size='lg' color='error'>
              {t('ErrorText')}
              {(error as CustomError).data.message}
            </Loading>
          ) : (
            <Loading size='lg'> {t('Loading')} </Loading>
          )}

          <div style={{ display: 'flex', flexGrow: '1', maxWidth: '100%' }}>
            <Spacer x={1} css={{ mr: 'auto' }} />
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
                  // t('Popover delete board')
                  text: 'Popover delete board',
                }}
              />
            </div>
          </div>
        </Row>

        <Spacer y={1}/>
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId={boardId} direction='horizontal' type='columns'>
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
                ref={provided.innerRef}
              >
                {columns &&
                  columns.map((column, index) => (
                    <Draggable key={column._id} draggableId={column._id} index={index}>
                      {(provided) => (
                        <Grid
                          sm={3}
                          css={{ display: 'inherit' }}
                          {...provided.draggableProps}
                          ref={provided.innerRef}
                        >
                          <Column
                            tasks={tasks?.filter(
                              (task) => task.columnId === column._id,
                            )}
                            column={column}
                            dragHandleProps={provided.dragHandleProps}
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
