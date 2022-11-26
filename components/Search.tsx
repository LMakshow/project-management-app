import { Input, Spacer } from '@nextui-org/react'
import { useTranslation } from 'next-i18next'
import { IconSearch } from './icons/boardCard/icon_search'

const Search = (props: {
  filterText: string
  setSearchTerm: (value: string) => void
}) => {
  const { t } = useTranslation('common')
  const { filterText, setSearchTerm } = props

  return (
    <Input
      clearable
      bordered
      width={'300px'}
      labelPlaceholder={t('Search')}
      value={filterText}
      contentLeft={<IconSearch fill='currentColor' />}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
  )
}

export default Search
