import { Avatar, Button, Card } from '@nextui-org/react';
import { BoardResponse } from '../../utils/interfaces';
import { FC } from 'react';

import { useTranslation } from 'next-i18next';
import BoardCardTitle from './BoardCardTitle';
import BoardCardDescription from './BoardCardDescription';
import PopoverDeleteBoard from './PopoverDeleteBoard';

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
        <PopoverDeleteBoard id={board._id} />
        <Avatar
          squared
          src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
          size="lg"
        />
      </Card.Footer>
    </Card>
  )
}

export default BoardCard;