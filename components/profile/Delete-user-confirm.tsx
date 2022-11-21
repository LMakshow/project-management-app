import React, { useState } from 'react'
import { Text, Button, Grid, Row } from '@nextui-org/react'
import { useTranslation } from 'next-i18next'
import { useDeleteProfileMutation } from '../../features/profileApi'
import { useAppDispatch, useAppSelector } from '../../features/hooks'
import { useRouter } from 'next/router'
import { setUser } from '../../features/auth/userSlice'

export const DeleteUser = (props: {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}) => {
  const dispatch = useAppDispatch()

  const router = useRouter()

  const { t } = useTranslation('profile')

  const userId = useAppSelector((state) => state.user._id) as string

  const [deleteProfile] = useDeleteProfileMutation()

  const handleDelete = async () => {
    try {
      await deleteProfile(userId)
      dispatch(
        setUser({
          token: null,
          name: null,
          login: null,
          _id: null,
          password: null,
        })
      )
      router.push('/')
    } catch (error) {}
  }
  const { isOpen, setIsOpen } = props

  return (
    <Grid.Container
      css={{ borderRadius: '14px', padding: '0.75rem', maxWidth: '330px' }}>
      <Row justify='center' align='center'>
        <Text b>{t('Confirm')}</Text>
      </Row>
      <Row>
        <Text>{t('text')}</Text>
      </Row>
      <Grid.Container justify='space-between' alignContent='center'>
        <Grid>
          <Button size='sm' light onClick={() => setIsOpen(!isOpen)}>
            {t('Close')}
          </Button>
        </Grid>
        <Grid>
          <Button size='sm' shadow color='error' onClick={handleDelete}>
            {t('Delete')}
          </Button>
        </Grid>
      </Grid.Container>
    </Grid.Container>
  )
}
