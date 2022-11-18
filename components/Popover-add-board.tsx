import {
  Button,
  Grid,
  Input,
  Navbar,
  Popover,
  Row,
  Text,
  useInput,
  useTheme,
} from '@nextui-org/react'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useCreateBoardMutation } from '../features/boards/boardsApi'
import { useAppSelector } from '../features/hooks'
import { IconKanbanAdd } from './icons/icon_kanban_add'

const PopoverAddBoard = () => {
  const { theme } = useTheme()

  const { t } = useTranslation('common')

  const { value: nameValue, bindings: nameBindings } = useInput('')
  const { value: descriptValue, bindings: descripBindings } = useInput('')

  const router = useRouter()

  const [createBoard] = useCreateBoardMutation()

  const userId = useAppSelector((state) => state.user._id) as string

  const [isOpen, setIsOpen] = useState(false)

  const handlerCreateBoard = async () => {
    await createBoard({
      title: nameValue,
      description: descriptValue,
      owner: userId,
      users: [userId],
    })
    // router.push('/boards')
  }

  return (
    <Popover isBordered isOpen={isOpen} onOpenChange={setIsOpen}>
      <Popover.Trigger>
        <Button auto light>
          <IconKanbanAdd fill={theme?.colors?.primary?.value} />
          <Text size='large'>{t('Create Board')}</Text>
        </Button>
      </Popover.Trigger>
      <Popover.Content>
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
              aria-labelledby="board's name"
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
              <Button size='sm' light onClick={() => setIsOpen(!isOpen)}>
                {t('Close')}
              </Button>
            </Grid>
            <Grid>
              <Button
                size='sm'
                shadow
                color='default'
                onClick={handlerCreateBoard}>
                {t('Create')}
              </Button>
            </Grid>
          </Grid.Container>
        </Grid.Container>
      </Popover.Content>
    </Popover>
  )
}
export default PopoverAddBoard
