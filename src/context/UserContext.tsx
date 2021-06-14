import { createContext, useReducer } from 'react';
import { userReducer } from './userReducer';

export interface ActualDate {
    confirmed:  boolean;
    _id:        string;
    patient:    string;
    place:      string;
    hcp:        string;
    date:       string;
    created_at: string;
    updated_at: string;
    __v:        number;
}


export interface Hcp {
    available:       boolean;
    _id:             string;
    name:            string;
    type_document:   string;
    number_document: string;
    phone:           number;
    mobile:          number;
    address:         string;
    city:            string;
    country:         string;
    department:      string;
    email:           string;
    turns:           Turns;
    created_at:      string;
    updated_at:      string;
    __v:             number;
}

export interface Turns {
    appointments: string[];
    _id:          string;
    startTime:    string;
    endTime:      string;
}


export interface Patient {
    _id:             string;
    type_document:   string;
    number_document: string;
    name:            string;
    phone:           number;
    mobile:          number;
    address:         string;
    city:            string;
    department:      string;
    country:         string;
    profession:      string;
    email:           string;
    created_at:      string;
    updated_at:      string;
    symptom:         Symptom[];
    __v:             number;
    vaccinated:      Vaccinated;
    id_cita:         string;
}

export interface Patient {
    _id:             string;
    type_document:   string;
    number_document: string;
    name:            string;
    phone:           number;
    mobile:          number;
    address:         string;
    city:            string;
    department:      string;
    country:         string;
    profession:      string;
    email:           string;
    created_at:      string;
    updated_at:      string;
    symptom:         Symptom[];
    __v:             number;
    vaccinated:      Vaccinated;
    id_cita:         string;
}

export interface Symptom {
    _id:         string;
    name:        string;
    description: string;
}

export interface Vaccinated {
    status:  boolean;
    _id:     string;
    vaccine: string;
    date:    string;
}

export interface UserState {
    isLogged: boolean,
    patient?: Patient,
    hcp?: Hcp,
    dates?: ActualDate[]
}

export const userInitialState: UserState = {
    isLogged: false
}

export interface UserContextProps {
    userState: UserState,
    signInPatient: ( value: UserState ) => void,
    signInHcp: ( value: UserState ) => void,
    setDateUser: ( value: UserState ) => void
}

export const UserContext = createContext( {} as UserContextProps );


export const UserProvider = ( { children }: any ) => {
    const [ userState, dispatch ] = useReducer (
        userReducer, userInitialState 
    );

    const signInPatient = ( value: UserState ) => {
        dispatch({ type: 'signin_patient', payload: value });
    }

    const signInHcp = ( value: UserState ) => {
        dispatch({ type: 'signin_hcp', payload: value });
    }

    const setDateUser = ( value: UserState ) => {
        dispatch({ type: 'setDateUser', payload: value });
    }

    return (
        <UserContext.Provider
            value = {{
                userState,
                signInPatient,
                signInHcp,
                setDateUser
            }}
        >
            { children }
        </UserContext.Provider>
    )
}