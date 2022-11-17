import { Container, Input, Text, Tooltip } from '@nextui-org/react';
import SaveButton from './SaveButton';
import EditButton from './EditButton';
import { FC, useState } from 'react';

import { useTranslation } from 'next-i18next';

const BoardCardTitle: FC<{ title: string }> = (props) => {
  const { t } = useTranslation('common');
  const [isEdit, setIsEdit] = useState(false);

  const handleClick = () => {
    setIsEdit(!isEdit);
  }

  return (
    <>
      {isEdit ?
        <Container css={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          minHeight: '76px',
          p: 0,
        }}>
          <Input
            underlined
            value={props.title}
            type="text"
            size="xl"
            color="primary"
          />
          <Tooltip
            content={t('Save new title')}
            css={{ zIndex: 10 }}>
          <SaveButton onClick={handleClick}/>
          </Tooltip>
        </Container>
      : <Container css={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          minHeight: '76px',
          p: 0,
        }}><Text size="$2xl">{props.title}</Text><Tooltip
          content={t('Edit title')}
          css={{ zIndex: 10 }}>
          <EditButton onClick={handleClick}/>
        </Tooltip></Container>}
    </>
  )
}

export default BoardCardTitle;