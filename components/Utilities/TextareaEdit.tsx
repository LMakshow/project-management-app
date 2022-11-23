import { Grid, Row, Textarea, Tooltip, useInput } from '@nextui-org/react'
import { useTranslation } from 'next-i18next'
import SaveButton from '../Buttons/SaveButton'
import CancelButton from '../Buttons/CancelButton'

/**
 * Input field to edit some text. Creates line with cancel and confirm buttons.
 * 
 * @param props.editValue - default value for input
 * @param props.fullWidth - pass true if you need input to have 100% width
 * @param props.onClick - function after cancel edit
 * @param props.onConfirmEdit - function after confirming edit
 */
export default function TextareaEdit(props: {
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
    <Grid.Container>
      <Row css={{justifyContent: 'end'}}>
        <Tooltip content={t('Cancel')} css={{ zIndex: 9999 }}>
          <CancelButton onClick={props.onClick} />
        </Tooltip>
        <Tooltip content={t('Save')} css={{ zIndex: 9999 }}>
          <SaveButton onClick={updateValue} />
        </Tooltip>
      </Row>
      <Row>
        <Textarea
          aria-label='Edit'
          {...bindings}
          underlined
          initialValue={props.editValue}
          size='lg'
          fullWidth={props.fullWidth}
          color='primary'
        />
      </Row>

    </Grid.Container>
  )
}
