import { Grid, Row, Textarea, Tooltip, useInput } from '@nextui-org/react'
import { useTranslation } from 'next-i18next'
import SaveButton from '../Buttons/SaveButton'
import CancelButton from '../Buttons/CancelButton'

/**
 * Textarea to edit some text. Creates line with cancel and confirm buttons.
 * 
 * @param props.editValue - default value for textarea
 * @param props.fullWidth - pass true if you need textarea to have 100% width
 * @param props.onPress - function after cancel edit
 * @param props.onConfirmEdit - function after confirming edit
 */
export default function TextareaEdit(props: {
  editValue: string
  fullWidth?: boolean
  onPress: () => void
  onConfirmEdit: (value: string) => void
}) {
  const { t } = useTranslation('common')
  const { value, bindings } = useInput(props.editValue);
  
  const updateValue = () => {
    props.onPress();

    if (value.trim()) {
      const newValue = value.trim()
      props.onConfirmEdit(newValue)
    }
  }

  return (
    <Grid.Container>
      <Row>
        <Textarea
          aria-label='Edit'
          {...bindings}
          initialValue={props.editValue}
          size='lg'
          fullWidth={props.fullWidth}
          color='primary'
        />
      </Row>
      <Row css={{justifyContent: 'end'}}>
        <Tooltip content={t('Cancel')} css={{ zIndex: 9999 }}>
          <CancelButton onPress={props.onPress} />
        </Tooltip>
        <Tooltip content={t('Save')} css={{ zIndex: 9999 }}>
          <SaveButton onPress={updateValue} />
        </Tooltip>
      </Row>
    </Grid.Container>
  )
}
