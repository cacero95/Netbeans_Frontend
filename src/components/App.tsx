import { Routes } from './Routes';
import "../styles/styles.css";
import { UserProvider } from '../context/UserContext';
export const App = () => (
    <AppState>
        <Routes />
    </AppState>
)


const AppState = ( { children }: any ) => (
    <UserProvider>
        { children }
    </UserProvider>
)