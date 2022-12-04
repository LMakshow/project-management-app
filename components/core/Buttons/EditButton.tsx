import { IconPencil } from '../Icons/boardCard/icon_pencil';
import { Button, theme } from '@nextui-org/react';
import { FC, useState } from 'react';

const EditButton:FC<{onPress: () => void}> = ({ onPress: onPress }) => {

  return <Button
    auto
    light
    aria-label='edit'
    css={{
      pl: '10px',
      pr: '10px',
    }}
  onPress={onPress}>
    <IconPencil fill={theme?.colors?.primary?.value}/>
  </Button>
}

export default EditButton;