import { Spacer, Text, useTheme } from '@nextui-org/react'
import { useState } from 'react'
import { BoardResponse } from '../../utils/interfaces'
import InputEdit from '../Utilities/InputEdit'

export default function BoardTitle({
  boardData,
}: {
  boardData: BoardResponse
}) {
  const { theme } = useTheme()
  const [isEdit, setIsEdit] = useState(false)

  const handleClick = () => {
    setIsEdit(!isEdit)
  }

  return (
    <>
      {isEdit ? (
        <InputEdit editValue={boardData.title} onClick={handleClick} />
      ) : (
        <Text
          h2
          css={{
            mb: '$4',
            mx: '-$4',
            px: '$4',
            br: '10px',
            '&:hover': {
              background: '$primaryLight',
            },
          }}
          onClick={handleClick}>
          {boardData?.title}
        </Text>
      )}
    </>
  )
}
