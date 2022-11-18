import { Button, Grid, Input, Row, Text } from '@nextui-org/react'
import { useTranslation } from 'next-i18next'

const PopoverAddBoard = () => {
  const { t } = useTranslation('common')

  return (
    <Grid.Container
      css={{ borderRadius: '14px', padding: '0.75rem', maxWidth: '330px' }}>
      <Row justify='center' align='center'>
        <Text b>{t('createBoard')}</Text>
      </Row>
      <Row>
        {/* <Text>
          Are you sure you want to delete this user ? By doing this, you will
          not be able to recover the data.
        </Text> */}
        <Input
          clearable
          bordered
          placeholder={t('boardName')}
          width='100%'
          css={{ margin: '15px 0' }}
        />
      </Row>
      <Grid.Container justify='space-between' alignContent='center'>
        <Grid>
          <Button size='sm' light>
            {t('Close')}
          </Button>
        </Grid>
        <Grid>
          <Button size='sm' shadow color='default'>
            {t('Create')}
          </Button>
        </Grid>
      </Grid.Container>
    </Grid.Container>
  )
}
export default PopoverAddBoard
