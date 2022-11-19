import { Input, Spacer, Tooltip } from '@nextui-org/react'
import { useTranslation } from 'next-i18next'
import SaveButton from '../board-list-page/SaveButton'
import CancelButton from '../Buttons/CancelButton'

export default function InputEdit(props: {
  editValue: string | number | readonly string[] | undefined
  onClick: { (): void; (): void }
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
        width='auto'
        color='primary'
        animated={false}
      />
      <Spacer x={0.5} />
      <Tooltip content={t('Cancel')}>
        <CancelButton onClick={props.onClick} />
      </Tooltip>
      <Spacer x={0.5} />
      <Tooltip content={t('Save')}>
        <SaveButton onClick={props.onClick} />
      </Tooltip>
    </>
  )
}
