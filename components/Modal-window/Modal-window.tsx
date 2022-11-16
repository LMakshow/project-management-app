import React from 'react'
import { Modal, Input, Button, Text } from '@nextui-org/react'

import { Mail } from './Mail'
import { Password } from './Password'
import { Name } from './Name'
import { TModalProps } from './type-modal-window'

import { useTranslation } from 'next-i18next'

const ModalWindow = ({ isShowing, hide, action }: TModalProps) => {
  const { t } = useTranslation('modal-window')

  return (
    <div>
      <Modal
        closeButton
        blur
        aria-labelledby='modal-title'
        open={isShowing}
        onClose={hide}>
        <Modal.Header>
          <Text id='modal-title' size={18}>
            {t(action)}
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
            placeholder={t('Name')}
            contentLeft={<Name fill='currentColor' />}
          />
          <Input
            clearable
            bordered
            fullWidth
            color='primary'
            size='lg'
            placeholder={t('Email')}
            contentLeft={<Mail fill='currentColor' />}
          />
          <Input
            clearable
            bordered
            fullWidth
            color='primary'
            size='lg'
            placeholder={t('Password')}
            contentLeft={<Password fill='currentColor' />}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button auto flat color='error' onClick={hide}>
            {t('Close')}
          </Button>
          {action === 'signIn' ? (
            <Button auto onClick={hide}>
              {t('btnSignIn')}
            </Button>
          ) : (
            <Button auto onClick={hide}>
              {t('btnSignUp')}
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </div>
  )
}
export default ModalWindow
