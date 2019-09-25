import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { AppContainer, Navigation, Body, Title } from "./containers";
import DefaultNav from './Components/Nav';
import { ModuloList, ModuloShow, ModuloEdit, ModuloNovo } from './Painel/Modulo';
import { PessoaList, PessoaShow, PessoaEdit, PessoaNovo } from './Painel/Pessoa';
import { ProjetoList, ProjetoShow, ProjetoEdit, ProjetoNovo } from './Painel/Projeto';
import { MarcoList, MarcoShow, MarcoEdit, MarcoNovo } from './Painel/Marco';
import { Home } from './Home';
import { Logar, Sair } from './Auth';
import { isAuthenticated } from "./services/auth";
import './App.css';
import './theme.css';

import { useGlobalState, GlobalStateProvider } from './services/state';

const Titulo = () => {
    const [value] = useGlobalState('titleApp');
    return (
        <Title>
            {value}
        </Title>
    )
}

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            isAuthenticated() ? (
                <Component {...props} />
            ) : (
                    <Redirect to={{ pathname: "/logar", state: { from: props.location } }} />
                )
        }
    />
);

class RouterApp extends Component {
    render() {
        return (
            <Switch>
                <Route exact path={"/"} component={Home} />
                <PrivateRoute exact path={"/modulos"} component={ModuloList} />
                <PrivateRoute exact path={"/modulos/novo"} component={ModuloNovo} />
                <PrivateRoute exact path={"/modulos/:id"} component={ModuloShow} />
                <PrivateRoute exact path={"/modulos/:id/editar"} component={ModuloEdit} />
                <PrivateRoute exact path={"/pessoas"} component={PessoaList} />
                <PrivateRoute exact path={"/pessoas/novo"} component={PessoaNovo} />
                <PrivateRoute exact path={"/pessoas/:id"} component={PessoaShow} />
                <PrivateRoute exact path={"/pessoas/:id/editar"} component={PessoaEdit} />
                <PrivateRoute exact path={"/projetos"} component={ProjetoList} />
                <PrivateRoute exact path={"/projetos/novo"} component={ProjetoNovo} />
                <PrivateRoute exact path={"/projetos/:id"} component={ProjetoShow} />
                <PrivateRoute exact path={"/projetos/:id/editar"} component={ProjetoEdit} />
                <PrivateRoute exact path={"/marcos"} component={MarcoList} />
                <PrivateRoute exact path={"/marcos/novo"} component={MarcoNovo} />
                <PrivateRoute exact path={"/marcos/:id"} component={MarcoShow} />
                <PrivateRoute exact path={"/marcos/:id/editar"} component={MarcoEdit} />
                <Route exact path={"/logar"} component={Logar} />
                <Route exact path={"/sair"} component={Sair} />
                <Route path="*" component={() => <h1>Page not found</h1>} />
            </Switch>
        );
    }
}

class App extends Component {
    render() {
        return (
            <GlobalStateProvider>
                <Router>
                    <AppContainer>
                        {isAuthenticated() ? (
                            <Navigation>
                                <Titulo />
                                <DefaultNav />
                            </Navigation>
                        ) : null}
                        <Body>
                            <RouterApp />
                        </Body>
                    </AppContainer>
                </Router>
            </GlobalStateProvider>
        );
    }
}

export default App;
