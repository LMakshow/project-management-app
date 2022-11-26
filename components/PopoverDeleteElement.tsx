import {
  Button,
  Popover,
  Text,
  Container,
  Grid,
  NormalColors,
} from '@nextui-org/react'
import { useTranslation } from 'next-i18next'
import { MouseEventHandler, useState } from 'react'
import { IconDelete } from './icons/boardCard/icon_delete'

/**
 * Delete element draws button with a trash icon, when clicking on it, a popover is displayed with the customized text, and the action is fired after clicking confirmation "Delete"
 *
 * @param props.localeKeys.text - Popover confirmation text
 * @param props.btnColor - One of the main NextUI colors, "default" | "primary" | "secondary" | "success" | "warning" | "error" | "gradient";
 * @param props.action - Action when the user confirms the deletion
 * @param props.actionTrigger - Action when the user push the popover.trigger (button)
 */
const PopoverDeleteElement = (props: {
  localeKeys: { text: string }
  btnColor?: NormalColors
  action: MouseEventHandler<HTMLButtonElement> | undefined
  actionTrigger?: MouseEventHandler<HTMLButtonElement> | undefined
}) => {
  const { t } = useTranslation('common')
  const [isOpen, setIsOpen] = useState(false)
  const handleClick = () => {
    setIsOpen(!isOpen)
  }

  return (
    <Popover isOpen={isOpen} onOpenChange={setIsOpen}>
      <Popover.Trigger>
        <Button
          onClick={props.actionTrigger}
          color={props.btnColor || 'error'}
          auto
          flat
          icon={<IconDelete fill='currentColor' />}></Button>
      </Popover.Trigger>
      <Popover.Content
        css={{
          p: '10px',
        }}>
        <Container
          display='flex'
          justify='center'
          alignContent='center'
          css={{
            padding: '0.75rem',
            width: '330px',
            gap: '10px',
          }}>
          <Text size='md'>
            {
              // t('Popover delete board') t('Delete board') t('Are you sure you want to delete this task?') 
              t(props.localeKeys.text)
            }
          </Text>
          <Grid.Container justify='space-around' alignContent='center'>
            <Grid>
              <Button auto light color='default' onClick={handleClick}>
                {t('Close')}
              </Button>
            </Grid>
            <Grid>
              <Button auto shadow color='error' onClick={props.action}>
                {t('Delete')}
              </Button>
            </Grid>
          </Grid.Container>
        </Container>
      </Popover.Content>
    </Popover>
  )
}

export default PopoverDeleteElement
