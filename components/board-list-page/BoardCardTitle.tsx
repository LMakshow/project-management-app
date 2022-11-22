import { Container, Input, Text, Tooltip, useInput } from '@nextui-org/react';
import SaveButton from '../Buttons/SaveButton';
import EditButton from '../Buttons/EditButton';
import { FC, useState } from 'react';

import { useTranslation } from 'next-i18next';
import { useCreateBoardMutation, useUpdateBoardMutation } from '../../features/boards/boardsApi';
import { BoardResponse, BoardTitleProps } from '../../utils/interfaces';
import InputEdit from '../Utilities/InputEdit';

const BoardCardTitle: FC<BoardTitleProps> = (props) => {
  const { t } = useTranslation('common');
  const [isEdit, setIsEdit] = useState(false);

  const handleClick = () => {
    setIsEdit(!isEdit);
  }

  const updateBoardTitle = (title: string) => {
      props.handleUpdateBoard({ title: title })
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
        ? <InputEdit
          editValue={props.title}
          onClick={handleClick}
          onConfirmEdit={updateBoardTitle}
        />
        : <Tooltip content={t('Edit title')} css={{ zIndex: 10 }}>
          <Text
            size="$2xl"
            onClick={handleClick}
          >
            {props.title}
          </Text>
        </Tooltip>}
    </Container>)
}

export default BoardCardTitle;