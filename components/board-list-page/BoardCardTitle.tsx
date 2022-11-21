import { Container, Input, Text, Tooltip, useInput } from '@nextui-org/react';
import SaveButton from './SaveButton';
import EditButton from './EditButton';
import { FC, useState } from 'react';

import { useTranslation } from 'next-i18next';
import { useCreateBoardMutation, useUpdateBoardMutation } from '../../features/boards/boardsApi';
import { BoardResponse, BoardTitleProps } from '../../utils/interfaces';

const BoardCardTitle: FC<BoardTitleProps> = (props) => {
  const { t } = useTranslation('common');
  const [isEdit, setIsEdit] = useState(false);

  const { value: titleValue, bindings: titleBindings } = useInput(props.title);

  const handleClick = () => {
    setIsEdit(!isEdit);
  }

  const updateBoardTitle = () => {
    handleClick();

    if (titleValue.trim()) {
      props.handleUpdateBoard({title: titleValue.trim() })
    }
  }

  return (
    <Container css={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      minHeight: '76px',
      p: 0,
    }}>
      {isEdit
        ? <><Input
          {...titleBindings}
          bordered
          value={props.title}
          type="text"
          size="xl"
          color="primary"
          animated={false}
        />
          <Tooltip
            content={t('Save new title')}
            css={{ zIndex: 10 }}>
            <SaveButton onClick={updateBoardTitle}/>
          </Tooltip></>
        : <><Text size="$2xl">{props.title}</Text><Tooltip
          content={t('Edit title')}
          css={{ zIndex: 10 }}>
          <EditButton onClick={handleClick}/>
        </Tooltip> </>}
    </Container>)
}

export default BoardCardTitle;