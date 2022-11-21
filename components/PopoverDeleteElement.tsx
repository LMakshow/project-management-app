import { Button, Popover, Text, Container, Grid } from '@nextui-org/react';
import { useTranslation } from 'next-i18next';
import { FC, useState } from 'react';
import { DeleteElementPopoverProps } from '../utils/interfaces';

const PopoverDeleteElement:FC<DeleteElementPopoverProps> = (props) => {
  const { t } = useTranslation('common');
  const [isOpen, setIsOpen] = useState(false);
  const [deleteElement] = props.mutation();

  const handleClick = () => {
    setIsOpen(!isOpen);
  }

  const handleDeleteElement = async () => {
    await deleteElement(props.id);
  }

  return (
    <Popover isOpen={isOpen} onOpenChange={setIsOpen}>
      <Popover.Trigger>
        <Button flat color="primary" auto onClick={handleClick}>
          {t(props.localeKeys.button)}
        </Button>
      </Popover.Trigger>
      <Popover.Content css={{
        p: '10px',
      }}>
        <Container display="flex" justify="center" alignContent="center" css={{
          padding: '0.75rem',
          width: '330px',
          gap: '10px',
        }}>
          <Text size="md">
            {t(props.localeKeys.text)}
          </Text>
          <Grid.Container justify="space-around" alignContent="center">
            <Grid>
              <Button auto light color="default" onClick={handleClick}>
                {t('Close')}
              </Button>
            </Grid>
            <Grid>
              <Button auto shadow color="error" onClick={handleDeleteElement}>
                {t('Delete')}
              </Button>
            </Grid>
          </Grid.Container>
        </Container>
      </Popover.Content>
    </Popover>
  )
}

export default PopoverDeleteElement;