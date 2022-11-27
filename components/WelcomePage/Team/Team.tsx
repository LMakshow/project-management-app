import { Avatar, Card, Grid, Row, Spacer, Text } from '@nextui-org/react'
import Image from 'next/image'

import { useTranslation } from 'next-i18next'

import styles from './team.module.scss'

import teamBella from '../../../assets/images/team-bella.jpg'
import teamChristina from '../../../assets/images/team-christina.jpg'
import teamMaksym from '../../../assets/images/team-maksym.jpg'

const Team = () => {
  const { t } = useTranslation('home-page')

  const teamStyles = {
    title: {
      marginBottom: '140px',
      textAlign: 'center',
      fontFamily: '"Inter", cursive',
    },
    image: {},
    itemTitle: {
      fontFamily: '"Inter", cursive',
      fontSize: '18px',
      lineHeight: '22px',
    },
    itemText: {
      textAlign: 'center',
      fontFamily: '"Inter", cursive',
      fontSize: '16px',
      lineHeight: '19px',
    },
  }
  return (
    <>
      <Row>
        <Text h2 css={{ w: '100%', textAlign: 'center' }}>
          {t('teamTitle')}
        </Text>
      </Row>
      <Spacer y={1} />
      <Grid.Container gap={4} justify='center'>
        <Grid xs={4}>
          <Card
            css={{
              fd: 'column',
              alignItems: 'center',
              p: '20px',
              backgroundColor: '$secondaryLightHover',
            }}>
            <Text h3>{t('teamBella')}</Text>
            <Avatar src='/images/team-bella.jpg' alt='Bella' zoomed css={{ size: '$40' }} />
            <Spacer y={1} />
            <Text h6 i>{t('teamBellaText1')}</Text>
            <Text h5>{t('teamBellaText2')}</Text>
          </Card>
        </Grid>
        <Grid xs={4}>
          <Card
            css={{
              fd: 'column',
              alignItems: 'center',
              p: '20px',
              backgroundColor: '$secondaryLightHover',
            }}>
            <Text h3>{t('teamMaxim')}</Text>
            <Avatar src='/images/team-maksym.jpg' alt='Maksym' zoomed css={{ size: '$40' }} />
            <Spacer y={1} />
            <Text h6 i>{t('teamMaximText1')}</Text>
            <Text h5>{t('teamMaximText2')}</Text>
          </Card>
        </Grid>
        <Grid xs={4}>
          <Card
            css={{
              fd: 'column',
              alignItems: 'center',
              p: '20px',
              backgroundColor: '$secondaryLightHover',
            }}>
            <Text h3>{t('teamChristina')}</Text>
            <Avatar src='/images/team-christina.jpg' alt='Christina' zoomed css={{ size: '$40' }} />
            <Spacer y={1} />
            <Text h6 i>{t('teamChristinaText1')}</Text>
            <Text h5>{t('teamChristinaText2')}</Text>
          </Card>
        </Grid>
      </Grid.Container>
      <Spacer y={5} />
    </>
  )
}

export default Team
