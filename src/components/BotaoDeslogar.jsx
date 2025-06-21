import { IconButton, Tooltip } from '@mui/material'
import LogoutIcon from '@mui/icons-material/Logout';
import { signOut } from "firebase/auth";
import { auth } from '../Firebase/firebaseConfig';
import { useNavigate } from 'react-router-dom';
import useHookAutenticacao from '../hooks/HookAutenticacao';

const BotaoDeslogar = () => {


    const {deslogandoUsuario} = useHookAutenticacao()


    


    return (



        <Tooltip
            onClick={deslogandoUsuario}
            title="Sair da conta">
            <IconButton>
                <LogoutIcon
                    sx={{
                        color: "white"
                    }} />
            </IconButton>
        </Tooltip>

    )
}

export default BotaoDeslogar