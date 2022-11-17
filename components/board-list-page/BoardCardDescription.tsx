import { Container, Input, Text, Textarea, Tooltip } from '@nextui-org/react';
import SaveButton from './SaveButton';
import EditButton from './EditButton';
import { useState } from 'react';

import { useTranslation } from 'next-i18next';

const description = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.mod tempor incididunt ut labore et dolore magna aliqua.'

const BoardCardDescription = () => {
  const { t } = useTranslation('common');
  const [isEdit, setIsEdit] = useState(false);

  const handleClick = () => {
    setIsEdit(!isEdit);
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
            bordered
            width='306px'
            status="primary"
            initialValue={description}
            css={{
              display: 'flex',
              justifyContent: 'flex-start',
            }}
          />

          <Tooltip
            content={t('Save new description')}
            css={{ zIndex: 10 }}>
            <SaveButton onClick={handleClick}/>
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
              {description}</Text>
          </Container>
          <Tooltip
          content={t('Edit description')}
          css={{ zIndex: 10 }}>
          <EditButton onClick={handleClick}/>
        </Tooltip> </>}
    </Container>)
}

export default BoardCardDescription;