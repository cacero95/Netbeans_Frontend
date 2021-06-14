import { Header } from "../Templates/Header"
import userIcon from "../../assets/icons/user.svg";
import hcpIcon from "../../assets/icons/doctor.svg";
import { useRef, useState } from "react";
import { UseModal } from "../../hooks/UseModal";
import Login from "../Atoms/Login";

export const Home = () => {

    const [ open, setOpen ] = useState( false );
    const typeUser = useRef('');

    const handleClose = () => {
        setOpen( false );
    }

    const handleOpen = ( user:string ) => {
        typeUser.current = user;
        setOpen( true );
    }

    return (
        <div className = "HmContainer">
            <Header/>
            <div className = "BodyContainer">
                <div 
                    onClick = { () => handleOpen('user') }
                    className = "SelectionUser"
                >
                    <img src = { userIcon } alt = "user" />
                    <h3>Paciente</h3>
                </div>
                <div 
                    onClick = { () => handleOpen('hcp') }
                    className = "SelectionUser"
                >
                    <img src = { hcpIcon } alt = "hcp" />
                    <h3>HCP</h3>
                </div>
                <UseModal
                    open = { open }
                    setOpen = { handleClose }
                    component = { 
                        <Login 
                            user = { typeUser.current }
                        /> 
                    }
                />
            </div>
        </div>
    )
}
