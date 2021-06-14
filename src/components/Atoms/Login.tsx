import { UseForm } from '../../hooks/UseForm';
import { Backend } from '../../api/reqRes';
import { RouteComponentProps, withRouter } from 'react-router';
import { useContext } from 'react';
import { UserContext } from '../../context/UserContext';

interface loginInterface extends RouteComponentProps {
    user: string
}

interface Formulary {
    email: string,
    number_document: string
}

const Login = ( { user, history }: loginInterface ) => {

    const { signInHcp, signInPatient } = useContext( UserContext );
    let route = '';

    if ( user === 'user' ) {
        route = '/patient';
        user = 'patient/loginPatient/';
    } else {
        route = '/hcp';
        user = 'hcp/loginHcp/';
    }

    const { email, number_document, onChange } = UseForm <Formulary> ({
        email: '',
        number_document: ''
    });

    const handleRequest = async () => {
        try {
            const { data } = await Backend
            .post( user, { email, number_document } );
            if ( data ) {
                console.log( data );
                if ( route === '/patient' ) {
                    window.localStorage.setItem( 'user', data.patient._id )
                    signInPatient({
                        isLogged: true, patient: data.patient
                    });
                    window.localStorage.setItem( 'type', 'patient' );
                } else {
                    window.localStorage.setItem( 'user', data.hcp._id )
                    signInHcp({
                        isLogged: true, hcp: data.hcp
                    });
                    window.localStorage.setItem( 'type', 'hcp' );
                }
                history.push( route );
            }
        } catch (err) {
            console.log( err );
        }
    }

    return (
        <div className = "loginContainer">
            <div className = "loginSection">
                <label>
                    Numero de documento
                </label>
                <input 
                    type = "text"
                    value = { number_document }
                    onChange = {
                        ({ target }) => onChange (
                            target.value, 'number_document' 
                        )
                    }
                />
            </div>
            <div className = "loginSection">
                <label>
                    Correo
                </label>
                <input 
                    type="text"
                    value = { email }
                    onChange = { 
                        ({ target }) => onChange( target.value, 'email' ) 
                    }
                />
            </div>


            <div className = "loginBtn" onClick = { handleRequest }>
                <span>Enviar</span>
            </div>
        </div>
    )
}

export default withRouter( Login );