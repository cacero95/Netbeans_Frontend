import { UserState } from "./UserContext";

type UserAction = 
{ type: 'signin_patient', payload: UserState } |
{ type: 'signin_hcp', payload: UserState } |
{ type: 'setDateUser', payload: UserState }

export const userReducer = (
    state: UserState,
    action: UserAction
): UserState => {

    switch ( action.type ) {
        case 'signin_patient':
            return {
                ...state,
                isLogged: true,
                patient: action.payload.patient
            }
        case 'signin_hcp':
            return {
                ...state,
                isLogged: true,
                hcp: action.payload.hcp
            }
        case 'setDateUser':
            return {
                ...state,
                dates: action.payload.dates
            }
        default:
            return state;
    }

}