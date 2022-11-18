import { Container, Input, Text, Tooltip } from '@nextui-org/react'
import SaveButton from '../board-list-page/SaveButton'
import EditButton from '../board-list-page/EditButton'
import { FC, useState } from 'react'

import { useTranslation } from 'next-i18next'

const ColumnTitle = ({ title }: { title: string }) => {
  const { t } = useTranslation('common')
  const [isEdit, setIsEdit] = useState(false)

  const handleClick = () => {
    setIsEdit(!isEdit)
  }

  return (
    <>
      {isEdit ? (
        <>
          <Input
            aria-label='Edit title'
            underlined
            value={title}
            type='text'
            size='lg'
            width='120px'
            color='primary'
            animated={false}
          />
          <Tooltip content={t('Save new title')} css={{ zIndex: 10 }}>
            <SaveButton onClick={handleClick} />
          </Tooltip>
        </>
      ) : (
        <>
          <Tooltip content={t('Edit title')} css={{ zIndex: 10 }}>
            <Text b
              size='$lg'
              css={{
                px: '10px',
                '&:hover': {
                  background: '$primaryLight',
                },
              }}
              onClick={handleClick}>
              {title}
            </Text>
          </Tooltip>
        </>
      )}
    </>
  )
}

export default ColumnTitle
