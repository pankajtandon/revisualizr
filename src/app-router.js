import React, {Component} from 'react'
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import Layout from './components/common/Layout';
import HomePage from './components/home/HomePage';
import AboutPage from './components/about/AboutPage';
import ContactPage from './components/contact/ContactPage';
import ScenesPage from "./components/scenes/ScenesPage";
import LoginPage from './components/auth/LoginPage';

export default class AppRouter extends Component{
    render(){
        return (
            <Router history={browserHistory}>
                <Route path="/" component={Layout}>
                    <IndexRoute component={HomePage}/>
                    <Route path="/about" component={AboutPage}/>
                    <Route path="/contact" component={ContactPage}/>
                    <Route path="/login" component={LoginPage}/>
                    <Route path="/scenes" component={ScenesPage}/>
                </Route>
            </Router>
        );
    }
}