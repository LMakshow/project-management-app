import { Button, Grid, Input, Row, Text, useInput } from '@nextui-org/react'
import { useTranslation } from 'next-i18next'

const PopoverAddBoard = () => {
  const { t } = useTranslation('common')

  const { value: nameValue, bindings: nameBindings } = useInput('')
  const { value: descriptValue, bindings: descripBindings } = useInput('')

  const handlerCreate = () => {
    console.log(nameValue, descriptValue)
  }

  return (
    <Grid.Container
      css={{ borderRadius: '14px', padding: '0.75rem', maxWidth: '330px' }}>
      <Row justify='center' align='center'>
        <Text b>{t('createBoard')}</Text>
      </Row>
      <Row>
        <Input
          {...nameBindings}
          clearable
          bordered
          placeholder={t('boardName')}
          width='100%'
          css={{ margin: '15px 0 0' }}
          aria-labelledby="board's name"
        />
      </Row>
      <Row>
        <Input
          {...descripBindings}
          clearable
          bordered
          placeholder={t('boardDiscript')}
          width='100%'
          css={{ margin: '15px 0' }}
          aria-labelledby="board's description"
        />
      </Row>
      <Grid.Container justify='space-between' alignContent='center'>
        {/* <Grid>
          <Button
            size='sm'
            light
            onClick={() => {
              console.log('click', document.body)
              document.body.click()
            }}>
            {t('Close')}
          </Button>
        </Grid> */}
        <Grid>
          <Button size='sm' shadow color='default' onClick={handlerCreate}>
            {t('Create')}
          </Button>
        </Grid>
      </Grid.Container>
    </Grid.Container>
  )
}
export default PopoverAddBoard
