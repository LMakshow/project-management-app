import { Text } from '@nextui-org/react'
import { useState } from 'react'
import { useUpdateBoardMutation } from '../../../features/boards/boardsApi'
import { BoardResponse } from '../../core/Utilities/interfaces'
import InputEdit from '../../core/Utilities/InputEdit'

export default function BoardTitle(props: { boardData: BoardResponse }) {
  const [isEdit, setIsEdit] = useState(false)
  const [updateBoard] = useUpdateBoardMutation()

  const handleClick = () => {
    setIsEdit(!isEdit)
  }

  const handleUpdateTitle = async (title: string) => {
    if (!props.boardData) return
    await updateBoard({
      _id: props.boardData._id,
      title: title,
      description: props.boardData.description,
      owner: props.boardData.owner,
      users: props.boardData.users,
    })
  }

  return (
    <>
      {isEdit ? (
        <InputEdit
          editValue={props.boardData.title}
          onPress={handleClick}
          onConfirmEdit={handleUpdateTitle}
        />
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
          {props.boardData?.title}
        </Text>
      )}
    </>
  )
}
