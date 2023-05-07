import React, { ReactNode, useCallback, useEffect, useState } from 'react'

import { api } from '../components/lib/axios'
import { createContext } from 'use-context-selector'

interface Transaction {
  id: number
  description: string
  type: 'income' | 'outcome'
  category: string
  createdAt: string
  price: number
}

interface createTransactionInput {
  description: string
  type: 'income' | 'outcome'
  category: string
  price: number
}
interface TransactionContextType {
  transactions: Transaction[]
  fetchTransactions: (query?: string) => Promise<void>
  createTransaction: (data: createTransactionInput) => Promise<void>
}

interface TransactionsProviderProps {
  children: ReactNode
}
export const TransactionsContext = createContext({} as TransactionContextType)

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([])

  async function fetchTransactions(query?: string) {
    await api
      .get('transactions/', {
        params: {
          _sort: 'createdAt',
          _order: 'desc',
          q: query,
        },
      })
      .then((response) => {
        setTransactions(response.data)
      })
  }
  useEffect(() => {
    fetchTransactions()
  }, [])
  // with callback to avoid redenring
  const createTransaction = useCallback(
    async (data: createTransactionInput) => {
      const { description, type, price, category } = data

      try {
        const response = await api.post('transactions/', {
          description,
          type,
          price,
          category,
          createdAt: new Date(),
        })
        setTransactions((state) => [response.data, ...state])
      } catch (err) {
        console.log(err)
      }
    },
    [],
  )
  // without callback function
  // async function createTransaction(data: createTransactionInput) {
  //   const { description, type, price, category } = data

  //   try {
  //     const response = await api.post('transactions/', {
  //       description,
  //       type,
  //       price,
  //       category,
  //       createdAt: new Date(),
  //     })
  //     setTransactions((state) => [response.data, ...state])
  //   } catch (err) {
  //     console.log(err)
  //   }
  // }
  return (
    <TransactionsContext.Provider
      value={{ transactions, fetchTransactions, createTransaction }}
    >
      {children}
    </TransactionsContext.Provider>
  )
}
