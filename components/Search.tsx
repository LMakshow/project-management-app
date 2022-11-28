import { Input, Loading, Spacer } from '@nextui-org/react'
import { useTranslation } from 'next-i18next'
import { IconSearch } from './icons/boardCard/icon_search'

const Search = (props: {
  filterText: string
  searchSpinner: boolean
  setSearchTerm: (value: string) => void
}) => {
  const { t } = useTranslation('common')
  const { filterText, searchSpinner, setSearchTerm } = props

  return (
    <Input
      clearable
      bordered
      width={'300px'}
      color='primary'
      labelPlaceholder={t('Search')}
      value={filterText}
      css={{
        '& .nextui-input-content--left': {
          ml: '0',
          dflex: 'center',
        },
        '& .nextui-input': {
          ml: '0',
          pl: '0',
        },
      }}
      contentLeft={
        searchSpinner ? (
          <Loading size='xs' />
        ) : (
          <IconSearch fill='var(--nextui-colors-accents6)' />
        )
      }
      onChange={(e) => setSearchTerm(e.target.value)}
    />
  )
}

export default Search
