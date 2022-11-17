import { IconPencil } from '../icons/boardCard/icon_pencil';
import { Button, theme } from '@nextui-org/react';
import { FC, useState } from 'react';

const EditButton:FC<{onClick: () => void}> = ({ onClick: onClick }) => {

  return <Button
    auto
    light
    css={{
      pl: '10px',
      pr: '10px',
    }}
  onClick={onClick}>
    <IconPencil fill={theme?.colors?.primary?.value}/>
  </Button>
}

export default EditButton;