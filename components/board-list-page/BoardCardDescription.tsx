import { Card, Container, Text, Tooltip } from '@nextui-org/react';
import SaveButton from '../Buttons/SaveButton';
import EditButton from '../Buttons/EditButton';
import { FC, useEffect, useState } from 'react';

import { useTranslation } from 'next-i18next';
import { BoardDescriptionProps } from '../../utils/interfaces';
import TextareaEdit from '../Utilities/TextareaEdit';
import { addNewLine } from '../../utils/helpers';

const BoardCardDescription: FC<BoardDescriptionProps> = (props) => {
  const { t } = useTranslation('common');

  const handleClick = () => {
    props.setIsEdit(!props.isEdit);
  }

  const updateBoardDescription = (description: string) => {
    props.handleUpdateBoard({ description: description })
  }

  return (
    <Container css={{
      display: 'flex',
      fw: 'nowrap',
      alignItems: 'center',
      justifyContent: 'start',
      h: '157px',
      p: 0,
    }}>
      {props.isEdit
        ?
        <TextareaEdit
          fullWidth
          editValue={props.description}
          onClick={handleClick}
          onConfirmEdit={updateBoardDescription}
        />
        :
        <Tooltip
          content={t('Edit description')}
          css={{ zIndex: 10 }}>
          <Container
            onClick={handleClick}
            css={{
              p: 0,
              cursor: 'pointer',
              width: '100%',
            }}>
            <Text css={{
              h: '148px',
              overflow: 'auto',
              display: 'block',
              width: '100%',
            }}
                  size="xl">
              {addNewLine(props.description)}</Text>
          </Container>
        </Tooltip>}
    </Container>)
}

export default BoardCardDescription;