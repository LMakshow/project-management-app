import { Avatar, Button, Card, Text } from '@nextui-org/react'
import { useTranslation } from 'react-i18next'
import { ColumnResponse, TaskResponse } from '../../utils/interfaces'
import PopoverDeleteBoard from '../board-list-page/PopoverDeleteBoard'
import { IconPlus } from '../icons/boardCard/icon_plus'
import ColumnTask from './ColumnTask'
import ColumnTitle from './ColumnTitle'

const Column = (props: { title: string; tasks: TaskResponse[] | undefined }) => {
  const { t } = useTranslation('common')

  return (
    <Card
      isHoverable
      variant='flat'
      css={{
        minWidth: '200px',
        mw: '300px',
        p: '5px',
        pl: '10px',
        overflowY: 'auto',
      }}>
      <Card.Header css={{ p: '$4' }}>
        <ColumnTitle title={props.title} />
      </Card.Header>
      <Card.Divider />
      <Card.Body css={{ py: '$6', px: '0', pr: '5px', gap: '$2' }}>
        {props.tasks &&
          props.tasks.map((task) => <ColumnTask key={task._id} {...task} />)}
        <Button color='primary' auto flat icon={<IconPlus fill="currentColor" />} css={{ flexShrink: '0' }}>
          Add New Task
        </Button>
      </Card.Body>
      <Card.Footer
        css={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <PopoverDeleteBoard />
        <Avatar
          squared
          src='https://i.pravatar.cc/150?u=a042581f4e29026024d'
          size='lg'
        />
      </Card.Footer>
    </Card>
  )
}

export default Column
