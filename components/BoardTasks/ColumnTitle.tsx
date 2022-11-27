import { Spacer, Text, Tooltip } from '@nextui-org/react'
import { useState } from 'react'

import { useTranslation } from 'next-i18next'
import {
  useDeleteColumnMutation,
  useDeleteTaskMutation,
  useUpdateColumnMutation,
} from '../../features/boards/boardsApi'
import { ColumnResponse, TaskResponse } from '../../utils/interfaces'
import PopoverDeleteElement from '../PopoverDeleteElement'
import InputEdit from '../Utilities/InputEdit'
import { DraggableProvidedDragHandleProps } from 'react-beautiful-dnd';

const ColumnTitle = (props: {
  column: ColumnResponse
  tasks: TaskResponse[] | undefined
  dragHandleProps: DraggableProvidedDragHandleProps | undefined
}) => {
  const { t } = useTranslation('common')
  const [isEdit, setIsEdit] = useState(false)
  const [updateColumn] = useUpdateColumnMutation()
  const [deleteColumn] = useDeleteColumnMutation()
  const [deleteTask] = useDeleteTaskMutation()

  const handleClick = () => {
    setIsEdit(!isEdit)
  }

  const handleUpdateTitle = async (title: string) => {
    if (!props.column) return
    await updateColumn({
      boardId: props.column.boardId,
      columnId: props.column._id,
      title: title,
      order: props.column.order,
    })
  }

  const handleDeleteColumn = async () => {
    const deleteAllTasksPromises = props?.tasks?.map((task) =>
      deleteTask({
        boardId: props.column.boardId,
        columnId: props.column._id,
        taskId: task._id,
      }).unwrap(),
    )
    if (deleteAllTasksPromises) await Promise.all(deleteAllTasksPromises)
    await deleteColumn({
      boardId: props.column.boardId,
      columnId: props.column._id,
    })
  }

  return (
    <>
      {isEdit ? (
        <InputEdit
          fullWidth
          editValue={props.column.title}
          onClick={handleClick}
          onConfirmEdit={handleUpdateTitle}
        />
      ) : (
        <>
          <Tooltip content={t('Edit title')} css={{ zIndex: 10 }}>
            <Text
              b
              size="$lg"
              css={{
                br: '5px',
                px: '10px',
                '&:hover': {
                  background: '$primaryLight',
                  cursor: 'pointer',
                },
              }}
              onClick={handleClick}>
              {props.column.title}
            </Text>
          </Tooltip>
          <Spacer css={{ mr: 'auto' }}/>
          <PopoverDeleteElement
            localeKeys={{
              // t('Are you sure you want to delete the column and all accociated tasks?')
              text: 'Are you sure you want to delete the column and all accociated tasks?',
            }}
            action={handleDeleteColumn}
          />
        </>
      )}
    </>
  )
}

export default ColumnTitle
