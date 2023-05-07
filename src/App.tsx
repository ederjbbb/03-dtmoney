import { GlobalStyle } from "./styles/globals"
import { ThemeProvider } from "styled-components"
import { Transactions } from "./pages/Trasactions"
import { TransactionsProvider } from "./contexts/TransactionsContexts"
import { defaultTheme } from "./styles/themes/default"

function App() {

  return (
    
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyle/>
      <TransactionsProvider>
        <Transactions/>
      </TransactionsProvider>
    </ThemeProvider>
    
  )
}

export default App
