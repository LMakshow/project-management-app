import { Card, Grid, Row, Spacer, Text } from '@nextui-org/react'
import Image from 'next/image'

import { useTranslation } from 'next-i18next'

import styles from './benefits.module.scss'

import interfaceImg from '../../assets/images/benefits-interface.png'
import noLimitsImg from '../../assets/images/benefits-noLimits.png'
import searchImg from '../../assets/images/benefits-search.png'

const Benefits = () => {
  const { t } = useTranslation('home-page')

  return (
    <>
      <Row>
        <Text h2 css={{ w: '100%', textAlign: 'center' }}>
          {t('benefitsTitle')}
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
              backgroundColor: '$primaryLightHover',
            }}>
            <Text h3>{t('benefitsInterface')}</Text>
            <Image src={interfaceImg} alt='Interface' />
            <Spacer y={1} />
            <Text h5>{t('benefitsInterfaceDetails1')}</Text>
            <Text h5>{t('benefitsInterfaceDetails2')}</Text>
            <Text h5>{t('benefitsInterfaceDetails3')}</Text>
          </Card>
        </Grid>
        <Grid xs={4}>
          <Card
            css={{
              fd: 'column',
              alignItems: 'center',
              p: '20px',
              backgroundColor: '$primaryLightHover',
            }}>
            <Text h3>{t('benefitsNoLimits')}</Text>
            <Image src={noLimitsImg} alt='No limits' />
            <Spacer y={1} />
            <Text h5>{t('benefitsNoLimitsDetails1')}</Text>
            <Text h5>{t('benefitsNoLimitsDetails2')}</Text>
            <Text h5>{t('benefitsNoLimitsDetails3')}</Text>
          </Card>
        </Grid>
        <Grid xs={4}>
          <Card
            css={{
              fd: 'column',
              alignItems: 'center',
              p: '20px',
              backgroundColor: '$primaryLightHover',
            }}>
            <Text h3>{t('benefitsSearch')}</Text>
            <Image src={searchImg} alt='No limits' />
            <Spacer y={1} />
            <Text h5>{t('benefitsSearchDetails1')}</Text>
            <Text h5>{t('benefitsSearchDetails2')}</Text>
            <Text h5>{t('benefitsSearchDetails3')}</Text>
          </Card>
        </Grid>
      </Grid.Container>
      <Spacer y={5} />
    </>
  )
}

export default Benefits
