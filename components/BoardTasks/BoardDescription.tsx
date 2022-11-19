import { Spacer, Text, useTheme } from '@nextui-org/react'
import { useState } from 'react'
import { BoardResponse } from '../../utils/interfaces'
import InputEdit from '../Utilities/InputEdit'

export default function BoardDescription({
  description,
}: {
  description: string
}) {
  const { theme } = useTheme()
  const [isEdit, setIsEdit] = useState(false)

  const handleClick = () => {
    setIsEdit(!isEdit)
  }

  return (
    <>
      {isEdit ? (
        <InputEdit editValue={description} onClick={handleClick} />
      ) : (
        <Text
          h3
          css={{
            mb: '$5',
            mx: '-$4',
            px: '$4',
            br: '10px',
            '&:hover': {
              background: '$primaryLight',
            },
          }}
          color={theme?.colors?.gray800?.value}
          onClick={handleClick}>
          {description}
        </Text>
      )}
    </>
  )
}
