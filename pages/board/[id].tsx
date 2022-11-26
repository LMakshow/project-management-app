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
  useChangeColumnOrderMutation,
} from '../../features/boards/boardsApi'
import { useAppSelector } from '../../features/hooks'

import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { ColumnOrderRequest, ColumnResponse } from '../../utils/interfaces';

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
  const [changeOrder] = useChangeColumnOrderMutation()

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

  const [isCreateColumnOpen, setIsCreateColumnOpen] = useState(false)
  const userId = useAppSelector((state) => state.user._id) as string
  const { data: columnsList, isSuccess: isColumnFetched } = useGetColumnsQuery(
    userId ? boardId : skipToken,
  )
  const { data: boardData } = useGetSingleBoardQuery(
    userId ? boardId : skipToken,
  )
  const { data: tasksList } = useGetTasksQuery(userId ? boardId : skipToken)
  const nextColumnOrder = columnsList?.length
    ? 1 + columnsList?.reduce((a, b) => Math.max(a, b.order), 0)
    : 0

  useEffect(() => {
    const array: ColumnResponse[] = columnsList ? [...columnsList].sort((a, b) => a.order - b.order) : [];

    setColumns(array);
  }, [columnsList]);

  const handleDeleteElement = async () => {
    await deleteBoard(boardId)
  }

  console.log(columnsList);

  const handleOnDragEnd = async (result: DropResult) => {
    console.log(result)
    if (!result.destination) {
      return;
    }

    const items: ColumnResponse[] = columns.reduce((array: ColumnResponse[], item: ColumnResponse) => {
      if (item._id === result.draggableId) {
        array.push({...item, order: columns[result?.destination?.index || 0].order});
        return array;
      }

      array.push({...item, order: (item.order >= columns[result?.destination?.index || 0].order) ? item.order + 1 : item.order})
      return array;
    }, [])

    const element = items.findIndex((item) => item._id === result.draggableId);

    //if (!result.destination || !columns || !element) return;
    const itemsSort: ColumnResponse[] = items.sort((a, b) => a.order - b.order);
    console.log(itemsSort);

    // items.splice(result.source.index, 1);
    // items.splice(result.destination.index, 0, element);
    // const array: ColumnResponse[] = items.map((item, index) => ({...item, order: index}));
    //
    const arrayRequest: ColumnOrderRequest[] = itemsSort.map((column) => ({_id: column._id, order: column.order}));
    // items[element] = { ...items[element], order: result.destination.index };
    //
    // console.log(columnsList);
    // //console.log(items.splice(result.destination.index, 0, element));
    // //console.log(array)
    setColumns(itemsSort);
    await changeOrder(arrayRequest);
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
          ) : (
            <Loading size="lg"> Loading </Loading>
          )}


          <div style={{ display: 'flex', flexGrow: '1', maxWidth: '100%' }}>
            <Spacer x={1} css={{ mr: 'auto' }}/>
            <Button
              color="secondary"
              css={{ my: '6px' }}
              onClick={() => router.push('/boards')}
              auto
              flat
              icon={<IconBack fill="currentColor"/>}>
              {t('Back')}
            </Button>
            <Spacer x={1}/>

            <Popover
              isBordered
              isOpen={isCreateColumnOpen}
              onOpenChange={setIsCreateColumnOpen}>
              <Popover.Trigger>
                <Button
                  color="primary"
                  css={{ my: '6px' }}
                  auto
                  flat
                  icon={<IconPlus fill="currentColor"/>}>
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

            <Spacer x={1}/>
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
          <Droppable droppableId="columns" direction='horizontal'>
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
                          {...provided.dragHandleProps}
                          ref={provided.innerRef}
                        >
                          <Column
                            tasks={tasksList?.filter(
                              (task) => task.columnId === column._id,
                            )}
                            column={column}
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
