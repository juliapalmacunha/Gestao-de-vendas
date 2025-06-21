import React from 'react'
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../Firebase/firebaseConfig';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export default function useHookAutenticacao  () {

    const navigate = useNavigate()



     //AUTENTICANDO CLIENTE
        const autenticandoCliente = async (emailUsuario, senhaUsurario) => {
            try {
                const credencialUsuario = await signInWithEmailAndPassword(auth, emailUsuario, senhaUsurario);
                const usuario = credencialUsuario.user;
                navigate("/dashboard")
                console.log("Usuário logado com sucesso:", usuario);
                toast.success("Login realizado com sucesso");
               
            } catch (error) {
                console.error("Erro ao autenticar cliente:", error);
                toast.error("Erro ao autenticar cliente");
            }
        }


        //DESLOGANDO USUARIO
       const deslogandoUsuario = async () => {
               try {
                   await signOut(auth);
                   toast.info("Usuario deslogado com sucesso")
                   console.log("Usuário deslogado com sucesso!");
                   navigate("/")
                   
                
               } catch (error) {
                   console.error("Erro ao deslogar:", error);
                   toast.error("Erro ao deslogar usuario")
               }
           };
    
    
    
    
    
    
    



  return {
     autenticandoCliente,
     deslogandoUsuario
  }

   
    
  
}

