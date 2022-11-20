import { Input, Spacer, Text, Tooltip } from '@nextui-org/react'
import {
  JSXElementConstructor,
  MouseEventHandler,
  ReactElement,
  ReactFragment,
  useState,
} from 'react'
import SaveButton from '../board-list-page/SaveButton'

import { useTranslation } from 'next-i18next'
import CancelButton from '../Buttons/CancelButton'
import InputEdit from '../Utilities/InputEdit'
import PopoverDeleteElement from '../PopoverDeleteElement'

const ColumnTitle = (props: {
  title: string
  deleteAction: MouseEventHandler<HTMLButtonElement> | undefined
}) => {
  const { t } = useTranslation('common')
  const [isEdit, setIsEdit] = useState(false)

  const handleClick = () => {
    setIsEdit(!isEdit)
  }

  return (
    <>
      {isEdit ? (
        <InputEdit fullWidth editValue={props.title} onClick={handleClick} />
      ) : (
        <>
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
          <Spacer css={{ mr: 'auto' }} />
          <PopoverDeleteElement
            localeKeys={{
              text: 'Are you sure you want to delete the column and all accociated tasks?',
            }}
            action={props.deleteAction}
          />
        </>
      )}
    </>
  )
}

export default ColumnTitle
