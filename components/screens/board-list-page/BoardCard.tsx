import { Button, Card, Spacer, StyledLoading, Text } from '@nextui-org/react'
import { BoardResponse, TaskResponse } from '../../core/Utilities/interfaces'
import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react'

import { useTranslation } from 'next-i18next'
import BoardCardTitle from './BoardCardTitle'
import BoardCardDescription from './BoardCardDescription'
import PopoverDeleteElement from '../../core/Popover/PopoverDeleteElement'
import {
  useDeleteBoardMutation,
  useUpdateBoardMutation,
} from '../../../features/boards/boardsApi'
import { useRouter } from 'next/router'
import ColumnTask from '../BoardTasks/ColumnTask'

interface BoardCardProps {
  board: BoardResponse
  tasks?: TaskResponse[]
  setLoading: Dispatch<SetStateAction<boolean>>
}

const BoardCard = (props: BoardCardProps) => {
  const { board } = props
  const { t } = useTranslation('common')
  const router = useRouter()
  const [updateBoard, { isLoading: isBoardUpdating }] = useUpdateBoardMutation()
  const [deleteBoard, { isLoading: isBoardDeleting }] = useDeleteBoardMutation()

  const [isEditTitle, setIsEditTitle] = useState(false)
  const [isEditDescription, setIsEditDescription] = useState(false)

  useEffect(() => {
    if (isBoardUpdating || isBoardDeleting) {
      props.setLoading(true)
    } else {
      props.setLoading(false)
    }
  }, [isBoardDeleting, isBoardUpdating, props])

  const setIsEditTitleProps = (value: boolean) => {
    setIsEditTitle(value)
  }

  const setIsEditDescriptionProps = (value: boolean) => {
    setIsEditDescription(value)
  }

  const closeEditInputs = () => {
    setIsEditTitle(false)
    setIsEditDescription(false)
  }

  const handleUpdateBoard = async (value: Partial<BoardResponse>) => {
    await updateBoard({
      ...{
        _id: board._id,
        title: board.title,
        description: board.description,
        owner: board.owner,
        users: board.users,
      },
      ...value,
    })
  }

  const handleDeleteElement = async () => {
    await deleteBoard(board._id)
  }

  return (
    <Card
      key={board._id}
      css={{
        pl: '15px',
        pr: '15px',
        pb: '15px',
        '@xs': {
          mw: '276px',
        },
        '@sm': {
          mw: '430px',
        },
        '@md': {
          mw: '380px',
        },
        '@lg': {
          mw: '424px',
        },
      }}>
      <Card.Header>
        <BoardCardTitle
          setIsEdit={setIsEditTitleProps}
          isEdit={isEditTitle}
          title={board.title}
          handleUpdateBoard={handleUpdateBoard}
        />
      </Card.Header>
      <Card.Body
        css={{
          pt: 0,
        }}>
        <BoardCardDescription
          setIsEdit={setIsEditDescriptionProps}
          isEdit={isEditDescription}
          description={board.description}
          handleUpdateBoard={handleUpdateBoard}
        />
        {props.tasks && (
          <>
            <Text>{t('Tasks found')}</Text>
            <Spacer y={0.5} />
          </>
        )}
        {props.tasks
          ? props.tasks.map((task) => <ColumnTask key={task._id} {...task} />)
          : null}
      </Card.Body>
      <Card.Footer
        css={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <Button
          onClick={() => {
            router.push(`/board/${board._id}`)
            closeEditInputs()
          }}
          color='primary'
          flat>
          {t('Open Board')}
        </Button>
        <PopoverDeleteElement
          actionTrigger={closeEditInputs}
          action={handleDeleteElement}
          localeKeys={{
            text: 'Popover delete board',
          }}
        />
      </Card.Footer>
    </Card>
  )
}

export default BoardCard
