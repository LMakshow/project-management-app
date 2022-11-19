import { Card, Input, Spacer, Text, Tooltip } from '@nextui-org/react'
import { useState } from 'react'
import SaveButton from '../board-list-page/SaveButton'

import { useTranslation } from 'next-i18next'
import CancelButton from '../Buttons/CancelButton'
import { TaskResponse } from '../../utils/interfaces'

const ColumnTask = (props: TaskResponse) => {
  const { t } = useTranslation('common')
  const [isEdit, setIsEdit] = useState(false)

  const handleClick = () => {
    setIsEdit(!isEdit)
  }

  return (
    <Card variant='bordered'>
      <Card.Header css={{ p: '$3'}}>
        {isEdit ? (
          <>
            <Input
              aria-label='Edit title'
              underlined
              value={props.title}
              type='text'
              width='auto'
              color='primary'
            />
            <Spacer x={0.5} />
            <Tooltip content={t('Cancel')} css={{ zIndex: 10 }}>
              <CancelButton onClick={handleClick} />
            </Tooltip>
            <Spacer x={0.5} />
            <Tooltip content={t('Save new title')} css={{ zIndex: 10 }}>
              <SaveButton onClick={handleClick} />
            </Tooltip>
          </>
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
      <Card.Body css={{ pt: '$2', pb: '$6', px: '$8' }}>
        <Text css={{lh: '1.25rem', mh: '43px', overflow: 'hidden' }}>{props.description}</Text>
      </Card.Body>
    </Card>
  )
}

export default ColumnTask
