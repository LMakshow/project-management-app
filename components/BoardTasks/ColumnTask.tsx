import { Card, Input, Spacer, Text, Tooltip } from '@nextui-org/react'
import { useState } from 'react'
import SaveButton from '../board-list-page/SaveButton'

import { useTranslation } from 'next-i18next'
import CancelButton from '../Buttons/CancelButton'
import { TaskResponse } from '../../utils/interfaces'
import InputEdit from '../Utilities/InputEdit'

const ColumnTask = (props: TaskResponse) => {
  const { t } = useTranslation('common')
  const [isEdit, setIsEdit] = useState(false)

  const handleClick = () => {
    setIsEdit(!isEdit)
  }

  return (
    <Card variant='bordered' css={{ flexShrink: '0' }}>
      <Card.Header css={{ p: '$3' }}>
        {isEdit ? (
          <InputEdit fullWidth editValue={props.title} onClick={handleClick} />
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
      {props.description && <Card.Body css={{ pt: '$2', pb: '$6', px: '$8' }}>
        <Text css={{ lh: '1.3rem', mh: '43px', overflow: 'hidden' }}>
          {props.description}
        </Text>
      </Card.Body>}
    </Card>
  )
}

export default ColumnTask
