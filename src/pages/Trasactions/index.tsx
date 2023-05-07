import {
  PriceHighLight,
  TransactionsContainer,
  TransactionsTable,
} from './styles'
import { dateFormatter, priceFormatter } from '../../utils/formatter'

import { Header } from '../../components/Header'
import { SearchForm } from './components/SearchForm'
import { Summary } from '../../components/Summary'
import { TransactionsContext } from '../../contexts/TransactionsContexts'
import { useContextSelector } from 'use-context-selector'

export function Transactions() {
  const transactions = useContextSelector(TransactionsContext, (context) => {
    return context.transactions
  })

  return (
    <>
      <Header />
      <Summary />
      <TransactionsContainer>
        <SearchForm />
        <TransactionsTable>
          <tbody>
            {transactions.map((transaction) => {
              return (
                <tr key={transaction.id}>
                  <td width={'50%'}>{transaction.description}</td>
                  <td>
                    <PriceHighLight variant={transaction.type}>
                      {priceFormatter.format(transaction.price)}
                    </PriceHighLight>
                  </td>{' '}
                  <td>Venda</td>
                  <td>
                    {dateFormatter.format(new Date(transaction.createdAt))}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </TransactionsTable>
      </TransactionsContainer>
    </>
  )
}
