import { Button, Grid, Input, Row, Text, useInput } from '@nextui-org/react'
import { useTranslation } from 'next-i18next'
import { useCreateColumnMutation, useCreateTaskMutation } from '../../../features/boards/boardsApi'
import { useAppSelector } from '../../../features/hooks'

const PopoverAddColumn = (props: {
  boardId: string,
  nextOrder: number
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}) => {
  const { isOpen, setIsOpen } = props

  const { t } = useTranslation('common')
  const { value: nameValue, bindings: nameBindings } = useInput('')
  const [createColumn] = useCreateColumnMutation()

  const userId = useAppSelector((state) => state.user._id) as string

  const handlerCreateColumn = async () => {
    await createColumn({
      title: nameValue,
      boardId: props.boardId,
      order: props.nextOrder
    })
    setIsOpen(!isOpen)
  }

  return (
    <Grid.Container
      css={{ borderRadius: '14px', padding: '0.75rem', maxWidth: '330px' }}>
      <Row justify='center' align='center'>
        <Text b>{t('Create New Column')}</Text>
      </Row>
      <Row>
        <Input
          {...nameBindings}
          bordered
          required
          placeholder={t('Name (required)')}
          width='100%'
          css={{ margin: '15px 0' }}
          aria-labelledby="Name"
        />
      </Row>
      <Grid.Container justify='space-between' alignContent='center'>
        <Grid>
          <Button size='sm' light onPress={() => setIsOpen(!isOpen)}>
            {t('Close')}
          </Button>
        </Grid>
        <Grid>
          <Button type="submit" size='sm' color='default' onPress={handlerCreateColumn}>
            {t('Create')}
          </Button>
        </Grid>
      </Grid.Container>
    </Grid.Container>
  )
}
export default PopoverAddColumn
