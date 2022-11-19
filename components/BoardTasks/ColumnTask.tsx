import { Avatar, Button, Card, Input, Modal, Spacer, Text } from '@nextui-org/react'
import { useState } from 'react'

import { useTranslation } from 'next-i18next'
import { TaskResponse } from '../../utils/interfaces'
import PopoverDeleteBoard from '../board-list-page/PopoverDeleteBoard'

const ColumnTask = (props: TaskResponse) => {
  const { t } = useTranslation('common')
  const [modalVisible, setModalVisible] = useState(false)
  const openModal = () => setModalVisible(true)
  const closeModal = () => setModalVisible(false)

  return (
    <>
      <Card variant='bordered' isHoverable css={{ flexShrink: '0' }}>
        <div onClick={openModal}>
          <Card.Header css={{ p: '$3' }}>
            <Text
              b
              size='$lg'
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
        aria-labelledby='modal-task'
        open={modalVisible}
        onClose={closeModal}>
        <Modal.Header>
          <Text id='modal-title' b size='$2xl'>
            {props.title}
          </Text>
        </Modal.Header>
        <Modal.Body>
          <Text>{props.description}</Text>
        </Modal.Body>
        <Modal.Footer>
          <Avatar
            squared
            src='https://i.pravatar.cc/150?u=a042581f4e29026024d'
            size='lg'
          />
          <Spacer css={{ mr: 'auto' }} />
          <PopoverDeleteBoard />
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default ColumnTask
