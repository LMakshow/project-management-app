import React, { useState } from 'react'
import {
  Modal,
  Input,
  Button,
  Text,
  useInput,
  Spacer,
  Tooltip,
} from '@nextui-org/react'

import { Mail } from '../icons/modal/icon_mail'
import { Password } from '../icons/modal/icon_password'
import { helperColor, TModalProps } from './type-modal-window'

import { useTranslation } from 'next-i18next'
import {
  useSignInMutation,
  useSignUpMutation,
} from '../../features/auth/authApi'

import { useAppDispatch, useAppSelector } from '../../features/hooks'
import { setUser } from '../../features/auth/userSlice'
import { validateEmail, validatePassword } from './validation'
import { User } from '../icons/modal/icon_user'
import { useEditProfileMutation } from '../../features/profileApi'

const ModalWindow = ({ isShowing, hide, action }: TModalProps) => {
  const dispatch = useAppDispatch()

  const userName = useAppSelector((state) => state.user.name) as string
  const userLogin = useAppSelector((state) => state.user.login) as string
  const userPassword = useAppSelector((state) => state.user.password) as string
  const userid = useAppSelector((state) => state.user._id) as string
  const usertoken = useAppSelector((state) => state.user.token) as string

  const { t } = useTranslation('modal-window')

  const { value: nameValue, bindings: nameBindings } = useInput('')
  const { value: loginValue, bindings: emailBindings } = useInput('')
  const { value: passwordValue, bindings: passwordBindings } = useInput('')

  const [login, { isLoading }] = useSignInMutation()
  const [signUp] = useSignUpMutation()
  const [editProfile] = useEditProfileMutation()

  const [isError, setIsError] = useState(false)

  const emailHelper = React.useMemo((): {
    text: string
    color: helperColor
  } => {
    if (!loginValue)
      return {
        text: '',
        color: 'success',
      }

    const isValid = validateEmail(loginValue)
    return {
      text: isValid ? '' : `${t('unvalid-email')}`,
      color: isValid ? 'primary' : 'error',
    }
  }, [loginValue, t])

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
  }, [passwordValue, t])

  // Handlers
  const handleSignIn = async () => {
    try {
      const userData = await login({
        login: loginValue,
        password: passwordValue,
      }).unwrap()
      dispatch(setUser({ ...userData, password: passwordValue }))

      hide()
    } catch (error) {
      setIsError(true)
    }
  }

  const handleSignUp = async () => {
    try {
      await signUp({
        login: loginValue,
        name: nameValue,
        password: passwordValue,
      })

      await handleSignIn()

      hide()
    } catch (error) {
      setIsError(true)
    }
  }

  const handleSignInDemo = async () => {
    try {
      const userData = await login({
        login: 'TestUser',
        password: 'TestUserPwd',
      }).unwrap()

      dispatch(setUser({ ...userData, password: 'TestUserPwd' }))

      hide()
    } catch (error) {
      setIsError(true)
    }
  }

  const handleEdit = async () => {
    try {
      const editedData = {
        name: nameValue || userName,
        login: loginValue || userLogin,
        password: passwordValue || userPassword,
      }

      await editProfile({
        _id: userid,
        ...editedData,
      })

      dispatch(setUser({ ...editedData, token: usertoken, _id: userid }))

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
            {
              // t('signIn')  t('signUp') t('edit')
              t(action)
            }
            <Text b size={18}>
              {' '}
              CMA
            </Text>
          </Text>
        </Modal.Header>

        <Modal.Body css={{ gap: '10px', overflow: 'visible' }}>
          {(action === 'signUp' || action === 'edit') && (
            <Input
              {...nameBindings}
              aria-labelledby='modal-name'
              clearable
              bordered
              fullWidth
              color='primary'
              size='lg'
              placeholder={t('Name')}
              contentLeft={<User fill='currentColor' />}
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
          <Tooltip content={t('demo-tooltip')} css={{ zIndex: 9999 }}>
            {action !== 'edit' && (
              <Button auto flat onClick={handleSignInDemo}>
                {t('Demo')}
              </Button>
            )}
          </Tooltip>
          <Spacer css={{ fg: 1 }} />
          <Button auto flat color='error' onClick={hide}>
            {t('Close')}
          </Button>
          {action === 'signIn' ? (
            <Button
              auto
              type='submit'
              onClick={handleSignIn}
              disabled={
                validateEmail(loginValue) && validatePassword(passwordValue)
                  ? false
                  : true
              }>
              {t('btnSignIn')}
            </Button>
          ) : action === 'signUp' ? (
            <Button
              auto
              type='submit'
              onClick={handleSignUp}
              disabled={
                validateEmail(loginValue) &&
                validatePassword(passwordValue) &&
                nameValue
                  ? false
                  : true
              }>
              {t('btnSignUp')}
            </Button>
          ) : (
            <Button auto type='submit' onClick={handleEdit}>
              {t('btnEdit')}
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </div>
  )
}
export default ModalWindow
