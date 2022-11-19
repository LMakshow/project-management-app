import { Input, Spacer, Tooltip } from '@nextui-org/react'
import { useTranslation } from 'next-i18next'
import SaveButton from '../board-list-page/SaveButton'
import CancelButton from '../Buttons/CancelButton'

export default function InputEdit(props: {
  editValue: string | number | readonly string[] | undefined
  fullWidth?: boolean
  onClick: () => void
}) {
  const { t } = useTranslation('common')

  return (
    <>
      <Input
        aria-label='Edit'
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
        <SaveButton onClick={props.onClick} />
      </Tooltip>
    </>
  )
}
