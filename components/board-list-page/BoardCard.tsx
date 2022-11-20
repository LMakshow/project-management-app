import { Avatar, Button, Card, Link } from '@nextui-org/react'
import { BoardResponse } from '../../utils/interfaces'
import NextLink from 'next/link'
import { FC } from 'react'

import { useTranslation } from 'next-i18next'
import BoardCardTitle from './BoardCardTitle'
import BoardCardDescription from './BoardCardDescription'
import PopoverDeleteElement from '../PopoverDeleteElement'
import {
  useDeleteBoardMutation,
  useUpdateBoardMutation,
} from '../../features/boards/boardsApi'

const BoardCard: FC<BoardResponse> = (board) => {
  const { t } = useTranslation('common')
  const [updateBoard] = useUpdateBoardMutation()
  const [deleteBoard] = useDeleteBoardMutation()

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
        mw: '400px',
        pl: '10px',
        pr: '10px',
        pb: '15px',
      }}>
      <Card.Header>
        <BoardCardTitle
          title={board.title}
          handleUpdateBoard={handleUpdateBoard}
        />
      </Card.Header>
      <Card.Body>
        <BoardCardDescription
          description={board.description}
          handleUpdateBoard={handleUpdateBoard}
        />
      </Card.Body>
      <Card.Footer
        css={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <NextLink passHref legacyBehavior href={`/board/${board._id}`}>
          <Link>
            <Button color='primary' flat>
              {t('Open Board')}
            </Button>
          </Link>
        </NextLink>
        <PopoverDeleteElement
          action={handleDeleteElement}
          localeKeys={{
            text: 'Popover delete board',
          }}
        />
        <Avatar
          squared
          src='https://i.pravatar.cc/150?u=a042581f4e29026024d'
          size='lg'
        />
      </Card.Footer>
    </Card>
  )
}

export default BoardCard
