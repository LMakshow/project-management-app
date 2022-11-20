import { Input, Spacer, Tooltip, useInput } from '@nextui-org/react'
import { useTranslation } from 'next-i18next'
import SaveButton from '../board-list-page/SaveButton'
import CancelButton from '../Buttons/CancelButton'

export default function InputEdit(props: {
  editValue: string
  fullWidth?: boolean
  onClick: () => void
  onConfirmEdit: (value: string) => void
}) {
  const { t } = useTranslation('common')
  const { value, bindings } = useInput(props.editValue);
  
  const updateValue = () => {
    props.onClick();

    if (value.trim()) {
      const newValue = value.trim()
      props.onConfirmEdit(newValue)
    }
  }

  return (
    <>
      <Input
        aria-label='Edit'
        {...bindings}
        underlined
        value={props.editValue}
        type='text'
        size='lg'
        width={props.fullWidth ? '100%' : 'auto'}
        color='primary'
      />
      <Tooltip content={t('Cancel')}>
        <CancelButton onClick={props.onClick} />
      </Tooltip>
      <Tooltip content={t('Save')}>
        <SaveButton onClick={updateValue} />
      </Tooltip>
    </>
  )
}
