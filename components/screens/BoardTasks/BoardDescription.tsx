import { Text, useTheme } from '@nextui-org/react'
import { useState } from 'react'
import { useUpdateBoardMutation } from '../../../features/boards/boardsApi'
import { BoardResponse } from '../../core/Utilities/interfaces'
import InputEdit from '../../core/Utilities/InputEdit'

export default function BoardDescription(props: { boardData: BoardResponse }) {
  const { theme } = useTheme()
  const [isEdit, setIsEdit] = useState(false)
  const [updateBoard] = useUpdateBoardMutation()

  const handleClick = () => {
    setIsEdit(!isEdit)
  }

  const handleUpdateDescription = async (description: string) => {
    if (!props.boardData) return
    await updateBoard({
      _id: props.boardData._id,
      title: props.boardData.title,
      description: description,
      owner: props.boardData.owner,
      users: props.boardData.users,
    })
  }

  return (
    <>
      {isEdit ? (
        <InputEdit
          editValue={props.boardData.description}
          onClick={handleClick}
          onConfirmEdit={handleUpdateDescription}
        />
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
          {props.boardData.description}
        </Text>
      )}
    </>
  )
}
