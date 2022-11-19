import { Input, Spacer, Text, Tooltip } from '@nextui-org/react'
import { useState } from 'react'
import SaveButton from '../board-list-page/SaveButton'

import { useTranslation } from 'next-i18next'
import CancelButton from '../Buttons/CancelButton'
import InputEdit from '../Utilities/InputEdit'

const ColumnTitle = ({ title }: { title: string }) => {
  const { t } = useTranslation('common')
  const [isEdit, setIsEdit] = useState(false)

  const handleClick = () => {
    setIsEdit(!isEdit)
  }

  return (
    <>
      {isEdit ? (
        <InputEdit fullWidth editValue={title} onClick={handleClick} />
      ) : (
        <>
          <Tooltip content={t('Edit title')} css={{ zIndex: 10 }}>
            <Text b
              size='$lg'
              css={{
                br: '5px',
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
