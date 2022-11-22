import { Button, Card, Popover, Text } from '@nextui-org/react'
import { useState } from 'react'
import { useTranslation } from 'next-i18next'
import { ColumnResponse, TaskResponse } from '../../utils/interfaces'
import { IconPlus } from '../icons/boardCard/icon_plus'
import ColumnTask from './ColumnTask'
import ColumnTitle from './ColumnTitle'
import PopoverAddTask from './PopoverAddTask'

const Column = (props: {
  column: ColumnResponse
  tasks: TaskResponse[] | undefined
}) => {
  const { t } = useTranslation('common')
  const [isCreateTaskOpen, setIsCreateTaskOpen] = useState(false)
  const { tasks } = props
  const nextTaskOrder = tasks
    ? tasks?.reduce((a, b) => Math.max(a, b.order), 1)
    : 0

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
        <ColumnTitle {...props} />
      </Card.Header>

      <Card.Divider />

      <Card.Body css={{ py: '$6', px: '0', pr: '5px', gap: '$2' }}>
        {props.tasks &&
          props.tasks.map((task) => <ColumnTask key={task._id} {...task} />)}
      </Card.Body>
      <Card.Footer css={{ pl: 0 }}>
        <Popover
          isBordered
          isOpen={isCreateTaskOpen}
          onOpenChange={setIsCreateTaskOpen}>
          <Popover.Trigger>
            <Button
              color='primary'
              flat
              icon={<IconPlus fill='currentColor' />}
              css={{ flexShrink: '0', width: '100%' }}>
              {t('Add New Task')}
            </Button>
          </Popover.Trigger>
          <Popover.Content>
            <PopoverAddTask
              boardId={props.column.boardId}
              columnId={props.column._id}
              nextOrder={nextTaskOrder}
              isOpen={isCreateTaskOpen}
              setIsOpen={setIsCreateTaskOpen}
            />
          </Popover.Content>
        </Popover>
      </Card.Footer>
    </Card>
  )
}

export default Column
