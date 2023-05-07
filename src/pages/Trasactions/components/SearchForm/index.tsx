import * as z from 'zod'

import { MagnifyingGlass } from 'phosphor-react'
import { SearchFormContainer } from './styles'
import { TransactionsContext } from '../../../../contexts/TransactionsContexts'
import { memo } from 'react'
import { useContextSelector } from 'use-context-selector'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

const searchFormSchema = z.object({
  query: z.string(),
})

type SearchFormInputs = z.infer<typeof searchFormSchema>
// exemplo on how to use memo
// before

// export function SearchForm() {
//   const fetchTransactions = useContextSelector(
//     TransactionsContext,
//     (context) => {
//       return context.fetchTransactions
//     },
//   )
//   const {
//     register,
//     handleSubmit,
//     formState: { isSubmitting },
//   } = useForm<SearchFormInputs>({
//     resolver: zodResolver(searchFormSchema),
//   })

//   async function handleSearchTransactions(data: SearchFormInputs) {
//     await fetchTransactions(data.query)
//   }

//   return (
//     <SearchFormContainer onSubmit={handleSubmit(handleSearchTransactions)}>
//       <input
//         type="text"
//         placeholder="Busque por transacoes"
//         {...register('query')}
//       />

//       <button type="submit" disabled={isSubmitting}>
//         <MagnifyingGlass size={20} />
//         Buscar
//       </button>
//     </SearchFormContainer>
//   )
// }

// after using memo
export function SearchFormComponent() {
  const fetchTransactions = useContextSelector(
    TransactionsContext,
    (context) => {
      return context.fetchTransactions
    },
  )
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SearchFormInputs>({
    resolver: zodResolver(searchFormSchema),
  })

  async function handleSearchTransactions(data: SearchFormInputs) {
    await fetchTransactions(data.query)
  }

  return (
    <SearchFormContainer onSubmit={handleSubmit(handleSearchTransactions)}>
      <input
        type="text"
        placeholder="Busque por transacoes"
        {...register('query')}
      />

      <button type="submit" disabled={isSubmitting}>
        <MagnifyingGlass size={20} />
        Buscar
      </button>
    </SearchFormContainer>
  )
}

export const SearchForm = memo(SearchFormComponent)
