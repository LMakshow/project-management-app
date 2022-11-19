import {
  Button,
  Card,
  Input,
  Modal,
  Spacer,
  Text,
  Tooltip,
} from '@nextui-org/react'
import { useState } from 'react'
import SaveButton from '../board-list-page/SaveButton'

import { useTranslation } from 'next-i18next'
import CancelButton from '../Buttons/CancelButton'
import { TaskResponse } from '../../utils/interfaces'
import InputEdit from '../Utilities/InputEdit'

const ColumnTask = (props: TaskResponse) => {
  const { t } = useTranslation('common')
  const [isEdit, setIsEdit] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)
  const openModal = () => {
    setModalVisible(true)
  }
  const closeModal = () => setModalVisible(false)

  const handleClickToEdit = (event: React.MouseEvent<HTMLDivElement>) => {
    setIsEdit(!isEdit)
    event.stopPropagation()
  }

  const handleClick = () => {
    setIsEdit(!isEdit)
  }

  return (
    <>
      <Card variant='bordered' css={{ flexShrink: '0' }}>
        <div onClick={openModal}>
          <Card.Header css={{ p: '$3' }}>
            {isEdit ? (
              <InputEdit
                fullWidth
                editValue={props.title}
                onClick={handleClick}
              />
            ) : (
              <Tooltip content={t('Edit title')} css={{ zIndex: 10 }}>
                <Text
                  b
                  size='$lg'
                  css={{
                    br: '5px',
                    px: '10px',
                    '&:hover': {
                      background: '$primaryLight',
                    },
                  }}
                  onClick={handleClick}>
                  {props.title}
                </Text>
              </Tooltip>
            )}
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
        aria-labelledby='modal-title'
        open={modalVisible}
        onClose={closeModal}>
        <Modal.Header>
          <Text id='modal-title' size={18}>
            Welcome to
            <Text b size={18}>
              NextUI
            </Text>
          </Text>
        </Modal.Header>
        <Modal.Body>
          <Input
            clearable
            bordered
            fullWidth
            color='primary'
            size='lg'
            placeholder='Email'
          />
          <Input
            clearable
            bordered
            fullWidth
            color='primary'
            size='lg'
            placeholder='Password'
          />
        </Modal.Body>
        <Modal.Footer>
          <Button auto flat color='error' onClick={closeModal}>
            Close
          </Button>
          <Button auto onClick={closeModal}>
            Sign in
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default ColumnTask
