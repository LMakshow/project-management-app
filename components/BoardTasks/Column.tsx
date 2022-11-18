import { Card } from '@nextui-org/react'
import { useTranslation } from 'react-i18next'
import { ColumnResponse } from '../../utils/interfaces'
import ColumnTitle from './ColumnTitle'

const Column = (props: ColumnResponse) => {
  const { t } = useTranslation('common')

  return (
    <Card
      isHoverable
      css={{
        mw: '300px',
        p: '10px',
      }}>
      <Card.Header>
        <ColumnTitle title={props.title} />
      </Card.Header>
      <Card.Divider />
      <Card.Body>
        {/* <BoardCardDescription /> */}
        Some Description
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
