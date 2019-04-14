import React from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import main from '../main/main';
import Animu from '../elements/Animu/Animu';
import NotFound from '../elements/NotFound/NotFound'

const App = () => {
    return (
        <BrowserRouter>
            <React.Fragment>
                <Switch>
                    <Route path='/' component={main} exact />
                    <Route path='/:animuId/:animuName' component={Animu} exact />
                    <Route component={NotFound} />
                </Switch>
            </React.Fragment>
        </BrowserRouter>
    )
}

export default App;