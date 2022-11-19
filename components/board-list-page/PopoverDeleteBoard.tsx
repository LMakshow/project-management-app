import { Button, Popover, Text, Container, Grid } from '@nextui-org/react';
import { useTranslation } from 'next-i18next';
import { FC, useState } from 'react';
import { useCreateBoardMutation, useDeleteBoardMutation } from '../../features/boards/boardsApi';

const PopoverDeleteBoard:FC<{ id: string }> = (props) => {
  const { t } = useTranslation('common');
  const [isOpen, setIsOpen] = useState(false);
  const [deleteBoard] = useDeleteBoardMutation();

  const handleClick = () => {
    setIsOpen(!isOpen);
  }

  const handlerDeleteBoard = async () => {
    await deleteBoard(props.id);
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
              <Button auto shadow color="error" onClick={handlerDeleteBoard}>
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