import { Header } from '../Templates/Header';
import { useContext, useEffect } from 'react';
import { UserContext } from '../../context/UserContext';
import { withRouter, RouteComponentProps } from 'react-router';
import { Backend } from '../../api/reqRes';

interface Props extends RouteComponentProps {

}

const InitHcp = ( { history }: Props ) => {

    const { userState, signInHcp } = useContext( UserContext );

    const loginHcp = async ( user: string | null ) => {
        try {
            const { data } = await Backend
            .post('patient/filter', { _id: user });
            data && signInHcp({ isLogged: true, hcp: data.hcp });
        } catch (err) {
            console.log( err );
        }
    }

    const validateLogin = () => {

        const user = window.localStorage.getItem('user');
        const type = window.localStorage.getItem('type');
        let validate = false;
        if ( !type || type !== 'hcp' ) {
            history.push('/');
        } else {
            validate = true;
            loginHcp( user );
        }
        return validate;
        
    }

    useEffect(() => {
        userState.isLogged || validateLogin();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <div className = "HmContainer">
            <Header/>
        </div>
    )
}

export default withRouter( InitHcp );
