import { Container, Input, Text, Tooltip, useInput } from '@nextui-org/react';
import SaveButton from '../Buttons/SaveButton';
import EditButton from '../Buttons/EditButton';
import { FC, useEffect, useReducer, useState } from 'react';

import { useTranslation } from 'next-i18next';
import { useCreateBoardMutation, useUpdateBoardMutation } from '../../features/boards/boardsApi';
import { BoardResponse, BoardTitleProps } from '../../utils/interfaces';
import InputEdit from '../Utilities/InputEdit';

const BoardCardTitle: FC<BoardTitleProps> = (props) => {
  const { t } = useTranslation('common');

  const handleClick = () => {
    props.setIsEdit(!props.isEdit);
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
      flexWrap: 'nowrap',
      p: 0,
    }}>
      {props.isEdit
        ? <InputEdit
          fullWidth
          editValue={props.title}
          onClick={handleClick}
          onConfirmEdit={updateBoardTitle}
        />
        : <Tooltip content={t('Edit title')} css={{ zIndex: 10 }}>
          <Text
            b
            size="$2xl"
            onClick={handleClick}
            css={{
              cursor: 'pointer',
              br: '5px',
              px: '10px',
              '&:hover': {
                background: '$primaryLight',
              },
            }}
          >
            {props.title}
          </Text>
        </Tooltip>}
    </Container>)
}

export default BoardCardTitle;