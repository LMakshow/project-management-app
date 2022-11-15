import React from 'react'
import { Modal, Input, Button, Text } from '@nextui-org/react'

import ReactDOM from 'react-dom'
import { Mail } from './Mail'
import { Password } from './Password'
import { TModalProps } from './type-modal-window'

const ModalWindow = ({ isShowing, hide, action }: TModalProps) => {
  return (
    isShowing &&
    ReactDOM.createPortal(
      <div>
        <Modal
          closeButton
          blur
          aria-labelledby='modal-title'
          open={isShowing}
          onClose={hide}>
          <Modal.Header>
            <Text id='modal-title' size={18}>
              {action === 'signIn' ? 'Welcome to' : 'Join'}
              <Text b size={18}>
                {' '}
                CMA
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
              contentLeft={<Mail fill='currentColor' />}
            />
            <Input
              clearable
              bordered
              fullWidth
              color='primary'
              size='lg'
              placeholder='Password'
              contentLeft={<Password fill='currentColor' />}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button auto flat color='error' onClick={hide}>
              Close
            </Button>
            <Button auto onClick={hide}>
              {action === 'signIn' ? 'Sign in' : 'Sign up'}
            </Button>
          </Modal.Footer>
        </Modal>
      </div>,
      document.body
    )
  )
}
export default ModalWindow
