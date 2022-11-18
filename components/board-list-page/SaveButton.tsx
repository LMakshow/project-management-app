
import { Button, theme } from '@nextui-org/react';
import { FC, useState } from 'react';
import { IconDone } from '../icons/boardCard/icon_done';

const SaveButton:FC<{onClick: () => void}> = ({ onClick: onClick }) => {

  return <Button
    auto
    light
    css={{
      pl: '6px',
      pr: '6px',
    }}
  onClick={onClick}>
    <IconDone fill={theme?.colors?.success?.value}/>
  </Button>
}

export default SaveButton;