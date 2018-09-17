import React from 'react';
import { Route, Switch } from 'react-router-dom';
import ProductList  from './ProductList';
import Home from './Home';
import NoteContainer from './NoteContainer';
import Login from './Login';
import Sample1 from './components/Sample1';

const Routes = () => (
  <Switch>
    <Route exact path="/products" component={ProductList} />
    <Route exact path="/notes" component={NoteContainer} />
    <Route exact path="/login" component={Login} />
    <Route exact path="/sample1" component={Sample1} />
    <Route exact path="/" component={Home} />
  </Switch>
);

export default Routes;
