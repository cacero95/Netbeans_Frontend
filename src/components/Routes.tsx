import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Home } from './Pages/Home';
import InitPatient from "./Pages/InitPatient";
import InitHcp  from './Pages/InitHcp';

export const Routes = () => {
    return (
        <Router>
            <Switch>
                <Route path = "/" exact component = { Home } />
                <Route path = "/patient" component = { InitPatient } />
                <Route path = "/hcp" component = { InitHcp } />
            </Switch>
        </Router>

    );
}
