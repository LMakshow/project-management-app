import { Card, Container, Grid, Link, Spacer, Text, theme, User, useTheme } from '@nextui-org/react'
import { IconGithub } from '../Icons/footer/icon_github';
import { IconRSS } from '../Icons/footer/icon_rss';

const Footer = () => {
  const { isDark } = useTheme();

  return <Card css={{ borderRadius: 0 }}>
    <Container lg>
      <Grid.Container gap={2} justify="space-between" alignItems="center"
                      alignContent="center">
        <Grid css={{
          flexBasis: 0,
          paddingRight: 0,
          paddingLeft: 0,
          '@xs': {
            flexBasis: 1,
          },
        }}>
          <Link href="https://github.com/LMakshow/project-management-app" target="_blank" css={{
            display: 'block',
            width: '35px',
            overflow: 'hidden',
            '@xs': {
              width: '100%',
              overflow: 'auto',
            },
          }}>
            <IconGithub fill={isDark ? 'white' : 'black'}/>
          </Link>
        </Grid>
        <Grid justify="center" css={{
          display: 'none',
          '@xs': {
            display: 'flex',
          },
        }}>
          <Link href="https://github.com/rgvder" target="_blank">rgvder</Link>
          <Spacer/>
          <Link href="https://github.com/LMakshow" target="_blank">LMakshow</Link>
          <Spacer/>
          <Link href="https://github.com/krvknv" target="_blank">krvknv</Link>
        </Grid>
        <Grid alignItems="center" justify="flex-end"
              css={{
                display: 'flex',
                gap: 10,
                wrap: 'nowrap',
                paddingRight: 0,
                paddingLeft: 0,
              }}>
          <Text>© 2022</Text>
          <Link href="https://rs.school/react/" target="_blank">
            <IconRSS fill={isDark ? 'white' : 'black'} width={120}/>
          </Link>
        </Grid>
      </Grid.Container>
    </Container>
  </Card>
}

export default Footer;
