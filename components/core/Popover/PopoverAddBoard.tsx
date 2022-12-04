import { Button, Grid, Input, Row, Text, useInput } from '@nextui-org/react'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { useCreateBoardMutation } from '../../../features/boards/boardsApi'
import { useAppSelector } from '../../../features/hooks'

const PopoverAddBoard = (props: {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}) => {
  const { isOpen, setIsOpen } = props

  const { t } = useTranslation('common')

  const { value: nameValue, bindings: nameBindings } = useInput('')
  const { value: descriptValue, bindings: descripBindings } = useInput('')

  const router = useRouter()

  const [createBoard] = useCreateBoardMutation()

  const userId = useAppSelector((state) => state.user._id) as string

  const handlerCreateBoard = async () => {
    await createBoard({
      title: nameValue,
      description: descriptValue,
      owner: userId,
      users: [userId],
    })

    setIsOpen(!isOpen)

    if (!router.pathname.endsWith('boards')) {
      router.push('/boards')
    }
  }

  return (
    <Grid.Container
      css={{ borderRadius: '14px', padding: '0.75rem', maxWidth: '330px' }}>
      <Row justify='center' align='center'>
        <Text b>{t('createBoard')}</Text>
      </Row>
      <Row>
        <Input
          {...nameBindings}
          clearable
          bordered
          placeholder={t('boardName')}
          width='100%'
          css={{ margin: '15px 0 0' }}
          aria-labelledby="board's title"
        />
      </Row>
      <Row>
        <Input
          {...descripBindings}
          clearable
          bordered
          placeholder={t('boardDiscript')}
          width='100%'
          css={{ margin: '15px 0' }}
          aria-labelledby="board's description"
        />
      </Row>
      <Grid.Container justify='space-between' alignContent='center'>
        <Grid>
          <Button size='sm' light onPress={() => setIsOpen(!isOpen)}>
            {t('Close')}
          </Button>
        </Grid>
        <Grid>
          <Button size='sm' shadow color='default' onPress={handlerCreateBoard}>
            {t('Create')}
          </Button>
        </Grid>
      </Grid.Container>
    </Grid.Container>
  )
}
export default PopoverAddBoard
