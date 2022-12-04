import { Button, theme } from '@nextui-org/react';
import { FC } from 'react';
import { IconDone } from '../Icons/boardCard/icon_done';

const SaveButton:FC<{onPress: () => void}> = ({ onPress: onPress }) => {

  return <Button
    auto
    light
    aria-label='save'
    type='submit'
    css={{
      px: '0'
    }}
  onPress={onPress}>
    <IconDone fill={theme?.colors?.success?.value}/>
  </Button>
}

export default SaveButton;