import { Button, Grid, Input, Row, Text, useInput } from '@nextui-org/react'
import { useTranslation } from 'next-i18next'
import { useCreateTaskMutation } from '../../../features/boards/boardsApi'
import { useAppSelector } from '../../../features/hooks'

const PopoverAddTask = (props: {
  boardId: string,
  columnId: string,
  nextOrder: number
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}) => {
  const { isOpen, setIsOpen } = props

  const { t } = useTranslation('common')

  const { value: nameValue, bindings: nameBindings } = useInput('')
  const { value: descriptValue, bindings: descripBindings } = useInput('')
  const [createTask] = useCreateTaskMutation()

  const userId = useAppSelector((state) => state.user._id) as string

  const handlerCreateTask = async () => {
    await createTask({
      title: nameValue,
      description: descriptValue || '',
      userId: userId,
      users: [userId],
      boardId: props.boardId,
      columnId: props.columnId,
      order: props.nextOrder
    })
    setIsOpen(!isOpen)
  }

  return (
    <Grid.Container
      css={{ borderRadius: '14px', padding: '0.75rem', maxWidth: '330px' }}>
      <Row justify='center' align='center'>
        <Text b>{t('Create New Task')}</Text>
      </Row>
      <Row>
        <Input
          {...nameBindings}
          bordered
          required
          placeholder={t('Name (required)')}
          width='100%'
          css={{ margin: '15px 0 0' }}
          aria-labelledby="Name"
        />
      </Row>
      <Row>
        <Input
          {...descripBindings}
          bordered
          placeholder={t('Description')}
          width='100%'
          css={{ margin: '15px 0' }}
          aria-labelledby="Description"
        />
      </Row>
      <Grid.Container justify='space-between' alignContent='center'>
        <Grid>
          <Button size='sm' light onClick={() => setIsOpen(!isOpen)}>
            {t('Close')}
          </Button>
        </Grid>
        <Grid>
          <Button type="submit" size='sm' color='default' onClick={handlerCreateTask}>
            {t('Create')}
          </Button>
        </Grid>
      </Grid.Container>
    </Grid.Container>
  )
}
export default PopoverAddTask
