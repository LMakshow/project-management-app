import { Avatar, Card, Grid, Row, Spacer, Text } from '@nextui-org/react'
import { useTranslation } from 'next-i18next'
import NextLink from 'next/link'

const Team = () => {
  const { t } = useTranslation('home-page')

  return (
    <>
      <Row>
        <Text h2 css={{ w: '100%', textAlign: 'center' }}>
          {t('teamTitle')}
        </Text>
      </Row>
      <Spacer y={1} />
      <Grid.Container gap={4} justify='center'>
        <Grid sm={4}>
          <Card
            css={{
              fd: 'column',
              alignItems: 'center',
              p: '20px',
              backgroundColor: '$secondaryLightHover',
            }}>
            <Text h3 css={{ ta: 'center' }}>{t('teamBella')}</Text>
            <NextLink href='https://github.com/rgvder'>
              <Avatar
                src='/images/team-bella.jpg'
                alt='Bella'
                zoomed
                css={{ size: '$40', '&:hover': { cursor: 'pointer' } }}
              />
            </NextLink>
            <Spacer y={1} />
            <Text h6 i>
              {t('teamBellaText1')}
            </Text>
            <Text h5>{t('teamBellaText2')}</Text>
          </Card>
        </Grid>
        <Grid sm={4}>
          <Card
            css={{
              fd: 'column',
              alignItems: 'center',
              p: '20px',
              backgroundColor: '$secondaryLightHover',
            }}>
            <Text h3 css={{ ta: 'center' }}>{t('teamMaxim')}</Text>
            <NextLink href='https://github.com/LMakshow'>
              <Avatar
                src='/images/team-maksym.jpg'
                alt='Maksym'
                zoomed
                css={{ size: '$40', '&:hover': { cursor: 'pointer' } }}
              />
            </NextLink>
            <Spacer y={1} />
            <Text h6 i>
              {t('teamMaximText1')}
            </Text>
            <Text h5>{t('teamMaximText2')}</Text>
          </Card>
        </Grid>
        <Grid sm={4}>
          <Card
            css={{
              fd: 'column',
              alignItems: 'center',
              p: '20px',
              backgroundColor: '$secondaryLightHover',
            }}>
            <Text h3 css={{ ta: 'center' }}>
              {t('teamChristina')}
            </Text>
            <NextLink href='https://github.com/krvknv'>
              <Avatar
                src='/images/team-christina.jpg'
                alt='Christina'
                zoomed
                css={{ size: '$40', '&:hover': { cursor: 'pointer' } }}
              />
            </NextLink>
            <Spacer y={1} />
            <Text h6 i>
              {t('teamChristinaText1')}
            </Text>
            <Text h5>{t('teamChristinaText2')}</Text>
          </Card>
        </Grid>
      </Grid.Container>
      <Spacer y={5} />
    </>
  )
}

export default Team
