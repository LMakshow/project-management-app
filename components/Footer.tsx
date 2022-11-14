import { Card, Container, Grid, Link, Spacer, Text, theme, User, useTheme } from '@nextui-org/react'
import { IconGithub } from './icons/footer/icon_github';
import { IconRSS } from './icons/footer/icon_rss';

const Footer = () => {
  const { isDark, theme } = useTheme();

  return <Card css={{ background: `${isDark ? '$black' : '$white'}`, borderRadius: 0 }}>
    <Container lg>
      <Grid.Container gap={2} justify="space-between" alignItems="center"
                      alignContent="center">
        <Grid css={{
          padding: 0,
          flexBasis: 0,
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
          <Link href="https://github.com/LMakshow" target="_blank">LMakshow</Link>
          <Spacer/>
          <Link href="https://github.com/krvknv" target="_blank">krvknv</Link>
          <Spacer/>
          <Link href="https://github.com/rgvder" target="_blank">rgvder</Link>
        </Grid>
        <Grid alignItems="center" justify="flex-end"
              css={{ gap: 10, padding: 0, display: 'flex', wrap: 'nowrap' }}>
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
