import { Button, Card, Popover, Spacer, useTheme } from '@nextui-org/react'
import { useState } from 'react'
import { useTranslation } from 'next-i18next'
import { ColumnResponse, TaskResponse } from '../core/Utilities/interfaces'
import { IconPlus } from '../core/Icons/boardCard/icon_plus'
import ColumnTask from './ColumnTask'
import ColumnTitle from './ColumnTitle'
import PopoverAddTask from './PopoverAddTask'
import {
  Droppable,
  Draggable,
  DraggableProvidedDragHandleProps,
} from 'react-beautiful-dnd'

const Column = (props: {
  column: ColumnResponse
  tasks: TaskResponse[] | undefined
  dragHandleProps: DraggableProvidedDragHandleProps | undefined
  setDeleteColumn: (value: boolean) => void
}) => {
  const { t } = useTranslation('common')
  const { theme } = useTheme()
  const [isCreateTaskOpen, setIsCreateTaskOpen] = useState(false)
  const { tasks } = props
  const nextTaskOrder = tasks?.length
    ? 1 + tasks?.reduce((a, b) => Math.max(a, b.order), 0)
    : 0

  return (
    <Card
      isHoverable
      variant='flat'
      css={{
        minWidth: '200px',
        mw: '300px',
        p: '10px',
        pt: 0,
        overflowY: 'auto',
      }}>
      <Card.Header
        css={{ p: '$4', pt: '0', minHeight: '50px', fd: 'column' }}
        {...props.dragHandleProps}>
        <div
          style={{
            margin: '10px',
            marginBottom: '15px',
            width: '100%',
            height: '5px',
            borderRadius: '10px',
            backgroundColor: theme?.colors.neutralBorder.value,
          }}
        />
        <div style={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'space-between' }}><ColumnTitle {...props} /></div>
      </Card.Header>

      <Card.Divider />
      <Droppable
        droppableId={props.column._id}
        type='tasks'
        renderClone={(provided, snapshot, rubric) => (
          <div
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}>
            <ColumnTask
              {...(props.tasks?.find(
                (task) => task._id === rubric.draggableId
              ) as TaskResponse)}
            />
          </div>
        )}>
        {(provided) => (
          <Card.Body
            css={{ py: '$6', px: '0', gap: '$2' }}
            {...provided.droppableProps}
            ref={provided.innerRef}>
            {props.tasks &&
              props.tasks.map((task, index) => (
                <Draggable key={task._id} draggableId={task._id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      ref={provided.innerRef}>
                      <ColumnTask {...task} />
                    </div>
                  )}
                </Draggable>
              ))}
            {provided.placeholder}
          </Card.Body>
        )}
      </Droppable>
      <Card.Footer css={{ pl: 0, pr: 0 }}>
        <Popover
          isBordered
          isOpen={isCreateTaskOpen}
          onOpenChange={setIsCreateTaskOpen}>
          <Popover.Trigger>
            <Button
              color='primary'
              flat
              icon={<IconPlus fill='currentColor' />}
              css={{ flexShrink: '0', width: '100%', pl: 0, pr: 0 }}>
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
