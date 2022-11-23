import {
  Avatar,
  Button,
  Card,
  Input,
  Modal,
  Spacer,
  Text, Tooltip,
} from '@nextui-org/react'
import { useState } from 'react'

import { useTranslation } from 'next-i18next'
import { BoardResponse, CreateTaskRequest, TaskResponse } from '../../utils/interfaces'
import PopoverDeleteElement from '../PopoverDeleteElement'
import { useDeleteTaskMutation, useUpdateTaskMutation } from '../../features/boards/boardsApi'
import InputEdit from '../Utilities/InputEdit';

const ColumnTask = (props: TaskResponse) => {
  const { t } = useTranslation('common')
  const [modalVisible, setModalVisible] = useState(false)
  const [isEditTitle, setIsEditTitle] = useState(false);
  const [isEditDescription, setIsEditDescription] = useState(false);
  const openModal = () => setModalVisible(true)
  const closeModal = () => setModalVisible(false)
  const [deleteTask] = useDeleteTaskMutation()
  const [updateTask] = useUpdateTaskMutation()

  const handleDeleteTask = async () => {
    await deleteTask({
      boardId: props.boardId,
      columnId: props.columnId,
      taskId: props._id,
    })
  }

  const handleUpdateTask = async (value: Partial<CreateTaskRequest>) => {
    await updateTask({
      ...{
        boardId: props.boardId,
        columnId: props.columnId,
        newColumnId: props.columnId,
        taskId: props._id,
        title: props.title,
        order: props.order,
        description: props.description,
        userId: props.userId,
        users: props.users,
      },
      ...value,
    })
  }


  return (
    <>
      <Card variant="bordered" isHoverable css={{ flexShrink: '0' }}>
        <div onClick={openModal}>
          <Card.Header css={{ p: '$3' }}>
            <Text
              b
              size="$lg"
              css={{
                br: '5px',
                px: '10px',
              }}>
              {props.title}
            </Text>
          </Card.Header>
          {props.description && (
            <Card.Body css={{ pt: '$2', pb: '$6', px: '$8' }}>
              <Text css={{ lh: '1.3rem', mh: '43px', overflow: 'hidden' }}>
                {props.description}
              </Text>
            </Card.Body>
          )}
        </div>
      </Card>
      <Modal
        closeButton
        aria-labelledby="modal-task"
        open={modalVisible}
        onClose={closeModal}>
        <Modal.Header css={{ minHeight: '68px' }}>
          {isEditTitle ? (
            <InputEdit
              fullWidth
              editValue={props.title}
              onClick={() => setIsEditTitle(!isEditTitle)}
              onConfirmEdit={(title) => handleUpdateTask({ title: title })}
            />) : (<Tooltip content={t('Edit title')} css={{ zIndex: 9999 }}>
            <Text
              onClick={() => setIsEditTitle(!isEditTitle)}
              id="modal-title"
              b
              size="$2xl">
              {props.title}
            </Text>
          </Tooltip>)
          }
        </Modal.Header>
        <Modal.Body>
          <Text>{props.description}</Text>
        </Modal.Body>
        <Modal.Footer>
          <Spacer css={{ mr: 'auto' }}/>
          <PopoverDeleteElement
            localeKeys={{
              text: 'Are you sure you want to delete this task?',
            }}
            action={handleDeleteTask}
          />
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default ColumnTask
