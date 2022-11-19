import { Card, Text } from '@nextui-org/react'
import { useTranslation } from 'react-i18next'
import { ColumnResponse, TaskResponse } from '../../utils/interfaces'
import ColumnTask from './ColumnTask'
import ColumnTitle from './ColumnTitle'

const Column = (props: { title: string; tasks: TaskResponse[] }) => {
  const { t } = useTranslation('common')

  return (
    <Card
      isHoverable
      variant='flat'
      css={{
        minWidth: '200px',
        mw: '300px',
        p: '10px',
      }}>
      <Card.Header>
        <ColumnTitle title={props.title} />
      </Card.Header>
      <Card.Divider />
      <Card.Body css={{ py: '$8', px: '0', gap: '$2' }} >
      {props.tasks &&
            props.tasks.map((task) => (
              <ColumnTask key={task._id} {...task} />
            ))}
        {/* <Card variant='bordered' >
          <Card.Body css={{ py: '$4', px: '$8' }}>
            <Text>A basic card</Text>
          </Card.Body>
        </Card> */}
      </Card.Body>
      <Card.Footer
        css={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        {/* <PopoverDeleteBoard /> */}
        Delete column
      </Card.Footer>
    </Card>
  )
}

export default Column
