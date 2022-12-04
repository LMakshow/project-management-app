import {
  Avatar,
  Card,
  Grid,
  Row,
  Spacer,
  Text,
  User,
  styled,
  Link,
  useTheme,
} from '@nextui-org/react'
import { useTranslation } from 'next-i18next'
import NextLink from 'next/link'
import { IconRSS } from '../../../core/Icons/footer/icon_rss'

const TechStack = () => {
  const { t } = useTranslation('home-page')
  const { isDark } = useTheme()
  const TechComponent = styled(User, {
    p: 0,
    '& .nextui-avatar-img': { objectFit: 'contain', p: '3px' },
  })

  return (
    <>
      <Row>
        <Text h2 css={{ w: '100%', textAlign: 'center' }}>
          {t('techStackTitle')}
        </Text>
      </Row>
      <Spacer y={1} />
      <Grid.Container gap={4} justify='center'>
        <Grid sm={7}>
          <Card
            css={{
              fd: 'row',
              alignItems: 'center',
              p: '20px',
              backgroundColor: '$primaryLightHover',
            }}>
            <Grid.Container gap={2} justify='center'>
              <Grid md={3} sm={6} xs>
                <TechComponent
                  squared
                  src='/logo/logo-typescript.svg'
                  name='TypeScript'>
                  <User.Link href='https://www.typescriptlang.org/'>
                    typescriptlang.org
                  </User.Link>
                </TechComponent>
              </Grid>
              <Grid md={3} sm={6} xs>
                <TechComponent
                  squared
                  src='/logo/logo-react.svg'
                  name='React.js'>
                  <User.Link href='https://reactjs.org/'>reactjs.org</User.Link>
                </TechComponent>
              </Grid>
              <Grid md={3} sm={6} xs>
                <TechComponent squared src='/logo/logo-redux.svg' name='Redux'>
                  <User.Link href='https://redux.js.org/'>
                    redux.js.org
                  </User.Link>
                </TechComponent>
              </Grid>
              <Grid md={3} sm={6} xs>
                <TechComponent
                  squared
                  src='/logo/logo-rtkq.jpg'
                  name='RTK Query'>
                  <User.Link href='https://redux-toolkit.js.org/rtk-query/overview'>
                    redux-toolkit.js.org
                  </User.Link>
                </TechComponent>
              </Grid>
              <Grid md={3} sm={6} xs>
                <TechComponent
                  squared
                  src='/logo/logo-nextjs.svg'
                  name='Next.js'>
                  <User.Link href='https://nextjs.org/'>nextjs.org</User.Link>
                </TechComponent>
              </Grid>
              <Grid md={3} sm={6} xs>
                <TechComponent
                  squared
                  src='/logo/logo-nextui.png'
                  name='NextUI'>
                  <User.Link href='https://nextui.org/'>nextui.org</User.Link>
                </TechComponent>
              </Grid>
              <Grid md={3} sm={6} xs>
                <TechComponent
                  squared
                  src='/logo/logo-i18next.png'
                  name='i18next'>
                  <User.Link href='https://www.i18next.com/'>
                    i18next.com
                  </User.Link>
                </TechComponent>
              </Grid>
              <Grid md={3} sm={6} xs>
                <TechComponent
                  squared
                  src='/logo/logo-beautiful-dnd.png'
                  name='RBD'>
                  <User.Link href='https://github.com/atlassian/react-beautiful-dnd'>
                    react-beautiful-dnd
                  </User.Link>
                </TechComponent>
              </Grid>
            </Grid.Container>
          </Card>
        </Grid>
        <Grid sm={5}>
          <Card
            css={{
              fd: 'column',
              alignItems: 'center',
              ta: 'center',
              p: '20px',
              backgroundColor: '$primaryLightHover',
            }}>
            <Link href='https://rs.school' target='_blank'>
              <IconRSS fill={isDark ? 'white' : 'black'} width={120} />
            </Link>
            <Spacer y={0.5} />
            <Text h5>{t('techStackRSSchool')}</Text>
            <Link href='https://rs.school/react/' target='_blank'>
              <Text h5 color='primary'>{t('techStackReactCourse')}</Text>
            </Link>
          </Card>
        </Grid>
      </Grid.Container>
      <Spacer y={5} />
    </>
  )
}

export default TechStack
