import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import main from '../main/main';
import Header from '../elements/Header/Header';
import Animu from '../elements/Animu/Animu';
import NotFound from '../elements/NotFound/NotFound'

const App = () => {
  return (
    <BrowserRouter basename={`${process.env.PUBLIC_URL}`}>
      <div className="main">
        <Header />
        <React.Fragment>
          <Switch>
            <Route path='/' component={main} exact />
            <Route path='/:animuId' component={Animu} exact />
            <Route component={NotFound} />
          </Switch>
        </React.Fragment>
      </div>
    </BrowserRouter>
  )
}

export default App;