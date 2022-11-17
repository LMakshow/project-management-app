import { Button, Card, Text, Tooltip } from '@nextui-org/react';
import { BoardResponse } from '../../utils/interfaces';
import { FC } from 'react';

import { useTranslation } from 'next-i18next';
import BoardCardTitle from './BoardCardTitle';
import BoardCardDescription from './BoardCardDescription';

const BoardCard: FC<BoardResponse> = (board) => {
  const { t } = useTranslation('common');

  return (
    <Card key={board._id} css={{
      mw: '400px',
      pl: '10px',
      pr: '10px',
      pb: '15px'
    }}>
      <Card.Header>
        <BoardCardTitle title={board.title}/>
      </Card.Header>
      <Card.Body>
        <BoardCardDescription />
      </Card.Body>
      <Card.Footer css={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>

        <Button flat color="primary" auto>
          {t('Delete')}
        </Button>
      </Card.Footer>
    </Card>
  )
}

export default BoardCard;