// src/context/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../Firebase/firebaseConfig";
import { toast } from "react-toastify";


export const AuthContext = createContext()//COMPARTILHA
AuthContext.displayName = "Contexto de autenticação";


export default function AuthProvider({ children }) {
    //armazena as informacoes do usuario logado
    const [usuarioLogado, setUsuarioLogado] = useState(null)
    //controla o carregamento inicial de verificacao de autenticacao
    const [carregandoLogin, setCarregandoLogin] = useState(true)


    useEffect(() => {

        console.log("Iniciando verificação de estado de autenticação...");

        const escutaUsuario = onAuthStateChanged(auth, (usuarioRetornado) => {
            setUsuarioLogado(usuarioRetornado);
            setCarregandoLogin(false);

            if (usuarioRetornado) {
                console.log("Encontramos um usuario logado");
                toast.success(`Bem-vindo(a), ${usuarioRetornado.email}!`);
            } else {
                console.log("Nenhum usuário esta logado.");
                toast.info("Nenhum usuário logado");
            }
        });

        return () => escutaUsuario();
    }, []);


    return ( //DA ACESSO
        <AuthContext.Provider value={{ usuarioLogado, carregandoLogin }}>
            {carregandoLogin ? <p>Carregando...</p> : children}
        </AuthContext.Provider>
    );
};




