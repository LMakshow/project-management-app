import { Input, Spacer } from '@nextui-org/react'
import { useTranslation } from 'next-i18next'

const Search = (props: {
  filterText: string
  setSearchTerm: (value: string) => void
}) => {
  const { t } = useTranslation('common')
  const { filterText, setSearchTerm } = props

  return (
    <>
      <Input
        clearable
        bordered
        labelPlaceholder={t('Search')}
        value={filterText}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <Spacer x={0.5} />
    </>
  )
}

export default Search
