import React, { useContext } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { AuthContext } from '../contextos/AuthContext'

const RotasPrivadas = () => {

    //captura a variavel que se estiver preenchida e porque tem um usuario logado
    const { usuarioLogado } = useContext(AuthContext)
    //captura o endereco atual
    const localizacaoDaRota = useLocation()

    //verifica se usuariologado esta vazio oque será sinonimo de que nao tem ninguem logado, porem caso esteja preenchido e porque deu tudo certo e o usuario esta logado
    if (!usuarioLogado) {
        // Se não estiver logado, redireciona o usuário para a página de login ('/')
        // O 'state={{ from: location }}' passa a informação da página que o usuário tentou acessar
        // para que, potencialmente, ele possa ser redirecionado de volta após o login.
        // 'replace' substitui a entrada atual no histórico de navegação, impedindo que o usuário volte
        // para a rota protegida ao clicar em "voltar" sem estar logado.
        return <Navigate to="/" state={{ from: localizacaoDaRota }} replace />
    }


    return <Outlet/>

}

export default RotasPrivadas