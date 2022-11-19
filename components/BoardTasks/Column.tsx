import { Avatar, Button, Card, Popover, Text } from '@nextui-org/react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ColumnResponse, TaskResponse } from '../../utils/interfaces'
import PopoverDeleteBoard from '../board-list-page/PopoverDeleteBoard'
import { IconPlus } from '../icons/boardCard/icon_plus'
import ColumnTask from './ColumnTask'
import ColumnTitle from './ColumnTitle'
import PopoverAddTask from './PopoverAddTask'

const Column = (
  props: ColumnResponse & {
    tasks: TaskResponse[] | undefined
  }
) => {
  const { t } = useTranslation('common')
  const [isCreateTaskOpen, setIsCreateTaskOpen] = useState(false)
  const { tasks } = props
  const nextOrder = tasks ? tasks?.reduce((a, b) => Math.max(a, b.order), 1) : 0

  return (
    <Card
      isHoverable
      variant='flat'
      css={{
        minWidth: '200px',
        mw: '300px',
        p: '5px',
        pl: '10px',
        overflowY: 'auto',
      }}>
      <Card.Header css={{ p: '$4' }}>
        <ColumnTitle title={props.title} />
      </Card.Header>

      <Card.Divider />

      <Card.Body css={{ py: '$6', px: '0', pr: '5px', gap: '$2' }}>
        {props.tasks &&
          props.tasks.map((task) => <ColumnTask key={task._id} {...task} />)}
        <Popover
          isBordered
          isOpen={isCreateTaskOpen}
          onOpenChange={setIsCreateTaskOpen}>
          <Popover.Trigger>
            <Button
              color='primary'
              auto
              flat
              icon={<IconPlus fill='currentColor' />}
              css={{ flexShrink: '0' }}>
              Add New Task
            </Button>
          </Popover.Trigger>
          <Popover.Content>
            <PopoverAddTask
              boardId={props.boardId}
              columnId={props._id}
              nextOrder={nextOrder}
              isOpen={isCreateTaskOpen}
              setIsOpen={setIsCreateTaskOpen}
            />
          </Popover.Content>
        </Popover>
      </Card.Body>
      <Card.Footer
        css={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <PopoverDeleteBoard />
        <Avatar
          squared
          src='https://i.pravatar.cc/150?u=a042581f4e29026024d'
          size='lg'
        />
      </Card.Footer>
    </Card>
  )
}

export default Column
