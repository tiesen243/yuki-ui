'use client'

import * as Primitive from '@fumadocs/base-ui/components/dialog/search'
import { useI18n } from '@fumadocs/base-ui/contexts/i18n'
import { create } from '@orama/orama'
import { useDocsSearch } from 'fumadocs-core/search/client'

function initOrama() {
  return create({
    schema: { _: 'string' },
    // https://docs.orama.com/docs/orama-js/supported-languages
    language: 'english',
  })
}

export default function DefaultSearchDialog(props: Primitive.SharedProps) {
  const { locale } = useI18n() // (optional) for i18n
  const { search, setSearch, query } = useDocsSearch({
    type: 'static',
    initOrama,
    locale,
  })

  return (
    <Primitive.SearchDialog
      search={search}
      onSearchChange={setSearch}
      isLoading={query.isLoading}
      {...props}
    >
      <Primitive.SearchDialogOverlay />
      <Primitive.SearchDialogContent>
        <Primitive.SearchDialogHeader>
          <Primitive.SearchDialogIcon />
          <Primitive.SearchDialogInput />
          <Primitive.SearchDialogClose />
        </Primitive.SearchDialogHeader>
        <Primitive.SearchDialogList
          items={query.data === 'empty' ? null : query.data}
        />
      </Primitive.SearchDialogContent>
    </Primitive.SearchDialog>
  )
}
