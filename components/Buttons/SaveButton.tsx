
import { Button, theme } from '@nextui-org/react';
import { FC, useState } from 'react';
import { IconDone } from '../icons/boardCard/icon_done';

const SaveButton:FC<{onClick: () => void}> = ({ onClick: onClick }) => {

  return <Button
    auto
    light
    aria-label='save'
    type='submit'
    css={{
      px: '0'
    }}
  onClick={onClick}>
    <IconDone fill={theme?.colors?.success?.value}/>
  </Button>
}

export default SaveButton;