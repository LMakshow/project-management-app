import { Button, Popover, Text, Container, Grid } from '@nextui-org/react';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';

const PopoverDeleteBoard = () => {
  const { t } = useTranslation('common');
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  }

  return (
    <Popover isOpen={isOpen} onOpenChange={setIsOpen}>
      <Popover.Trigger>
        <Button flat color="primary" auto onClick={handleClick}>
          {t('Delete board')}
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
            {t('Popover delete board')}
          </Text>
          <Grid.Container justify="space-around" alignContent="center">
            <Grid>
              <Button auto light color="default" onClick={handleClick}>
                {t('Close')}
              </Button>
            </Grid>
            <Grid>
              <Button auto shadow color="error" onClick={handleClick}>
                {t('Delete')}
              </Button>
            </Grid>
          </Grid.Container>
        </Container>
      </Popover.Content>
    </Popover>
  )
}

export default PopoverDeleteBoard;