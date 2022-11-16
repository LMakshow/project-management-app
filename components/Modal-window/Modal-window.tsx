import React, { useState } from 'react'
import { Modal, Input, Button, Text, useInput } from '@nextui-org/react'

import { Mail } from './Mail'
import { Password } from './Password'
import { helperColor, TModalProps } from './type-modal-window'

import { useTranslation } from 'next-i18next'
import {
  useSignInMutation,
  useSignUpMutation,
} from '../../features/auth/authApi'

import { useAppDispatch } from '../../features/hooks'
import { setUser } from '../../features/auth/userSlice'
import { validateEmail, validatePassword } from './validation'

const ModalWindow = ({ isShowing, hide, action }: TModalProps) => {
  const dispatch = useAppDispatch()

  const { t } = useTranslation('modal-window')

  const { value: nameValue, bindings: nameBindings } = useInput('')
  const { value: emailValue, bindings: emailBindings } = useInput('')
  const { value: passwordValue, bindings: passwordBindings } = useInput('')

  const [login, { isLoading }] = useSignInMutation()
  const [signUp] = useSignUpMutation()

  const [isError, setIsError] = useState(false)

  const emailHelper = React.useMemo((): {
    text: string
    color: helperColor
  } => {
    if (!emailValue)
      return {
        text: '',
        color: 'success',
      }

    const isValid = validateEmail(emailValue)
    return {
      text: isValid ? '' : `${t('unvalid-email')}`,
      color: isValid ? 'primary' : 'error',
    }
  }, [emailValue])

  const passwordHelper = React.useMemo((): {
    text: string
    color: helperColor
  } => {
    if (!passwordValue)
      return {
        text: '',
        color: 'success',
      }

    const isValid = validatePassword(passwordValue)

    return {
      text: isValid ? '' : `${t('unvalid-password')}`,
      color: isValid ? 'primary' : 'error',
    }
  }, [passwordValue])

  // Handlers
  const handleSignIn = async () => {
    try {
      const userData = await login({
        login: emailValue,
        password: passwordValue,
      }).unwrap()

      dispatch(setUser(userData))

      hide()
    } catch (error) {
      setIsError(true)
    }
  }

  const handleSignUp = async () => {
    try {
      await signUp({
        login: emailValue,
        name: nameValue,
        password: passwordValue,
      })

      await handleSignIn()

      hide()
    } catch (error) {
      setIsError(true)
    }
  }

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

        <Modal.Body css={{ gap: '10px', overflow: 'visible' }}>
          {action === 'signUp' && (
            <Input
              {...nameBindings}
              aria-labelledby='modal-name'
              clearable
              bordered
              fullWidth
              color='primary'
              size='lg'
              placeholder={t('Name')}
              contentLeft={<Mail fill='currentColor' />}
            />
          )}
          <Input
            {...emailBindings}
            aria-labelledby='modal-email'
            clearable
            bordered
            fullWidth
            color='primary'
            size='lg'
            placeholder={t('Email')}
            helperColor={emailHelper.color}
            helperText={emailHelper.text}
            contentLeft={<Mail fill='currentColor' />}
          />
          <Input.Password
            {...passwordBindings}
            aria-labelledby='modal-password'
            type='password'
            clearable
            bordered
            fullWidth
            color='primary'
            size='lg'
            placeholder={t('Password')}
            helperColor={passwordHelper.color}
            helperText={passwordHelper.text}
            contentLeft={<Password fill='currentColor' />}
          />
          {isError && <span style={{ color: 'red' }}> {t('error')}</span>}
        </Modal.Body>

        <Modal.Footer>
          <Button auto flat color='error' onClick={hide}>
            {t('Close')}
          </Button>
          {action === 'signIn' ? (
            <Button
              auto
              type='submit'
              onClick={handleSignIn}
              disabled={
                validateEmail(emailValue) && validatePassword(passwordValue)
                  ? false
                  : true
              }>
              {t('btnSignIn')}
            </Button>
          ) : (
            <Button
              auto
              type='submit'
              onClick={handleSignUp}
              disabled={
                validateEmail(emailValue) && validatePassword(passwordValue)
                  ? false
                  : true
              }>
              {t('btnSignUp')}
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </div>
  )
}
export default ModalWindow
