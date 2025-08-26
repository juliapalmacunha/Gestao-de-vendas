// src/context/AuthContext.jsx
import { createContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../Firebase/firebaseConfig";
import { toast } from "react-toastify";
import { Box, CircularProgress } from "@mui/material";

export const AuthContext = createContext();
AuthContext.displayName = "Contexto de autenticação";

export default function AuthProvider({ children }) {
  const [usuarioLogado, setUsuarioLogado] = useState(null);
  const [carregandoLogin, setCarregandoLogin] = useState(true);
  const [primeiraVerificacao, setPrimeiraVerificacao] = useState(true);

  useEffect(() => {
    console.log("Iniciando verificação de estado de autenticação...");

    const escutaUsuario = onAuthStateChanged(auth, (usuarioRetornado) => {
      setUsuarioLogado(usuarioRetornado);
      setCarregandoLogin(false);

      if (primeiraVerificacao) {
        if (usuarioRetornado) {
          console.log("Encontramos um usuario logado");
          toast.success(`Bem-vindo(a), ${usuarioRetornado.email}!`);
        } else {
          console.log("Nenhum usuário esta logado.");
          toast.info("Nenhum usuário logado");
        }
        setPrimeiraVerificacao(false); // só mostra uma vez
      }
    });

    return () => escutaUsuario();
  }, [primeiraVerificacao]);

  return (
    <AuthContext.Provider value={{ usuarioLogado, carregandoLogin }}>
      {carregandoLogin ? <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <CircularProgress />
      </Box> : children}
    </AuthContext.Provider>
  );
}
