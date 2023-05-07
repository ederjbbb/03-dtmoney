import * as Dialog from '@radix-ui/react-dialog'

import { Container, Content, NewTransactionButton } from './styles'

import { NewTransactionModal } from '../NewTransactionModal'
import logo from '../../assets/logo.svg'

export function Header(){
    return (
        <Container>
            <Content>
            <img src={logo} alt="logo" />
            <Dialog.Root>
                <Dialog.Trigger asChild>
                <NewTransactionButton>Nova Transação</NewTransactionButton>
                </Dialog.Trigger>
                <NewTransactionModal/>
            </Dialog.Root>
            </Content>
        </Container>
    )
}