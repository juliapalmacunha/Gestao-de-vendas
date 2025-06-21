import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Clientes from './pages/cliente/PageClientes.jsx'
import Dashboard from './pages/dashboard/PageDashboard.jsx'
import Pedidos from './pages/pedidos/PageCadastroPedidos.jsx'
import CadastroCliente from "./pages/cadastro/PageCadastroCliente.jsx"
import ClientesProvider from './contextos/ClientesContext.jsx'
import Testes from './pages/testes/PageTeste.jsx'
import PedidoClienteIndividual from './pages/pedidoCliente/PagePedidoDoCliente.jsx'
import CadastroEstoque from './pages/cadastroEstoque/PageEstoqueCadastro.jsx'
import AuthUsuario from './pages/authUsuario/AuthUsuario.jsx'
import RotasPrivadas from './components/RotasPrivadas.jsx'



const router = createBrowserRouter(

  [

    {
      path: '/',
      element: <App />,
      children:
        [
          { path: '', element: <AuthUsuario /> }, // Rota da página de login (acessível a todos)
        // As rotas abaixo agora estão dentro do <PrivateRoute />, o que significa que
        // o componente correspondente só será renderizado se o usuário estiver autenticado.
        { path: 'cadastrocliente', element: <RotasPrivadas />, children: [{ path: '', element: <CadastroCliente /> }] },
        { path: 'clientes', element: <RotasPrivadas/>, children: [{ path: '', element: <Clientes /> }] },
        { path: 'dashboard', element: <RotasPrivadas/>, children: [{ path: '', element: <Dashboard /> }] },
        { path: 'pedidos', element: <RotasPrivadas/>, children: [{ path: '', element: <Pedidos /> }] },
        { path: 'testes', element: <RotasPrivadas/>, children: [{ path: '', element: <Testes /> }] },
        { path: 'pedidoDoCliente/:id/:nome', element: <RotasPrivadas/>, children: [{ path: '', element: <PedidoClienteIndividual /> }] },
        { path: 'estoque', element: <RotasPrivadas/>, children: [{ path: '', element: <CadastroEstoque /> }] },


        ]
    }

  ]
)

createRoot(document.getElementById('root')).render(


  <StrictMode>
    <ClientesProvider>
      <RouterProvider router={router} />
    </ClientesProvider>
  </StrictMode>,

);
