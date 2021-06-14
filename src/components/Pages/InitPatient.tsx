import { Header } from '../Templates/Header';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../context/UserContext';
import { withRouter, RouteComponentProps } from 'react-router';
import { SetUpDate } from '../Atoms/SetupDate';
import { Backend } from '../../api/reqRes';
import { ViewDates } from '../Atoms/ViewDates';

interface Props extends RouteComponentProps {}

const InitPatient = ( { history }: Props ) => {

    const { userState, signInPatient, setDateUser } = useContext( UserContext );
    const [ services, setOpen ] = useState({
        open: false,
        name: ''
    });

    const loginPatient = async ( user: string | null ) => {
        try {
            const { data } = await Backend
            .post('patient/filter', { _id: user });
            data && signInPatient({ isLogged: true, patient: data.patient });
        } catch (err) {
            console.log( err );
        }
    }

    const validateLogin = () => {

        const user = window.localStorage.getItem('user');
        const type = window.localStorage.getItem('type');
        let validate = false;
        if ( !type || type !== 'patient' ) {
            history.push('/');
        } else {
            validate = true;
            loginPatient( user );
        }
        return validate;

    }

    useEffect(() => {
        if ( !userState.isLogged ) {
            validateLogin() && handleDates();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const handleServices = ( name: string ) => {
        services.open ? setOpen({
            name: '',
            open: false
        }) : setOpen({
            name,
            open: true
        });
    }

    const handleDates = async () => {
        try {
            const { data } = await Backend
            .post( 'date/filter', { date: userState.patient?._id } )
            data && setDateUser({ isLogged: true, dates: data.citas })
        } catch (err) {
            console.log( err );
        }
    }

    const handlePost = async  <T extends Object> (
        route: string,
        info: T
    ) => {
        try {
            const { data } = await Backend
            .post (
                route,
                { ...info, patient: userState.patient?._id }
            );
            if ( data ) {
                const tmp = userState.dates;
                tmp?.push( data.cita );
    
                setDateUser({
                    isLogged: true,
                    dates: tmp
                });
            }

        } catch ( err ) {
            console.log( err.message );
        }
    }
    return (
        <div className = "HmContainer">
            <Header/>
            <div className = "patientServices">
                <SetUpDate
                    services = { services }
                    setOpen = { handleServices }
                    handlePost = { handlePost }
                />
                {
                    userState.dates && userState.dates.length > 0
                    && (
                        <ViewDates
                            services = { services }
                            setOpen = { handleServices }
                            dates = { userState.dates }
                        />
                    )
                }
            </div>
        </div>
    )
}

export default withRouter( InitPatient );
