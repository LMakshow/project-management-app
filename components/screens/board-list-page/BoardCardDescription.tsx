import { Container, Text, Tooltip } from '@nextui-org/react';
import { FC } from 'react';

import { useTranslation } from 'next-i18next';
import { BoardDescriptionProps } from '../../core/Utilities/interfaces';
import TextareaEdit from '../../core/Utilities/TextareaEdit';
import { addNewLine } from '../../core/Utilities/helpers';

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
      overflow: 'auto',
      p: 0,
    }}>
      {props.isEdit
        ?
        <TextareaEdit
          fullWidth
          editValue={props.description}
          onPress={handleClick}
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
              minHeight: '80px',
              overflow: 'auto',
              minWidth: '280px',
              maxWidth: '500px',
              '@xs': {
                minWidth: '206px',
              },
              '@sm': {
                minWidth: '370px',
              },
              '@md': {
                minWidth: '320px',
              },
              '@lg': {
                minWidth: '370px',
              },
            }}>
            <Text css={{
              overflow: 'auto',
              display: 'block'
            }}
                  size="xl">
              {addNewLine(props.description)}</Text>
          </Container>
        </Tooltip>}
    </Container>)
}

export default BoardCardDescription;