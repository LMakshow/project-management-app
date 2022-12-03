import { IconCancel } from '../Icons/boardCard/icon_cancel'
import { Button, theme } from '@nextui-org/react'

const CancelButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <Button
      auto
      light
      aria-label='cancel'
      css={{
        px: '5px'
      }}
      onClick={onClick}>
      <IconCancel fill={theme?.colors?.primary?.value} />
    </Button>
  )
}

export default CancelButton
