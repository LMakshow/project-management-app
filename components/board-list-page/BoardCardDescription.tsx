import { Container, Input, Text, Textarea, Tooltip, useInput } from '@nextui-org/react';
import SaveButton from '../Buttons/SaveButton';
import EditButton from '../Buttons/EditButton';
import { FC, useState } from 'react';

import { useTranslation } from 'next-i18next';
import { BoardDescriptionProps } from '../../utils/interfaces';

const BoardCardDescription: FC<BoardDescriptionProps> = (props) => {
  const { t } = useTranslation('common');
  const [isEdit, setIsEdit] = useState(false);
  const { value: descriptionValue, bindings: descriptionBindings } = useInput('');

  const handleClick = () => {
    setIsEdit(!isEdit);
  }

  const updateBoardDescription = () => {
    handleClick();

    if (descriptionValue.trim()) {
      props.handleUpdateBoard({title: descriptionValue.trim() })
    }
  }

  return (
    <Container css={{
      display: 'flex',
      fw: 'nowrap',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      gap: '10px',
      h: '150px',
      p: 0,
    }}>
      {isEdit
        ? <>
          <Textarea
            {...descriptionBindings}
            bordered
            width='306px'
            status="primary"
            value={props.description}
            css={{
              display: 'flex',
              justifyContent: 'flex-start',
            }}
          />

          <Tooltip
            content={t('Save new description')}
            css={{ zIndex: 10 }}>
            <SaveButton onClick={updateBoardDescription}/>
          </Tooltip></>
        : <>
          <Container css={{
            p: 0
          }}>
            <Text css={{
              h: '148px',
              overflow: 'auto'
            }}
              size="xl">
              {props.description}</Text>
          </Container>
          <Tooltip
          content={t('Edit description')}
          css={{ zIndex: 10 }}>
          <EditButton onClick={handleClick}/>
        </Tooltip> </>}
    </Container>)
}

export default BoardCardDescription;